<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\BorrowingResource;

class BookReturnResource extends JsonResource
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
            'borrowing_id' => $this->borrowing_id,
            'borrowing' => new BorrowingResource($this->borrowing),
            'returned_at' => $this->returned_at,
            'status' => $this->status,
            'penalty' => $this->penalty,
            'created_at' => $this->created_at->format('d-M-Y H:i:s'),
        ];
    }
}
