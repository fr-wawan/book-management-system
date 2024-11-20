<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Penalty extends Model
{
    protected $guarded = ['id'];

    public function bookReturn()
    {
        return $this->belongsTo(BookReturn::class);
    }
}
