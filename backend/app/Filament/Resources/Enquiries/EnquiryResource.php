<?php

namespace App\Filament\Resources\Enquiries;

use App\Enums\EnquiryStatus;
use App\Filament\Resources\Enquiries\Pages\ManageEnquiries;
use App\Models\Enquiry;
use Filament\Actions\Action;
use Filament\Actions\EditAction;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class EnquiryResource extends Resource
{
    protected static ?string $model = Enquiry::class;

    protected static string|\BackedEnum|null $navigationIcon = Heroicon::OutlinedInbox;

    protected static string|\UnitEnum|null $navigationGroup = 'Sales';

    protected static ?string $navigationLabel = 'Enquiries';

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('name'),
            TextInput::make('phone'),
            TextInput::make('email')->email(),
            Textarea::make('message')->required()->rows(4),
            Select::make('product_id')->relationship('product', 'name')->searchable()->preload(),
            Select::make('category_id')->relationship('category', 'name')->searchable()->preload(),
            Select::make('channel')->options([
                'whatsapp' => 'WhatsApp',
                'email' => 'Email',
                'phone' => 'Phone',
                'contact_form' => 'Contact form',
            ])->required(),
            TextInput::make('source'),
            TextInput::make('utm_source'),
            TextInput::make('utm_medium'),
            TextInput::make('utm_campaign'),
            TextInput::make('utm_content'),
            TextInput::make('utm_term'),
            TextInput::make('page_url'),
            TextInput::make('referrer'),
            Select::make('status')->options([
                'new' => 'New',
                'contacted' => 'Contacted',
                'quoted' => 'Quoted',
                'won' => 'Won',
                'lost' => 'Lost',
            ])->required(),
            Select::make('assigned_to')->relationship('assignee', 'name')->searchable()->preload(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('created_at')->dateTime()->sortable(),
                TextColumn::make('status')->badge(),
                TextColumn::make('product.name')->label('Product'),
                TextColumn::make('name')->label('Customer')->placeholder('—'),
                TextColumn::make('channel')->badge(),
                TextColumn::make('utm_campaign')->label('Campaign')->placeholder('—'),
                TextColumn::make('assignee.name')->label('Assigned'),
            ])
            ->filters([
                SelectFilter::make('status')->options([
                    'new' => 'New',
                    'contacted' => 'Contacted',
                    'quoted' => 'Quoted',
                    'won' => 'Won',
                    'lost' => 'Lost',
                ]),
                SelectFilter::make('channel')->options([
                    'whatsapp' => 'WhatsApp',
                    'email' => 'Email',
                    'phone' => 'Phone',
                    'contact_form' => 'Contact form',
                ]),
                SelectFilter::make('product')->relationship('product', 'name'),
                SelectFilter::make('utm_campaign')->label('Campaign'),
                Filter::make('created_at')
                    ->schema([
                        \Filament\Forms\Components\DatePicker::make('from'),
                        \Filament\Forms\Components\DatePicker::make('until'),
                    ])
                    ->query(function (Builder $query, array $data) {
                        return $query
                            ->when($data['from'] ?? null, fn (Builder $query, $date) => $query->whereDate('created_at', '>=', $date))
                            ->when($data['until'] ?? null, fn (Builder $query, $date) => $query->whereDate('created_at', '<=', $date));
                    }),
            ])
            ->recordActions([
                EditAction::make(),
                Action::make('whatsapp')
                    ->label('WhatsApp')
                    ->url(fn (Enquiry $record) => $record->whatsappUrl() ?: '#', shouldOpenInNewTab: true)
                    ->visible(fn (Enquiry $record) => filled($record->whatsappUrl())),
                Action::make('product')
                    ->label('Product')
                    ->url(fn (Enquiry $record) => $record->product?->publicUrl(), shouldOpenInNewTab: true)
                    ->visible(fn (Enquiry $record) => $record->product !== null),
                Action::make('contacted')->action(fn (Enquiry $record) => $record->update(['status' => EnquiryStatus::Contacted])),
                Action::make('quoted')->action(fn (Enquiry $record) => $record->update(['status' => EnquiryStatus::Quoted])),
                Action::make('won')->action(fn (Enquiry $record) => $record->update(['status' => EnquiryStatus::Won])),
                Action::make('lost')->action(fn (Enquiry $record) => $record->update(['status' => EnquiryStatus::Lost])),
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function getPages(): array
    {
        return [
            'index' => ManageEnquiries::route('/'),
        ];
    }
}
