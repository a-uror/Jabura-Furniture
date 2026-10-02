<?php

namespace App\Http\Resources;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin Product */
class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $primary = $this->primaryImage ?? $this->images->first();

        return [
            'slug' => $this->slug,
            'name' => $this->name,
            'category_slug' => $this->category?->slug,
            'category_name' => $this->category?->name,
            'subcategory' => $this->subcategory,
            'collection_slug' => $this->collection?->slug,
            'price' => $this->is_price_visible && $this->base_price !== null ? (float) $this->base_price : null,
            'price_label' => $this->is_price_visible ? $this->price_label : null,
            'is_price_visible' => $this->is_price_visible,
            'currency' => $this->currency,
            'tag' => $this->tag,
            'image' => $primary?->url('card'),
            'image_alt' => $primary?->alt_text ?: $this->name,
            'gallery' => $this->images->map(fn ($image) => [
                'url' => $image->url('detail'),
                'alt' => $image->alt_text ?: $this->name,
            ])->values(),
            'description' => $this->description,
            'short_description' => $this->short_description,
            'details' => $this->details ?? [],
            'availability_status' => $this->availability_status,
            'is_custom' => $this->is_custom,
            'is_featured' => $this->is_featured,
            'lead_time' => $this->lead_time,
            'dimensions' => $this->dimensions,
            'material' => $this->material,
            'finish' => $this->finish,
            'seo_title' => $this->seo_title ?: $this->name,
            'seo_description' => $this->seo_description ?: $this->short_description,
            'updated_at' => $this->updated_at?->toAtomString(),
        ];
    }
}
