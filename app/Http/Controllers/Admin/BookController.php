<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\BookRequest;
use App\Http\Resources\BookResource;
use App\Models\Book;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Response;
use App\Models\Publisher;
use App\Traits\HasFile;

class BookController extends Controller
{
    use HasFile;
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $books = Book::filter(request(['search', 'field', 'direction']))->latest()->paginate(request()->load ?? 10);
        return inertia('Admin/Book/Index', [
            'books' => BookResource::collection($books),
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
        return inertia('Admin/Book/Form', [
            'book' => new Book(),
            'categories' => Category::all(),
            'publishers' => Publisher::all(),
            'page_settings' => [
                'title' => 'Create Book',
                'subtitle' => 'Fill out the form to create a new book',
                'method' => 'POST',
                'action' => route('admin.books.store')
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(BookRequest $request)
    {
        $validatedData = $request->validated();
        $validatedData['cover'] = $this->upload_file($request, 'cover', 'books');
        Book::create($validatedData);

        flashMessage('Book created successfully');

        return to_route('admin.books.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Book $book)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Book $book)
    {
        return inertia('Admin/Book/Form', [
            'book' => new BookResource($book),
            'categories' => Category::all(),
            'publishers' => Publisher::all(),
            'page_settings' => [
                'title' => 'Create Book',
                'subtitle' => 'Fill out the form to create a new book',
                'method' => 'POST',
                'action' => route('admin.books.update', $book->id)
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Book $book)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book)
    {
        $this->delete_file($book, 'cover');

        $book->delete();
    }
}
