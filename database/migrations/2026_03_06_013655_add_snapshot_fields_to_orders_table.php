<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (!Schema::hasColumn('orders', 'shipping_region')) {
            Schema::table('orders', function (Blueprint $table) {
                // Add snapshot fields
                $table->string('shipping_region')->nullable();
                $table->string('shipping_town')->nullable();
                $table->string('shipping_address')->nullable();
                $table->string('shipping_full_name')->nullable();
                $table->string('shipping_phone')->nullable();
                $table->string('shipping_email')->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn([
                'shipping_region',
                'shipping_town',
                'shipping_address',
                'shipping_full_name',
                'shipping_phone',
                'shipping_email'
            ]);
        });
    }
};
