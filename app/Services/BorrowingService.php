<?php

namespace App\Services;

use App\Enums\BorrowingStatus;
use App\Models\Borrowing;
use App\Models\Book;

class BorrowingService
{
    public function createBorrowing(Book $book, $userId)
    {
        $borrowing = Borrowing::create([
            'book_id' => $book->id,
            'user_id' => $userId,
            'borrowed_at' => now(),
            'due_at' => now()->addDays(7),
            'invoice' => 'INV/' . now()->format('Ymd') . '/' . rand(100, 999),
        ]);

        $book->decrement('stock');

        return $borrowing;
    }

    public function updateBorrowing(
        Borrowing $borrowing,
        Book $book,
        int $userId,
        $status = BorrowingStatus::Borrowed->value
    ) {

        if ($borrowing->book_id != $book->id) {
            $borrowing->book->increment('stock');
            $book->decrement('stock');
        }

        $borrowing->update([
            'user_id' => $userId,
            'book_id' => $book->id,
            'status' => $status,
        ]);

        return $borrowing;
    }


    public function isAlreadyBorrowed($bookId, $userId)
    {
        return Borrowing::where('book_id', $bookId)
            ->where('user_id', $userId)
            ->whereNull('returned_at')
            ->exists();
    }

    public function handleOutOfStockResponse()
    {
        flashMessage('Book is out of stock', 'error');
        return redirect()->back();
    }

    public function handleAlreadyBorrowedResponse()
    {
        flashMessage('Book is already borrowed by the user', 'error');
        return redirect()->back();
    }
}
