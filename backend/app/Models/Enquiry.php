<?php

namespace App\Models;

use App\Enums\EnquiryStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Enquiry extends Model
{
    protected $fillable = [
        'product_id',
        'category_id',
        'name',
        'phone',
        'email',
        'message',
        'channel',
        'source',
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'utm_content',
        'utm_term',
        'meta_click_id',
        'page_url',
        'referrer',
        'status',
        'assigned_to',
    ];

    protected function casts(): array
    {
        return [
            'status' => EnquiryStatus::class,
        ];
    }

    protected static function booted(): void
    {
        static::created(function (Enquiry $enquiry) {
            $users = User::query()->get();
            if ($users->isEmpty()) {
                return;
            }

            \Filament\Notifications\Notification::make()
                ->title('New '.str_replace('_', ' ', $enquiry->channel).' enquiry')
                ->body(str($enquiry->message)->limit(140)->toString())
                ->sendToDatabase($users);
        });
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function assignee(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function whatsappUrl(): ?string
    {
        $number = preg_replace('/\D+/', '', (string) ($this->phone ?: SiteSetting::getValue('whatsapp_number')));
        if (blank($number)) {
            return null;
        }

        $text = trim('Hello, this is Jabura following up on your enquiry. '.$this->message);

        return 'https://wa.me/'.$number.'?text='.rawurlencode($text);
    }
}
