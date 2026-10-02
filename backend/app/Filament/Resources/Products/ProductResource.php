<?php

namespace App\Filament\Resources\Products;

use App\Enums\ProductStatus;
use App\Filament\Resources\Products\Pages\CreateProduct;
use App\Filament\Resources\Products\Pages\EditProduct;
use App\Filament\Resources\Products\Pages\ListProducts;
use App\Models\Product;
use Filament\Actions\Action;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Notifications\Notification;
use Filament\Resources\Resource;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static string|\BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static string|\UnitEnum|null $navigationGroup = 'Catalogue';

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Piece')->columns(2)->schema([
                TextInput::make('name')
                    ->required()
                    ->maxLength(255)
                    ->live(onBlur: true)
                    ->afterStateUpdated(function (?string $state, Set $set, Get $get) {
                        if (blank($get('slug')) && filled($state)) {
                            $set('slug', Str::slug($state));
                        }
                    }),
                TextInput::make('slug')->required()->maxLength(255)->unique(ignoreRecord: true),
                TextInput::make('sku')->maxLength(255)->unique(ignoreRecord: true),
                Select::make('category_id')->relationship('category', 'name')->searchable()->preload()->required(),
                Select::make('collection_id')->relationship('collection', 'name')->searchable()->preload(),
                TextInput::make('subcategory')->maxLength(255),
                Select::make('tag')->options([
                    'Restocked' => 'Restocked',
                    'New Arrival' => 'New Arrival',
                    'Last Piece' => 'Last Piece',
                ]),
                Select::make('status')
                    ->options([
                        'draft' => 'Draft',
                        'active' => 'Active',
                        'archived' => 'Archived',
                    ])
                    ->required()
                    ->default('draft')
                    ->rules([
                        fn (Get $get): \Closure => function (string $attribute, mixed $value, \Closure $fail) use ($get) {
                            if ($value !== 'active') {
                                return;
                            }

                            foreach (['name', 'slug', 'category_id', 'description', 'seo_description'] as $field) {
                                if (blank($get($field))) {
                                    $fail('Active products need a name, slug, category, description, and SEO description.');

                                    return;
                                }
                            }

                            $images = collect($get('images') ?? []);
                            $hasPrimary = $images->contains(fn ($image) => ! empty($image['is_primary']) && filled($image['path'] ?? null));
                            if (! $hasPrimary) {
                                $fail('Active products need a primary image.');
                            }

                            if ($get('is_price_visible') && blank($get('base_price')) && blank($get('price_label'))) {
                                $fail('A visible price needs a price or a price label.');
                            }
                        },
                    ]),
                Select::make('availability_status')
                    ->options([
                        'in_stock' => 'In stock',
                        'made_to_order' => 'Made to order',
                        'custom_order' => 'Custom order',
                        'unavailable' => 'Unavailable',
                    ])
                    ->required()
                    ->default('in_stock'),
                TextInput::make('base_price')->numeric()->prefix('KES'),
                TextInput::make('price_label')->maxLength(255)->helperText('Example: From KSh 85,000'),
                Toggle::make('is_price_visible')->default(true),
                Toggle::make('is_featured'),
                Toggle::make('is_listed')->default(true),
                Toggle::make('is_custom'),
            ]),
            Section::make('Copy')->schema([
                Textarea::make('short_description')->rows(2),
                Textarea::make('description')->rows(5)->required(),
                Textarea::make('details')
                    ->rows(4)
                    ->helperText('One detail per line.')
                    ->formatStateUsing(fn ($state) => is_array($state) ? implode("\n", $state) : $state)
                    ->dehydrateStateUsing(fn ($state) => collect(preg_split('/\r\n|\r|\n/', (string) $state))->map(fn ($line) => trim($line))->filter()->values()->all()),
                TextInput::make('lead_time'),
                TextInput::make('dimensions'),
                TextInput::make('material'),
                TextInput::make('finish'),
                Textarea::make('care_instructions')->rows(2),
            ]),
            Section::make('Images')->schema([
                Repeater::make('images')
                    ->relationship()
                    ->orderColumn('sort_order')
                    ->schema([
                        FileUpload::make('path')
                            ->image()
                            ->disk('public')
                            ->directory('products')
                            ->required()
                            ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                            ->maxSize(8192),
                        TextInput::make('alt_text')->required()->maxLength(255),
                        Toggle::make('is_primary')->label('Primary'),
                    ])
                    ->columnSpanFull(),
            ]),
            Section::make('SEO')->schema([
                TextInput::make('seo_title')->maxLength(255),
                Textarea::make('seo_description')->rows(3),
            ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('primaryImage.path')->disk('public')->label(''),
                TextColumn::make('name')->searchable()->sortable(),
                TextColumn::make('category.name')->label('Category'),
                TextColumn::make('price_label')->label('Price'),
                TextColumn::make('availability_status')->badge(),
                TextColumn::make('status')->badge(),
                IconColumn::make('is_featured')->boolean()->label('Featured'),
                TextColumn::make('updated_at')->dateTime()->sortable(),
            ])
            ->filters([
                SelectFilter::make('status')->options([
                    'draft' => 'Draft',
                    'active' => 'Active',
                    'archived' => 'Archived',
                ]),
                SelectFilter::make('category')->relationship('category', 'name'),
                SelectFilter::make('availability_status')->options([
                    'in_stock' => 'In stock',
                    'made_to_order' => 'Made to order',
                    'custom_order' => 'Custom order',
                    'unavailable' => 'Unavailable',
                ]),
                TernaryFilter::make('is_featured')->label('Featured'),
                Filter::make('missing_image')
                    ->label('Missing image')
                    ->query(fn (Builder $query) => $query->whereDoesntHave('images', fn (Builder $images) => $images->where('is_primary', true))),
                Filter::make('missing_seo')
                    ->label('Missing SEO')
                    ->query(fn (Builder $query) => $query->where(fn (Builder $inner) => $inner->whereNull('seo_description')->orWhere('seo_description', ''))),
            ])
            ->recordActions([
                EditAction::make(),
                Action::make('viewPublic')
                    ->label('View')
                    ->url(fn (Product $record) => $record->publicUrl(), shouldOpenInNewTab: true),
                Action::make('publish')
                    ->visible(fn (Product $record) => $record->status !== ProductStatus::Active)
                    ->action(function (Product $record) {
                        $record->status = ProductStatus::Active;
                        try {
                            $record->save();
                        } catch (ValidationException $exception) {
                            Notification::make()->title('Cannot publish')->body(collect($exception->errors())->flatten()->first())->danger()->send();

                            return;
                        }

                        if (! $record->images()->where('is_primary', true)->exists()) {
                            Notification::make()->title('Published without a primary image')->warning()->send();
                        }
                    }),
                Action::make('unpublish')
                    ->visible(fn (Product $record) => $record->status === ProductStatus::Active)
                    ->action(fn (Product $record) => $record->update(['status' => ProductStatus::Draft])),
                Action::make('archive')
                    ->visible(fn (Product $record) => $record->status !== ProductStatus::Archived)
                    ->action(fn (Product $record) => $record->update(['status' => ProductStatus::Archived])),
                Action::make('duplicate')
                    ->action(function (Product $record) {
                        $copy = $record->replicate();
                        $copy->name = $record->name.' (copy)';
                        $copy->slug = $record->slug.'-copy-'.Str::lower(Str::random(4));
                        $copy->sku = null;
                        $copy->status = ProductStatus::Draft;
                        $copy->save();

                        foreach ($record->images as $image) {
                            $target = 'products/'.$copy->slug.'/'.basename((string) $image->path);
                            if (filled($image->path) && Storage::disk('public')->exists($image->path)) {
                                Storage::disk('public')->copy($image->path, $target);
                            }
                            $copy->images()->create([
                                'path' => Storage::disk('public')->exists($target) ? $target : $image->path,
                                'alt_text' => $image->alt_text,
                                'sort_order' => $image->sort_order,
                                'is_primary' => $image->is_primary,
                            ]);
                        }

                        Notification::make()->title('Draft copy created')->success()->send();
                    }),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListProducts::route('/'),
            'create' => CreateProduct::route('/create'),
            'edit' => EditProduct::route('/{record}/edit'),
        ];
    }
}
