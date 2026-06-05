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
        Schema::create('about_settings', function (Blueprint $table) {
            $table->id();

            $table->string('badge_text')->default('About Us');
            $table->string('title')->default('Meet The Founder');

            $table->string('founder_image')->nullable();
            $table->string('founder_name')->default('Afandy');
            $table->string('founder_position')->default('Founder & Creative Director');

            $table->text('quote')->nullable();
            $table->text('description_1')->nullable();
            $table->text('description_2')->nullable();

            $table->json('stats')->nullable();
            $table->json('values')->nullable();

            $table->boolean('is_active')->default(true);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('about_settings');
    }
};