<?php

namespace App\Http\Controllers\Api;

use App\Enums\ProductStatus;
use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Collection;
use App\Models\Product;
use App\Models\SiteSetting;
use App\Support\CatalogueCache;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CatalogueController extends Controller
{
    public function products(Request $request): JsonResponse
    {
        $search = trim((string) $request->query('q', ''));
        $category = $request->query('category');

        $products = CatalogueCache::remember('catalogue.products.'.$search.'.'.$category, function () use ($search, $category) {
            return Product::query()
                ->active()
                ->listed()
                ->with(['category', 'collection', 'images', 'primaryImage'])
                ->when($category, fn ($query) => $query->whereHas('category', fn ($categories) => $categories->where('slug', $category)))
                ->when($search !== '', function ($query) use ($search) {
                    $query->where(function ($inner) use ($search) {
                        $inner->where('name', 'like', "%{$search}%")
                            ->orWhere('subcategory', 'like', "%{$search}%")
                            ->orWhere('description', 'like', "%{$search}%");
                    });
                })
                ->orderByDesc('is_featured')
                ->orderBy('name')
                ->get();
        });

        return response()->json([
            'data' => ProductResource::collection($products)->resolve(),
        ]);
    }

    public function product(string $slug): JsonResponse
    {
        $product = Product::query()
            ->active()
            ->with(['category', 'collection', 'images', 'primaryImage'])
            ->where('slug', $slug)
            ->firstOrFail();

        $related = Product::query()
            ->active()
            ->listed()
            ->with(['category', 'images', 'primaryImage'])
            ->where('id', '!=', $product->id)
            ->orderByRaw('case when category_id = ? then 0 else 1 end', [$product->category_id])
            ->limit(6)
            ->get();

        return response()->json([
            'data' => (new ProductResource($product))->resolve(),
            'related' => ProductResource::collection($related)->resolve(),
        ]);
    }

    public function categories(): JsonResponse
    {
        $categories = CatalogueCache::remember('catalogue.categories', function () {
            return Category::query()
                ->where('is_active', true)
                ->withCount(['products as result_count' => fn ($query) => $query->where('status', ProductStatus::Active)->where('is_listed', true)])
                ->orderBy('sort_order')
                ->get()
                ->map(fn (Category $category) => $this->categoryPayload($category));
        });

        return response()->json(['data' => $categories]);
    }

    public function category(string $slug): JsonResponse
    {
        $category = Category::query()->where('is_active', true)->where('slug', $slug)->firstOrFail();
        $products = Product::query()
            ->active()
            ->listed()
            ->with(['category', 'images', 'primaryImage'])
            ->where('category_id', $category->id)
            ->orderByDesc('is_featured')
            ->orderBy('name')
            ->get();

        return response()->json([
            'data' => [
                ...$this->categoryPayload($category, $products->pluck('subcategory')->filter()->unique()->values()->all(), $products->count()),
                'products' => ProductResource::collection($products)->resolve(),
            ],
        ]);
    }

    public function collections(): JsonResponse
    {
        $collections = CatalogueCache::remember('catalogue.collections', function () {
            return Collection::query()
                ->where('is_active', true)
                ->withCount(['products as result_count' => fn ($query) => $query->where('status', ProductStatus::Active)->where('is_listed', true)])
                ->orderBy('sort_order')
                ->get()
                ->map(fn (Collection $collection) => $this->collectionPayload($collection));
        });

        return response()->json(['data' => $collections]);
    }

    public function collection(string $slug): JsonResponse
    {
        $collection = Collection::query()->where('is_active', true)->where('slug', $slug)->firstOrFail();
        $products = Product::query()
            ->active()
            ->listed()
            ->with(['category', 'images', 'primaryImage'])
            ->where('collection_id', $collection->id)
            ->orderBy('name')
            ->get();

        return response()->json([
            'data' => [
                ...$this->collectionPayload($collection, $products->count()),
                'products' => ProductResource::collection($products)->resolve(),
            ],
        ]);
    }

    public function settings(): JsonResponse
    {
        $settings = CatalogueCache::remember('catalogue.settings', fn () => SiteSetting::map());

        return response()->json(['data' => $settings]);
    }

    private function categoryPayload(Category $category, ?array $subcategories = null, ?int $count = null): array
    {
        return [
            'slug' => $category->slug,
            'name' => $category->name,
            'headline' => $category->headline ?: $category->name,
            'description' => $category->description,
            'image' => $this->publicUrl($category->image),
            'subcategories' => $subcategories ?? [],
            'result_count' => $count ?? (int) ($category->result_count ?? 0),
            'seo_title' => $category->seo_title ?: $category->name,
            'seo_description' => $category->seo_description ?: $category->description,
        ];
    }

    private function collectionPayload(Collection $collection, ?int $count = null): array
    {
        return [
            'slug' => $collection->slug,
            'name' => $collection->name,
            'description' => $collection->description,
            'image' => $this->publicUrl($collection->hero_image),
            'result_count' => $count ?? (int) ($collection->result_count ?? 0),
            'seo_title' => $collection->seo_title ?: $collection->name,
            'seo_description' => $collection->seo_description ?: $collection->description,
        ];
    }

    private function publicUrl(?string $path): ?string
    {
        if (blank($path)) {
            return null;
        }

        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
            return $path;
        }

        return rtrim(config('app.url'), '/').'/storage/'.ltrim($path, '/');
    }
}
