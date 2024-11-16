<?php

use App\Models\Book;
use App\Models\User;
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
        Schema::create('borrowings', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)
                ->constrained('users')
                ->cascadeOnDelete();
            $table->foreignIdFor(Book::class)
                ->constrained('books')
                ->cascadeOnDelete();
            $table->string('invoice')->unique();
            $table->date('borrowed_at')->default(now());
            $table->date('due_at')->default(now()->addDays(7));
            $table->date('returned_at')->nullable();
            $table->enum('status', ['Borrowed', 'Returned'])->default('Borrowed');
            $table->boolean('is_approved')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('borrowings');
    }
};
