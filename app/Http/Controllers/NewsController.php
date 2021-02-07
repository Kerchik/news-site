<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\News;

class NewsController extends Controller
{
    public function index()
	{
	    return News::all();
	}

    public function viewArticle($id)
	{
	    return News::where('id', $id)->first();
	}
}
