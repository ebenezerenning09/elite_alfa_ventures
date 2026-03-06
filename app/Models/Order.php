<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'order_number',
        'total_amount',
        'status',
        'shipping_region',
        'shipping_town',
        'shipping_address',
        'shipping_full_name',
        'shipping_phone',
        'shipping_email',
    ];

    protected function casts(): array
    {
        return [
            'total_amount' => 'decimal:2',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    // Alias for backward compatibility
    public function items(): HasMany
    {
        return $this->orderItems();
    }

    public function payment(): HasOne
    {
        return $this->hasOne(Payment::class);
    }

    // Removed shippingAddress() relation because snapshot is used instead.
}
