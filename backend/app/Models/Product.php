<?php

namespace App\Models;

use App\Enums\ProductStatus;
use App\Support\CatalogueCache;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Validation\ValidationException;

class Product extends Model
{
    protected $fillable = [
        'category_id',
        'collection_id',
        'name',
        'slug',
        'sku',
        'subcategory',
        'tag',
        'short_description',
        'description',
        'details',
        'base_price',
        'price_label',
        'currency',
        'is_price_visible',
        'availability_status',
        'is_custom',
        'is_featured',
        'is_listed',
        'status',
        'lead_time',
        'dimensions',
        'material',
        'finish',
        'care_instructions',
        'seo_title',
        'seo_description',
    ];

    protected function casts(): array
    {
        return [
            'details' => 'array',
            'base_price' => 'decimal:2',
            'is_price_visible' => 'boolean',
            'is_custom' => 'boolean',
            'is_featured' => 'boolean',
            'is_listed' => 'boolean',
            'status' => ProductStatus::class,
        ];
    }

    protected static function booted(): void
    {
        static::saving(function (Product $product) {
            if (blank($product->price_label) && filled($product->base_price)) {
                $product->price_label = 'KSh '.number_format((float) $product->base_price, 0, '.', ',');
            }

            // Drafts may be incomplete. Active is what the public API serves, so the storefront fields have to be filled in.
            if ($product->status !== ProductStatus::Active) {
                return;
            }

            $missing = [];
            foreach (['name' => 'name', 'slug' => 'slug', 'category_id' => 'category', 'description' => 'description', 'seo_description' => 'SEO description'] as $field => $label) {
                if (blank($product->{$field})) {
                    $missing[] = $label;
                }
            }

            if ($product->is_price_visible && blank($product->base_price) && blank($product->price_label)) {
                $missing[] = 'price or price label';
            }

            if ($missing !== []) {
                throw ValidationException::withMessages([
                    'status' => 'Active products need: '.implode(', ', $missing).'.',
                ]);
            }
        });

        static::saved(function (Product $product) {
            CatalogueCache::forget();

            if ($product->status !== ProductStatus::Active) {
                return;
            }

            if (! $product->wasChanged('status') && ! $product->wasRecentlyCreated) {
                return;
            }

            $incomplete = blank($product->seo_description)
                || ! $product->images()->where('is_primary', true)->exists();

            if (! $incomplete) {
                return;
            }

            $users = User::query()->get();
            if ($users->isEmpty()) {
                return;
            }

            \Filament\Notifications\Notification::make()
                ->title($product->name.' is active but incomplete')
                ->body('Add a primary image and an SEO description before this piece is public.')
                ->warning()
                ->sendToDatabase($users);
        });

        static::deleted(fn () => CatalogueCache::forget());
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function collection(): BelongsTo
    {
        return $this->belongsTo(Collection::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(ProductImage::class)->orderBy('sort_order');
    }

    public function primaryImage(): HasOne
    {
        return $this->hasOne(ProductImage::class)->where('is_primary', true);
    }

    public function scopeActive($query)
    {
        return $query->where('status', ProductStatus::Active->value);
    }

    public function scopeListed($query)
    {
        return $query->where('is_listed', true);
    }

    public function publicUrl(): string
    {
        return config('jabura.frontend_url').'/products/'.$this->slug;
    }
}
