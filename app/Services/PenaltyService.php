<?php

namespace App\Services;

use App\Enums\PenaltyCondition;
use App\Models\Book;
use App\Models\BookReturn;
use App\Models\Borrowing;
use App\Models\BorrowingPenalty;
use App\Models\Penalty;
use App\Models\PenaltyDetail;
use App\Models\PenaltySetting;
use Carbon\Carbon;

class PenaltyService
{
    public function createPenalty(BookReturn $bookReturn, string $condition, $notes = '')
    {
        $penaltyConditionFee = $this->calculatePenaltyCondition($bookReturn->borrowing->book, $condition);

        $penaltyLateFee = $this->calculatePenaltyLate($bookReturn->borrowing);

        $totalPenalty = $penaltyLateFee + $penaltyConditionFee;

        $bookReturn->penalty()->delete();

        if (!$totalPenalty) {
            return 0;
        }

        $bookReturn->penalty()->create([
            'condition' => $condition,
            'condition_amount' => $penaltyConditionFee,
            'late_amount' => $penaltyLateFee,
            'total_amount' => $totalPenalty,
            'notes' => $notes
        ]);


        return $totalPenalty;
    }

    private function calculatePenaltyCondition(Book $book, string $condition)
    {
        if ($condition === 'good') {
            return 0;
        }

        $penaltyCondition = PenaltySetting::where('condition', $condition)->first();

        $penaltyConditionFee = ($penaltyCondition->amount / 100) * $book->price;

        return $penaltyConditionFee;
    }

    private function calculatePenaltyLate(Borrowing $borrowing)
    {
        if ($borrowing->due_at > Carbon::now()) {
            return 0;
        }

        $lateDays = Carbon::now()->diffInDays($borrowing->due_date);

        $penaltyLateSetting = PenaltySetting::where('condition', PenaltyCondition::Late->value)->first();


        $totalPenalty = $penaltyLateSetting->amount * $lateDays;

        return $totalPenalty;

        return 0;
    }
}
