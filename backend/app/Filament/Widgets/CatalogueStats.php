<?php

namespace App\Filament\Widgets;

use App\Enums\ProductStatus;
use App\Models\Enquiry;
use App\Models\Product;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class CatalogueStats extends StatsOverviewWidget
{
    protected function getStats(): array
    {
        $topProductId = Enquiry::query()
            ->selectRaw('product_id, count(*) as total')
            ->whereNotNull('product_id')
            ->groupBy('product_id')
            ->orderByDesc('total')
            ->value('product_id');

        $topCampaign = Enquiry::query()
            ->selectRaw('utm_campaign, count(*) as total')
            ->whereNotNull('utm_campaign')
            ->where('utm_campaign', '!=', '')
            ->groupBy('utm_campaign')
            ->orderByDesc('total')
            ->value('utm_campaign');

        return [
            Stat::make('Enquiries today', (string) Enquiry::query()->whereDate('created_at', today())->count()),
            Stat::make('Enquiries this week', (string) Enquiry::query()->where('created_at', '>=', now()->startOfWeek())->count()),
            Stat::make('Top product', $topProductId ? (Product::query()->whereKey($topProductId)->value('name') ?: '—') : '—'),
            Stat::make('Top campaign', $topCampaign ?: '—'),
            Stat::make('Missing SEO', (string) Product::query()->where('status', ProductStatus::Active)->where(fn ($query) => $query->whereNull('seo_description')->orWhere('seo_description', ''))->count()),
            Stat::make('Missing images', (string) Product::query()->where('status', ProductStatus::Active)->whereDoesntHave('images', fn ($query) => $query->where('is_primary', true))->count()),
        ];
    }
}
