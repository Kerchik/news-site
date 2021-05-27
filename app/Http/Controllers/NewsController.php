<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\News;
use App\Models\User;

class NewsController extends Controller
{
	const ROLE_ADMIN = 1;
	const ROLE_USER = 10;

    public function index()
	{
	    $news = News::orderBy('created_at', 'DESC')->get();
		return response()->json($news);
	}

    public function viewArticle($id)
	{
	    $news = News::where('id', $id)->first();

		if (!$news) {
			return response('Article is not found!', 404);
		}

		$news->photo = url($news->photo);
		$news->author = User::where('id', $news->author)->first();
		return response()->json($news);
	}

    public function editArticle(Request $request, $id)
	{
		if (auth()->user()->role !== self::ROLE_ADMIN) {
			return response("You do not have a permission to execute this operation!", 403);
		}

	    $data = $request->json()->all();
		$news = News::where('id', $id)->first();

		if (!$news) {
			return response('Article is not found!', 404);
		}

		$news->title = $data['title'];
		$news->content = $data['content'];

		$news->save();

		return response("News have been sucessfully edited!", 200);
	}

    public function removeArticle($id)
	{
		if (auth()->user()->role !== self::ROLE_ADMIN) {
			return response("You do not have a permission to execute this operation!", 403);
		}

	    $news = News::where('id', $id)->first();

		if (!$news) {
			return response('Article is not found!', 404);
		}

		$news->delete();
		return response('Article has been deleted!', 200)->header('Content-Type', 'text/plain');

	}

    public function addArticle(Request $request)
	{
		if (auth()->user()->role !== self::ROLE_ADMIN) {
			return response("You do not have a permission to execute this operation!", 403);
		}

		$authorId = auth()->user()->id;

	    $data = $request->json()->all();
		$news = new News;
		
		$news = new \App\Models\News([
			'title' => $request['title'],		
			'content' => $request['content'],
			'photo' => $request->file('photo')->store('news-photos', 'public'),
			'author' => $authorId,
			"created_at"=> now(),
			"updated_at"=> now(),
		]);

		$news->save();

		return response('Article has added!', 200)->header('Content-Type', 'text/plain');
	}
}
