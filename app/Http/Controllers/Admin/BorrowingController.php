<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\BorrowingRequest;
use App\Http\Resources\BorrowingResource;
use App\Models\Book;
use App\Models\Borrowing;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Services\BorrowingService;

class BorrowingController extends Controller
{

    public function __construct(public BorrowingService $borrowingService) {}
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $borrowings = Borrowing::with(['book', 'user'])->paginate(request()->load ?? 10);

        return inertia('Admin/Borrowing/Index', [
            'borrowings' => BorrowingResource::collection($borrowings),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => request('load') ?? 10,
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Admin/Borrowing/Form', [
            'borrowing' => new Borrowing(),
            'books' => Book::available()->get(),
            'users' => User::role('user')->get(),
            'page_settings' => [
                'title' => 'Create Borrowing',
                'subtitle' => 'Fill out the form to create a new borrowing',
                'method' => 'POST',
                'action' => route('admin.borrowings.store')
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(BorrowingRequest $request)
    {
        $book = Book::findOrFail($request->book_id);

        if (!$book->is_available) {
            return $this->borrowingService->handleOutOfStockResponse();
        }

        if ($this->borrowingService->isAlreadyBorrowed($book->id, $request->user_id)) {
            return $this->borrowingService->handleAlreadyBorrowedResponse();
        }

        $this->borrowingService->createBorrowing($book, $request->user_id);

        return redirect()->route('admin.borrowings.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Borrowing $borrowing)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Borrowing $borrowing)
    {
        return inertia('Admin/Borrowing/Form', [
            'borrowing' => $borrowing,
            'books' => Book::available()->get(),
            'users' => User::role('user')->get(),
            'page_settings' => [
                'title' => 'Edit Borrowing',
                'subtitle' => 'Fill out the form to edit a new borrowing',
                'method' => 'PUT',
                'action' => route('admin.borrowings.update', $borrowing->id)
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Borrowing $borrowing)
    {
        $book = Book::findOrFail($request->book_id);

        if (!$book->is_available) {
            return $this->borrowingService->handleOutOfStockResponse();
        }

        if ($this->borrowingService->isAlreadyBorrowed($book->id, $request->user_id)) {
            return $this->borrowingService->handleAlreadyBorrowedResponse();
        }

        $this->borrowingService->updateBorrowing($borrowing->load('book'), $book, $request->user_id);

        flashMessage('Borrowing updated successfully', 'success');

        return redirect()->route('admin.borrowings.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Borrowing $borrowing)
    {
        $borrowing->delete();

        flashMessage('Borrowing deleted successfully', 'success');

        return redirect()->route('admin.borrowings.index');
    }
}
