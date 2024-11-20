<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'author' => $this->author,
            'year' => $this->year,
            'language' => $this->language,
            'pages' => $this->pages,
            'summary' => $this->summary,
            'isbn' => $this->isbn,
            'cover' => $this->cover,
            'price' => $this->price,
            'stock' => $this->stock,
            'status' => $this->stock > 0 ? 'Available' : 'Unavailable',
            'category_id' => $this->category_id,
            'publisher_id' => $this->publisher_id,
            'publisher' => new PublisherResource($this->publisher),
            'created_at' => $this->created_at,
        ];
    }
}
