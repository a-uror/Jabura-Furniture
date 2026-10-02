<?php

namespace App\Filament\Widgets;

use App\Models\Enquiry;
use Filament\Widgets\ChartWidget;

class EnquiriesBreakdownChart extends ChartWidget
{
    protected ?string $heading = 'Enquiries by channel';

    protected function getType(): string
    {
        return 'bar';
    }

    protected function getData(): array
    {
        $rows = Enquiry::query()
            ->selectRaw('channel, count(*) as total')
            ->groupBy('channel')
            ->pluck('total', 'channel');

        return [
            'datasets' => [
                ['label' => 'Enquiries', 'data' => $rows->values()->all()],
            ],
            'labels' => $rows->keys()->all(),
        ];
    }
}
