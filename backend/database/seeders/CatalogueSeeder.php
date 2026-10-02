<?php

namespace Database\Seeders;

use App\Enums\ProductStatus;
use App\Models\Category;
use App\Models\Collection;
use App\Models\Product;
use App\Models\SiteSetting;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CatalogueSeeder extends Seeder
{
    public function run(): void
    {
        User::query()->updateOrCreate(
            ['email' => env('STAFF_EMAIL', 'admin@jaburahome.com')],
            [
                'name' => env('STAFF_NAME', 'Jabura Admin'),
                'password' => env('STAFF_PASSWORD', 'password'),
                'role' => 'owner',
                'email_verified_at' => now(),
            ],
        );

        $settings = [
            'business_phone' => '+254 700 000 000',
            'whatsapp_number' => '254700000000',
            'business_email' => 'info@jaburahome.com',
            'address' => 'Cabanas, Mombasa Road, Nairobi, Kenya',
            'opening_hours' => 'Monday–Saturday, 08:00–19:00. Sunday by appointment.',
            'google_maps_url' => 'https://www.google.com/maps?q=Cabanas,+Mombasa+Road,+Nairobi,+Kenya&output=embed',
            'facebook_url' => 'https://facebook.com',
            'instagram_url' => 'https://instagram.com',
            'meta_pixel_id' => '',
            'ga4_id' => '',
        ];

        foreach ($settings as $key => $value) {
            SiteSetting::query()->updateOrCreate(['key' => $key], ['value' => $value]);
        }

        $catalog = json_decode(file_get_contents(database_path('seeders/catalog.json')), true);
        $categories = [];

        foreach ($catalog['categories'] as $index => $row) {
            $categories[$row['slug']] = Category::query()->updateOrCreate(
                ['slug' => $row['slug']],
                [
                    'name' => $row['name'],
                    'headline' => $row['headline'],
                    'description' => $row['description'],
                    'image' => $this->storePublicFile($row['image']),
                    'sort_order' => $index,
                    'is_active' => true,
                    'seo_title' => $row['name'].' | Jabura Home Furniture',
                    'seo_description' => $row['description'],
                ],
            );
        }

        $collections = [];
        foreach ($catalog['products'] as $row) {
            if (! $row['listed'] || blank($row['subcategory'])) {
                continue;
            }
            $slug = Str::slug($row['subcategory']);
            if (isset($collections[$slug])) {
                continue;
            }
            $collections[$slug] = Collection::query()->updateOrCreate(
                ['slug' => $slug],
                [
                    'name' => $row['subcategory'],
                    'description' => $row['subcategory'].' at the Jabura Juja showroom.',
                    'hero_image' => $this->storePublicFile($row['image']),
                    'sort_order' => count($collections),
                    'is_active' => true,
                    'seo_title' => $row['subcategory'].' | Jabura Home Furniture',
                    'seo_description' => $row['subcategory'].' varieties at the Jabura Juja showroom.',
                ],
            );
        }

        foreach ($catalog['products'] as $row) {
            $category = $categories[$row['category']] ?? null;
            if (! $category) {
                continue;
            }

            $collection = $collections[Str::slug((string) $row['subcategory'])] ?? null;
            $product = Product::query()->updateOrCreate(
                ['slug' => $row['slug']],
                [
                    'category_id' => $category->id,
                    'collection_id' => $collection?->id,
                    'name' => $row['name'],
                    'subcategory' => $row['subcategory'],
                    'tag' => $row['tag'],
                    'short_description' => Str::limit($row['description'], 180),
                    'description' => $row['description'],
                    'details' => $row['details'],
                    'base_price' => $row['price'],
                    'price_label' => 'KSh '.number_format((float) $row['price'], 0, '.', ','),
                    'currency' => 'KES',
                    'is_price_visible' => true,
                    'availability_status' => $row['slug'] === 'bespoke-commission' ? 'custom_order' : 'in_stock',
                    'is_custom' => $row['slug'] === 'bespoke-commission',
                    'is_featured' => $row['tag'] === 'New Arrival',
                    'is_listed' => (bool) $row['listed'],
                    'status' => ProductStatus::Draft,
                    'seo_title' => $row['name'].' | Jabura Home Furniture',
                    'seo_description' => Str::limit($row['description'], 160),
                ],
            );

            $product->images()->delete();
            $stored = 0;
            foreach ($row['gallery'] as $index => $path) {
                $storedPath = $this->storePublicFile($path);
                if (! $storedPath) {
                    continue;
                }
                $product->images()->create([
                    'path' => $storedPath,
                    'alt_text' => $row['name'],
                    'sort_order' => $index,
                    'is_primary' => $stored === 0,
                ]);
                $stored++;
            }

            if ($stored > 0) {
                $product->status = ProductStatus::Active;
                $product->save();
            }
        }
    }

    private function storePublicFile(?string $publicPath): ?string
    {
        if (blank($publicPath)) {
            return null;
        }

        $relative = ltrim($publicPath, '/');
        $source = dirname(base_path()).'/front/public/'.$relative;
        if (! is_file($source)) {
            return null;
        }

        $target = 'catalogue/'.$relative;
        Storage::disk('public')->put($target, file_get_contents($source));

        return $target;
    }
}
