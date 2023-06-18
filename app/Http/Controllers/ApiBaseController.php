<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ApiBaseController extends Controller
{
    protected function dataResponse($data = null, $code=200)
    {
        return response()->json($data, $code);
    }

    protected function successResponse($code, $message, $data = null)
    {
        $body = [
            'message' => $message
        ];
        if (!empty($data)) {
            $body['data'] = $data;
        }
        return response()->json($body, $code);
    }

    protected function errorResponse($message,$code=500, $error = null)
    {
        $body = [
            'message' => $message
        ];
        if (!empty($error)) {
            $body['errors'] = $error;
        }
        return response()->json($body, $code);
    }
}
