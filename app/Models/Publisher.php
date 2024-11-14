<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Publisher extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function scopeFilter(Builder $query, array $filters)
    {
        $query->when($filters['search'] ?? false, function (Builder $query, $search) {
            $query->where('name', 'like', '%' . $search . '%');
        });

        $query->when(@$filters['field'] && @$filters['direction'], function (Builder $query) use ($filters) {
            $query->orderBy($filters['field'], $filters['direction']);
        });
    }
}
