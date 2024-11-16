<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BorrowingResource extends JsonResource
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
            'invoice' => $this->invoice,
            'book_id' => $this->book_id,
            'book_title' => $this->book->title,
            'user_id' => $this->user_id,
            'user_name' => $this->user->name,
            'borrowed_at' => $this->borrowed_at,
            'returned_at' => $this->returned_at,
            'due_at' => $this->due_at,
            'status' => $this->status,
            'created_at' => $this->created_at->format('d-M-Y H:i:s'),
        ];
    }
}
