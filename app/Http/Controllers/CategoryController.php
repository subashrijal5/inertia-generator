<?php

namespace App\Http\Controllers;

use App\Services\CategoryService;
use App\Http\Requests\CategoryRequest;
use Illuminate\Http\Request;

class CategoryController extends WebBaseController
{
    public function __construct(private CategoryService $service){

    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories = $this->service->paginate(request('per_page', 20), request('keywords', ''),  ["*"], 'page', null);
        return $this->renderPage('Category/Index', ['data' => $categories]);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return $this->renderPage('Category/Fields', []);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CategoryRequest $request)
    {
      $category =  $this->service->create($request->validated());
        if ($request->create_another) {
            return back()->with('alert', ['message'=> 'category Created.' ]);
        }
      return \redirect()->route('categories.index')->with('alert', ['message'=> 'category Created.' ]);
    }

    /**
     * Display the specified resource.
     *
     * @param   $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
      $category =  $this->service->getById($id);
      \abort_if(empty($category), 404, 'category not found');
      return $this->renderPage('Category/Show', ['data' => $category]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param    $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $category =  $this->service->getById($id);
        \abort_if(empty($category), 404, 'category not found');
        return $this->renderPage('Category/Fields', ['pagedata' => $category]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Request  $request
     * @param   \ $id
     * @return \Illuminate\Http\Response
     */
    public function update(CategoryRequest $request, $id)
    {
        $category =  $this->service->getById($id);
        \abort_if(empty($category), 404, 'category not found');
        $this->service->update($id, $request->validated());
        return \redirect()->route('categories.index')->with('alert', ['message'=> 'category updated.' ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param    $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
      $this->service->deleteById($id);
      return \redirect()->route('categories.index')->with('alert', ['message'=> 'category Deleted.' ]);
    }
}
