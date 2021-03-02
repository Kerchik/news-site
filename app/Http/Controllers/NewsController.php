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

    public function editArticle(Request $request, $id)
	{
	    $data = $request->json()->all();
		$news = News::where('id', $id)->first();

		$news->title = $data['title'];
		$news->content = $data['content'];

		$news->save();

	}

    public function addArticle(Request $request)
	{
	    $data = $request->json()->all();
		$news = new News;

		$news = new \App\Models\News([
			'title' => $data['title'],
			'content' => $data['content'],
			'photo' => $data['photo'],
			'author' => 1,
			"created_at"=> now(),
			"updated_at"=> now(),
		]);

		$news->save();

	}
}
