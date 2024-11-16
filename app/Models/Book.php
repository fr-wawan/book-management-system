<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use Sluggable, HasFactory;

    protected $guarded = ['id'];

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function scopeAvailable(Builder $query)
    {
        return $query->where('stock', '>=', 1);
    }


    public function scopeFilter(Builder $query, array $filters)
    {
        $query->when($filters['search'] ?? false, function (Builder $query, $search) {
            $query->where('title', 'like', '%' . $search . '%');
        });

        $query->when(@$filters['field'] && @$filters['direction'], function (Builder $query) use ($filters) {
            $query->orderBy($filters['field'], $filters['direction']);
        });
    }


    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'title'
            ]
        ];
    }

    public function getIsAvailableAttribute()
    {
        return $this->stock >= 1;
    }
}
