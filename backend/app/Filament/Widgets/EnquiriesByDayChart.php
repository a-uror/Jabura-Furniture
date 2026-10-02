<?php

namespace App\Filament\Widgets;

use App\Models\Enquiry;
use Filament\Widgets\ChartWidget;

class EnquiriesByDayChart extends ChartWidget
{
    protected ?string $heading = 'Enquiries by day';

    protected function getType(): string
    {
        return 'line';
    }

    protected function getData(): array
    {
        $start = now()->subDays(13)->startOfDay();
        $counts = Enquiry::query()
            ->where('created_at', '>=', $start)
            ->get()
            ->groupBy(fn (Enquiry $enquiry) => $enquiry->created_at->toDateString());

        $labels = [];
        $data = [];
        for ($day = $start->copy(); $day->lte(now()); $day->addDay()) {
            $key = $day->toDateString();
            $labels[] = $day->format('d M');
            $data[] = $counts->get($key)?->count() ?? 0;
        }

        return [
            'datasets' => [
                ['label' => 'Enquiries', 'data' => $data],
            ],
            'labels' => $labels,
        ];
    }
}
