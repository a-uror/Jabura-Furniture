<?php

namespace App\Support;

use Illuminate\Support\Facades\Cache;

class CatalogueCache
{
    public static function remember(string $key, callable $callback): mixed
    {
        // Staff need to see a publish immediately while developing. Production holds list responses for a minute.
        if (app()->environment('local', 'testing')) {
            return $callback();
        }

        return Cache::remember($key, 60, $callback);
    }

    public static function forget(): void
    {
        foreach (['products', 'categories', 'collections', 'settings'] as $key) {
            Cache::forget('catalogue.'.$key);
        }
    }
}
