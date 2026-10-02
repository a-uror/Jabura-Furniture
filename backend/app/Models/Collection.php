<?php

namespace App\Models;

use App\Support\CatalogueCache;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Collection extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'hero_image',
        'sort_order',
        'is_active',
        'seo_title',
        'seo_description',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    protected static function booted(): void
    {
        static::saved(fn () => CatalogueCache::forget());
        static::deleted(fn () => CatalogueCache::forget());
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }
}
