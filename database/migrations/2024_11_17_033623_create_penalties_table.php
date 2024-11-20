<?php

use App\Models\BookReturn;
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
        Schema::create('penalties', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(BookReturn::class)
                ->constrained('book_returns')
                ->cascadeOnDelete();
            $table->enum('condition', ['lost', 'damage']);
            $table->bigInteger('condition_amount');
            $table->bigInteger('late_amount');
            $table->bigInteger('total_amount');
            $table->enum('status', ['pending', 'completed'])->default('pending');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penalties');
    }
};
