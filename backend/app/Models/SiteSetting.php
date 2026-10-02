<?php

namespace App\Models;

use App\Support\CatalogueCache;
use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    protected $fillable = ['key', 'value'];

    public static function keys(): array
    {
        return [
            'business_phone' => 'Business phone',
            'whatsapp_number' => 'WhatsApp number',
            'business_email' => 'Email',
            'address' => 'Address',
            'opening_hours' => 'Opening hours',
            'google_maps_url' => 'Google Maps URL',
            'facebook_url' => 'Facebook URL',
            'instagram_url' => 'Instagram URL',
            'meta_pixel_id' => 'Meta Pixel ID',
            'ga4_id' => 'GA4 measurement ID',
        ];
    }

    protected static function booted(): void
    {
        static::saved(fn () => CatalogueCache::forget());
        static::deleted(fn () => CatalogueCache::forget());
    }

    public static function getValue(string $key, ?string $default = null): ?string
    {
        $value = static::query()->where('key', $key)->value('value');

        return filled($value) ? $value : $default;
    }

    public static function map(): array
    {
        $stored = static::query()->pluck('value', 'key');

        return collect(array_keys(static::keys()))
            ->mapWithKeys(fn (string $key) => [$key => $stored[$key] ?? null])
            ->all();
    }
}
