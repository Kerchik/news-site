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

	    $news = News::where('id', $id)->first();
		$news->photo = url($news->photo);
		return $news;
	}

    public function editArticle(Request $request, $id)
	{
	    $data = $request->json()->all();
		$news = News::where('id', $id)->first();

		$news->title = $data['title'];
		$news->content = $data['content'];

		$news->save();

	}

    public function removeArticle($id)
	{
	    $news = News::where('id', $id)->first();
		$news->delete();
		return response('Article has been deleted!', 200)
                  ->header('Content-Type', 'text/plain');

	}

    public function addArticle(Request $request)
	{
	    $data = $request->json()->all();
		$news = new News;
		
		$news = new \App\Models\News([
			'title' => $request['title'],		
			'content' => $request['content'],
			'photo' => $request->file('photo')->store('news-photos', 'public'),
			'author' => 1,
			"created_at"=> now(),
			"updated_at"=> now(),
		]);

		$news->save();

	}
}
