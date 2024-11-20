<?php

namespace App\Enums;

enum PenaltyCondition: string
{
    case Late = 'late';
    case Lost = 'lost';
    case Damage = 'damage';

    public static function getValues(): array
    {
        return [
            self::Late->value,
            self::Lost->value,
            self::Damage->value,
        ];
    }
}
