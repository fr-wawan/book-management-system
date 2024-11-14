<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PublisherRequest;
use App\Http\Resources\PublisherResource;
use App\Models\Publisher;
use Illuminate\Http\Request;
use Inertia\Response;

class PublisherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $publishers = Publisher::filter(request(['search', 'load', 'direction', 'field']))->latest()->paginate(request()->load ?? 10)->withQueryString();
        return inertia('Admin/Publisher/Index', [
            'publishers' => PublisherResource::collection($publishers),
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
        return inertia('Admin/Publisher/Form', [
            'publisher' => new Publisher(),
            'page_settings' => [
                'title' => 'Create Publisher',
                'subtitle' => 'Fill out the form to create a new publisher',
                'method' => 'POST',
                'action' => route('admin.publishers.store')
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PublisherRequest $request)
    {
        Publisher::create($request->validated());

        flashMessage('Publisher created successfully');

        return to_route('admin.publishers.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Publisher $publisher)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Publisher $publisher)
    {
        return inertia('Admin/Publisher/Form', [
            'publisher' => new PublisherResource($publisher),
            'page_settings' => [
                'title' => 'Edit Publisher',
                'subtitle' => 'Update the publisher details',
                'method' => 'PUT',
                'action' => route('admin.publishers.update', $publisher)
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Publisher $publisher)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Publisher $publisher)
    {
        $publisher->delete();

        flashMessage('Publisher deleted successfully');

        return to_route('admin.publishers.index');
    }
}
