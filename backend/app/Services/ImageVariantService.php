<?php

namespace App\Services;

use App\Models\ProductImage;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;
use Throwable;

class ImageVariantService
{
    public function generate(ProductImage $image): void
    {
        if (blank($image->path) || filled($image->thumb_path)) {
            return;
        }

        $disk = Storage::disk('public');

        if (! $disk->exists($image->path)) {
            return;
        }

        try {
            $manager = new ImageManager(new Driver());
            $absolute = $disk->path($image->path);
            $directory = trim(dirname($image->path), '.');
            $name = pathinfo($image->path, PATHINFO_FILENAME);
            $updates = [];

            foreach (['thumb' => 300, 'card' => 700, 'detail' => 1400] as $key => $width) {
                $relative = ($directory !== '' ? $directory.'/' : '').$name.'-'.$key.'.webp';
                $encoded = $manager->decodePath($absolute)->scale(width: $width)->encodeUsingFileExtension('webp', quality: 82);
                $disk->put($relative, (string) $encoded);
                $updates[$key.'_path'] = $relative;
            }

            $image->forceFill($updates)->saveQuietly();
        } catch (Throwable) {
            // Keep the original upload if a variant cannot be encoded.
        }
    }
}
