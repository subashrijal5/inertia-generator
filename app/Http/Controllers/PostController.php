<?php

namespace App\Http\Controllers;

use App\Services\PostService;
use App\Http\Requests\PostRequest;
use Illuminate\Http\Request;

class PostController extends WebBaseController
{
    public function __construct(private PostService $service)
    {
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = $this->service->with('categories', 'author', 'language')->paginate(request('per_page', 20), request('keywords', ''),  ["*"], 'page', null);
        return $this->renderPage('Post/Index', ['data' => $posts]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return $this->renderPage('Post/Fields', []);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PostRequest $request)
    {
        $post =  $this->service->create($request->validated());
        if ($request->create_another) {
            return back()->with('alert', ['message' => 'post Created.']);
        }
        return \redirect()->route('posts.index')->with('alert', ['message' => 'post Created.']);
    }

    /**
     * Display the specified resource.
     *
     * @param   $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $post =  $this->service->getById($id);
        \abort_if(empty($post), 404, 'post not found');
        return $this->renderPage('Post/Show', ['data' => $post]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param    $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $post =  $this->service->getById($id);
        \abort_if(empty($post), 404, 'post not found');
        return $this->renderPage('Post/Fields', ['pagedata' => $post]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Request  $request
     * @param   \ $id
     * @return \Illuminate\Http\Response
     */
    public function update(PostRequest $request, $id)
    {
        $post =  $this->service->getById($id);
        \abort_if(empty($post), 404, 'post not found');
        $this->service->update($id, $request->validated());
        return \redirect()->route('posts.index')->with('alert', ['message' => 'post updated.']);
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
        return \redirect()->route('posts.index')->with('alert', ['message' => 'post Deleted.']);
    }
}
