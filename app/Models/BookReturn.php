<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BookReturn extends Model
{
    protected $guarded = ['id'];

    public function borrowing()
    {
        return $this->belongsTo(Borrowing::class);
    }

    public function penalty()
    {
        return $this->hasOne(Penalty::class);
    }
}
