<?php

namespace App\Http\Controllers\Admin;

use App\Enums\BorrowingStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ReturnRequest;
use App\Http\Resources\BookReturnResource;
use App\Http\Resources\BorrowingResource;
use App\Models\BookReturn;
use App\Models\Borrowing;
use App\Services\BookReturnService;
use App\Services\PenaltyService;
use Illuminate\Http\Request;

class ReturnController extends Controller
{

    public function __construct(public PenaltyService $penaltyService, public BookReturnService $bookReturnService) {}

    public function index()
    {
        $bookReturns = BookReturn::with(['borrowing', 'borrowing.book', 'borrowing.user'])
            ->paginate(request()->load ?? 10);

        return inertia('Admin/Return/Index', [
            'returns' => BookReturnResource::collection($bookReturns),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => request('load') ?? 10,
            ]
        ]);
    }

    public function show(Borrowing $borrowing)
    {
        $borrowing = $borrowing->load(['book.publisher', 'user',]);

        return inertia('Admin/Return/Show', [
            'borrowing' => new BorrowingResource($borrowing),
            'bookReturn' => $borrowing->bookReturn ? new BookReturnResource($borrowing->bookReturn) : null,
            'page_settings' => [
                'title' => 'Return Book',
                'subtitle' => 'Fill out the form to return the book',
                'method' => 'POST',
                'action' => route('admin.returns.store', $borrowing->invoice)
            ],
        ]);
    }

    public function store(ReturnRequest $request, Borrowing $borrowing)
    {

        $bookReturn = $this->bookReturnService->returnBook($borrowing);

        $penalty = $this->penaltyService->createPenalty($bookReturn, $request->condition, $request->notes);

        $bookReturn->update([
            'status' => $penalty ? 'penalty' : 'completed'
        ]);

        flashMessage('Book returned successfully');

        return redirect()->route('admin.returns.index');
    }
}
