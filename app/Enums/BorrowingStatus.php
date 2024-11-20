<?php

namespace App\Enums;

enum BorrowingStatus: string
{
    case Borrowed = 'Borrowed';
    case Penalty = 'Penalty';
    case Returned = 'Returned';

    public static function getValues(): array
    {
        return [
            self::Borrowed,
            self::Returned,
            self::Penalty,
        ];
    }
}
