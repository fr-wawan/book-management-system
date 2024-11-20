<?php

namespace App\Services;

use App\Models\Borrowing;

class BookReturnService
{
    public function returnBook(Borrowing $borrowing)
    {
        $borrowing->load('bookReturn');

        if ($borrowing->bookReturn) {
            return $borrowing->bookReturn;
        }

        $bookReturn = $borrowing->bookReturn()->create([
            'returned_at' => now()
        ]);

        return $bookReturn;
    }
}
