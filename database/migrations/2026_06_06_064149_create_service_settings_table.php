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
        Schema::create('service_settings', function (Blueprint $table) {
            $table->id();

            $table->string('badge_text')->default('WHAT WE OFFER');
            $table->string('title_white')->default('OUR');
            $table->string('title_red')->default('SERVICES');

            $table->text('description')->nullable();

            $table->string('background_image')->nullable();
            $table->string('character_image')->nullable();

            $table->json('service_cards')->nullable();

            $table->boolean('is_active')->default(true);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_settings');
    }
};