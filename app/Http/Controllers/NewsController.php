<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\News;
use App\User;

class NewsController extends Controller
{
    public function index()
	{
	    $news = News::orderBy('created_at', 'DESC')->get();
		return response()->json($news);
	}

    public function viewArticle($id)
	{

	    $news = News::where('id', $id)->first();
		$news->photo = url($news->photo);
		$news->author = User::where('id', $news->author)->first();
		return response()->json($news);
	}

    public function editArticle(Request $request, $id)
	{
	    $data = $request->json()->all();
		$news = News::where('id', $id)->first();

		$news->title = $data['title'];
		$news->content = $data['content'];

		$news->save();

		return response("News have been sucessfully edited!", 200);
	}

    public function removeArticle($id)
	{
	    $news = News::where('id', $id)->first();
		$news->delete();
		return response('Article has been deleted!', 200)->header('Content-Type', 'text/plain');

	}

    public function addArticle(Request $request)
	{
	    $data = $request->json()->all();
		$news = new News;
		
		$news = new \App\Models\News([
			'title' => $request['title'],		
			'content' => $request['content'],
			'photo' => $request->file('photo')->store('news-photos', 'public'),
			'author' => $request['author'],
			"created_at"=> now(),
			"updated_at"=> now(),
		]);

		$news->save();

		return response('Article has added!', 200)->header('Content-Type', 'text/plain');

	}
}
