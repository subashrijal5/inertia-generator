<?php

namespace App\Http\Controllers;

use App\Services\LanguageService;
use App\Http\Requests\LanguageRequest;
use Illuminate\Http\Request;

class LanguageController extends WebBaseController
{
    public function __construct(private LanguageService $service){

    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $languages = $this->service->paginate(request('per_page', 20), request('keywords', ''),  ["*"], 'page', null);
        return $this->renderPage('Language/Index', ['data' => $languages]);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return $this->renderPage('Language/Fields', []);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(LanguageRequest $request)
    {
      $language =  $this->service->create($request->validated());
        if ($request->create_another) {
            return back()->with('alert', ['message'=> 'language Created.' ]);
        }
      return \redirect()->route('languages.index')->with('alert', ['message'=> 'language Created.' ]);
    }

    /**
     * Display the specified resource.
     *
     * @param   $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
      $language =  $this->service->getById($id);
      \abort_if(empty($language), 404, 'language not found');
      return $this->renderPage('Language/Show', ['data' => $language]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param    $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $language =  $this->service->getById($id);
        \abort_if(empty($language), 404, 'language not found');
        return $this->renderPage('Language/Fields', ['pagedata' => $language]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Request  $request
     * @param   \ $id
     * @return \Illuminate\Http\Response
     */
    public function update(LanguageRequest $request, $id)
    {
        $language =  $this->service->getById($id);
        \abort_if(empty($language), 404, 'language not found');
        $this->service->update($id, $request->validated());
        return \redirect()->route('languages.index')->with('alert', ['message'=> 'language updated.' ]);
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
      return \redirect()->route('languages.index')->with('alert', ['message'=> 'language Deleted.' ]);
    }
}
