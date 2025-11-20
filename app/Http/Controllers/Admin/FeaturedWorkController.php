<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FeaturedWork;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FeaturedWorkController extends Controller
{
    public function index()
    {
        $works = FeaturedWork::latest()->get();
        return view('admin.featured-works.index', compact('works'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:10240',
        ]);

        $path = $request->file('image')->store('featured_works', 'public');

        FeaturedWork::create([
            'title' => $request->title,
            'description' => $request->description,
            'image' => $path,
        ]);

        return redirect()->route('admin.featured-works.index')->with('success', 'Featured Work berhasil ditambahkan!');
    }

    public function edit(FeaturedWork $featuredWork)
    {

        return view('admin.featured-works.edit', compact('featuredWork'));
    }

    public function update(Request $request, FeaturedWork $featuredWork)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10240',
        ]);

        $data = $request->only('title', 'description');

        if ($request->hasFile('image')) {
            if ($featuredWork->image) {
                Storage::disk('public')->delete($featuredWork->image);
            }
            $data['image'] = $request->file('image')->store('featured_works', 'public');
        }

        $featuredWork->update($data);

        return redirect()->route('admin.featured-works.index')->with('success', 'Featured Work berhasil diperbarui!');
    }

    public function destroy($id)
    {
        $work = FeaturedWork::findOrFail($id);

        if ($work->image) {
            Storage::disk('public')->delete($work->image);
        }

        $work->delete();

        return redirect()->route('admin.featured-works.index')->with('success', 'Item berhasil dihapus!');
    }
}
