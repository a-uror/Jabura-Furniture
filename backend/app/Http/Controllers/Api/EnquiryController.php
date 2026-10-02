<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Enquiry;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EnquiryController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'product_slug' => ['nullable', 'string'],
            'category_slug' => ['nullable', 'string'],
            'name' => ['nullable', 'string', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'email' => ['nullable', 'email', 'max:255'],
            'message' => ['required', 'string', 'max:5000'],
            'channel' => ['required', 'in:whatsapp,email,phone,contact_form'],
            'source' => ['nullable', 'string', 'max:100'],
            'page_url' => ['nullable', 'string', 'max:2000'],
            'referrer' => ['nullable', 'string', 'max:2000'],
            'meta_click_id' => ['nullable', 'string', 'max:255'],
            'utm' => ['nullable', 'array'],
            'utm.source' => ['nullable', 'string', 'max:255'],
            'utm.medium' => ['nullable', 'string', 'max:255'],
            'utm.campaign' => ['nullable', 'string', 'max:255'],
            'utm.content' => ['nullable', 'string', 'max:255'],
            'utm.term' => ['nullable', 'string', 'max:255'],
        ]);

        $product = filled($data['product_slug'] ?? null)
            ? Product::query()->where('slug', $data['product_slug'])->first()
            : null;
        $category = filled($data['category_slug'] ?? null)
            ? Category::query()->where('slug', $data['category_slug'])->first()
            : null;

        $enquiry = Enquiry::query()->create([
            'product_id' => $product?->id,
            'category_id' => $category?->id ?? $product?->category_id,
            'name' => $data['name'] ?? null,
            'phone' => $data['phone'] ?? null,
            'email' => $data['email'] ?? null,
            'message' => $data['message'],
            'channel' => $data['channel'],
            'source' => $data['source'] ?? null,
            'utm_source' => $data['utm']['source'] ?? null,
            'utm_medium' => $data['utm']['medium'] ?? null,
            'utm_campaign' => $data['utm']['campaign'] ?? null,
            'utm_content' => $data['utm']['content'] ?? null,
            'utm_term' => $data['utm']['term'] ?? null,
            'meta_click_id' => $data['meta_click_id'] ?? null,
            'page_url' => $data['page_url'] ?? null,
            'referrer' => $data['referrer'] ?? null,
            'status' => 'new',
        ]);

        return response()->json(['data' => ['id' => $enquiry->id]], 201);
    }
}
