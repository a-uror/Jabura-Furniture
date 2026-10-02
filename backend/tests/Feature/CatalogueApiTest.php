<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CatalogueApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_catalogue_returns_only_active_listed_products(): void
    {
        $category = Category::query()->create([
            'name' => 'Living Room',
            'slug' => 'living-room',
            'description' => 'Sofas you can sit on in Juja.',
            'is_active' => true,
            'seo_description' => 'Living room furniture in Juja.',
        ]);

        Product::query()->create([
            'category_id' => $category->id,
            'name' => 'Forest Green Recliner',
            'slug' => 'forest-green-recliner',
            'description' => 'A recliner on the Juja floor.',
            'seo_description' => 'Forest green recliner at Jabura.',
            'base_price' => 289000,
            'price_label' => 'KSh 289,000',
            'status' => 'active',
            'is_listed' => true,
        ]);

        Product::query()->create([
            'category_id' => $category->id,
            'name' => 'Hidden draft',
            'slug' => 'hidden-draft',
            'description' => 'Not public.',
            'seo_description' => 'Not public.',
            'status' => 'draft',
        ]);

        $this->getJson('/api/products')
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.slug', 'forest-green-recliner');

        $this->getJson('/api/products/hidden-draft')->assertNotFound();
        $this->getJson('/api/categories/living-room')
            ->assertOk()
            ->assertJsonPath('data.slug', 'living-room');
    }

    public function test_enquiry_is_stored_with_campaign_data(): void
    {
        $this->postJson('/api/enquiries', [
            'message' => 'I am interested in this sofa.',
            'channel' => 'whatsapp',
            'source' => 'product_detail',
            'page_url' => 'http://localhost:3000/products/forest-green-recliner',
            'utm' => ['source' => 'facebook', 'campaign' => 'sofas_october'],
        ])->assertCreated();

        $this->assertDatabaseHas('enquiries', [
            'channel' => 'whatsapp',
            'utm_source' => 'facebook',
            'utm_campaign' => 'sofas_october',
            'status' => 'new',
        ]);
    }

    public function test_staff_can_open_the_product_form(): void
    {
        $this->get('/admin/login')->assertOk();

        $user = User::factory()->create(['role' => 'owner']);

        $this->actingAs($user);
        foreach (['/admin/products/create', '/admin', '/admin/categories', '/admin/collections', '/admin/enquiries', '/admin/site-settings'] as $url) {
            $this->get($url)->assertOk();
        }
    }
}
