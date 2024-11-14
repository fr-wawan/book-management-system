<?php

use App\Models\Category;
use App\Models\Publisher;
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
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('author');
            $table->integer('year');
            $table->string('isbn');
            $table->string('language');
            $table->text('summary');
            $table->string('cover');
            $table->integer('pages');
            $table->bigInteger('price');
            $table->integer('stock');
            $table->foreignIdFor(Publisher::class)->constrained('publishers')->cascadeOnDelete();
            $table->foreignIdFor(Category::class)->constrained('categories')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
