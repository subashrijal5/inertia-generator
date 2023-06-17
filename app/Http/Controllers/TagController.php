<?php

namespace App\Http\Controllers;

use App\Services\TagService;
use App\Http\Requests\TagRequest;
use Illuminate\Http\Request;

class TagController extends WebBaseController
{
    public function __construct(private TagService $service){

    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tags = $this->service->paginate(request('per_page', 20), request('keywords', ''),  ["*"], 'page', null);
        return $this->renderPage('Tag/Index', ['data' => $tags]);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return $this->renderPage('Tag/Fields', []);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(TagRequest $request)
    {
      $tag =  $this->service->create($request->validated());
        if ($request->create_another) {
            return back()->with('alert', ['message'=> 'tag Created.' ]);
        }
      return \redirect()->route('tags.index')->with('alert', ['message'=> 'tag Created.' ]);
    }

    /**
     * Display the specified resource.
     *
     * @param   $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
      $tag =  $this->service->getById($id);
      \abort_if(empty($tag), 404, 'tag not found');
      return $this->renderPage('Tag/Show', ['data' => $tag]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param    $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $tag =  $this->service->getById($id);
        \abort_if(empty($tag), 404, 'tag not found');
        return $this->renderPage('Tag/Fields', ['pagedata' => $tag]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Request  $request
     * @param   \ $id
     * @return \Illuminate\Http\Response
     */
    public function update(TagRequest $request, $id)
    {
        $tag =  $this->service->getById($id);
        \abort_if(empty($tag), 404, 'tag not found');
        $this->service->update($id, $request->validated());
        return \redirect()->route('tags.index')->with('alert', ['message'=> 'tag updated.' ]);
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
      return \redirect()->route('tags.index')->with('alert', ['message'=> 'tag Deleted.' ]);
    }
}
