<?php

namespace App\Http\Controllers;

use App\Services\PostCategoryService;
use App\Http\Requests\PostCategoryRequest;
use Illuminate\Http\Request;

class PostCategoryController extends WebBaseController
{
    public function __construct(private PostCategoryService $service){

    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $postcategories = $this->service->paginate(request('per_page', 20), request('keywords', ''),  ["*"], 'page', null);
        return $this->renderPage('PostCategory/Index', ['data' => $postcategories]);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return $this->renderPage('PostCategory/Fields', []);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PostCategoryRequest $request)
    {
      $postcategory =  $this->service->create($request->validated());
        if ($request->create_another) {
            return back()->with('alert', ['message'=> 'postcategory Created.' ]);
        }
      return \redirect()->route('postcategories.index')->with('alert', ['message'=> 'postcategory Created.' ]);
    }

    /**
     * Display the specified resource.
     *
     * @param   $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
      $postcategory =  $this->service->getById($id);
      \abort_if(empty($postcategory), 404, 'postcategory not found');
      return $this->renderPage('PostCategory/Show', ['data' => $postcategory]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param    $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $postcategory =  $this->service->getById($id);
        \abort_if(empty($postcategory), 404, 'postcategory not found');
        return $this->renderPage('PostCategory/Fields', ['pagedata' => $postcategory]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Request  $request
     * @param   \ $id
     * @return \Illuminate\Http\Response
     */
    public function update(PostCategoryRequest $request, $id)
    {
        $postcategory =  $this->service->getById($id);
        \abort_if(empty($postcategory), 404, 'postcategory not found');
        $this->service->update($id, $request->validated());
        return \redirect()->route('postcategories.index')->with('alert', ['message'=> 'postcategory updated.' ]);
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
      return \redirect()->route('postcategories.index')->with('alert', ['message'=> 'postcategory Deleted.' ]);
    }
}
