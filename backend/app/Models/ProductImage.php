<?php

namespace App\Models;

use App\Services\ImageVariantService;
use App\Support\CatalogueCache;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class ProductImage extends Model
{
    protected $fillable = [
        'product_id',
        'path',
        'thumb_path',
        'card_path',
        'detail_path',
        'alt_text',
        'sort_order',
        'is_primary',
    ];

    protected function casts(): array
    {
        return [
            'is_primary' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    protected static function booted(): void
    {
        static::saving(function (ProductImage $image) {
            if ($image->isDirty('path')) {
                $image->thumb_path = null;
                $image->card_path = null;
                $image->detail_path = null;
            }
        });

        static::saved(function (ProductImage $image) {
            if ($image->is_primary) {
                static::query()
                    ->where('product_id', $image->product_id)
                    ->whereKeyNot($image->id)
                    ->update(['is_primary' => false]);
            }

            app(ImageVariantService::class)->generate($image);
            CatalogueCache::forget();
        });

        static::deleted(function (ProductImage $image) {
            Storage::disk('public')->delete(array_filter([
                $image->path,
                $image->thumb_path,
                $image->card_path,
                $image->detail_path,
            ]));
            CatalogueCache::forget();
        });
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function url(?string $variant = null): ?string
    {
        $path = match ($variant) {
            'thumb' => $this->thumb_path ?: $this->path,
            'card' => $this->card_path ?: $this->path,
            'detail' => $this->detail_path ?: $this->path,
            default => $this->path,
        };

        if (blank($path)) {
            return null;
        }

        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
            return $path;
        }

        return rtrim(config('app.url'), '/').'/storage/'.ltrim($path, '/');
    }
}
