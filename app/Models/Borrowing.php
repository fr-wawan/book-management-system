<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Borrowing extends Model
{
    protected $guarded = ['id'];

    public function getRouteKeyName()
    {
        return 'invoice';
    }

    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function bookReturn()
    {
        return $this->hasOne(BookReturn::class);
    }
}
