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
        Schema::create('hero_settings', function (Blueprint $table) {
            $table->id();

            // Images
            $table->string('logo_image')->nullable();
            $table->string('brand_image')->nullable();
            $table->string('hero_title_image')->nullable();
            $table->string('hero_character_desktop')->nullable();
            $table->string('hero_character_mobile')->nullable();
            $table->string('hero_background_image')->nullable();
            $table->string('signature_image')->nullable();

            // Text Content
            $table->string('welcome_text')->default('WELCOME TO');
            $table->string('subtitle')->default('CREATIVE STUDIO & DIGITAL ART AGENCY');
            $table->text('description')->nullable();

            // Buttons
            $table->string('primary_button_text')->default('Explore Portfolio');
            $table->string('primary_button_link')->default('#portfolio');
            $table->string('secondary_button_text')->default('Start Project');
            $table->string('secondary_button_link')->default('#contact');

            // Dynamic Content
            $table->json('stats')->nullable();
            $table->json('service_cards')->nullable();
            $table->json('social_links')->nullable();

            $table->boolean('is_active')->default(true);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hero_settings');
    }
};