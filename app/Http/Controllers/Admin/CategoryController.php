<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Traits\HasFile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class CategoryController extends Controller
{
    use HasFile;
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $categories = Category::filter(request(['search', 'field', 'direction']))->latest()->paginate(request()->load ?? 10)->withQueryString();

        return inertia('Admin/Category/Index', [
            'categories' => CategoryResource::collection($categories),
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
    public function create(): Response
    {
        return inertia('Admin/Category/Form', [
            'category' => new Category(),
            'page_settings' => [
                'title' => 'Create Category',
                'subtitle' => 'Fill out the form to create a new category',
                'method' => 'POST',
                'action' => route('admin.categories.store')
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategoryRequest $request): RedirectResponse
    {
        $validatedData = $request->validated();

        $validatedData['cover'] = $this->upload_file($request, 'cover', 'categories');

        Category::create($validatedData);

        flashMessage('Category created successfully!');

        return to_route('admin.categories.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category): Response
    {
        return inertia('Admin/Category/Form', [
            'category' => new CategoryResource($category),
            'page_settings' => [
                'title' => 'Edit Category',
                'subtitle' => 'Update the category information',
                'method' => 'PUT',
                'action' => route('admin.categories.update', $category->id)
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $this->delete_file($category, 'cover');

        $category->delete();

        flashMessage('Category deleted successfully!');

        return to_route('admin.categories.index');
    }
}
