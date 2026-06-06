<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PortfolioItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PortfolioController extends Controller
{
    public function index()
    {
        $portfolioItems = PortfolioItem::latest()->get();

        $categories = [
            'ILLUSTRATIONS',
            'DIGITAL ART',
            'ANIMATION',
            'BRANDING',
            'OTOMOTIF',
            'BLUE COLLAR',
        ];

        return view('admin.portfolio.index', compact('portfolioItems', 'categories'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:51200',
        ]);

        $path = $request->file('image')->store('portfolio_images', 'public');

        PortfolioItem::create([
            'title' => $request->title,
            'category' => $request->category,
            'description' => $request->description,
            'image' => $path,
        ]);

        return redirect()
            ->route('admin.portfolio.index')
            ->with('success', 'Item portfolio berhasil ditambahkan!');
    }

    public function edit($id)
    {
        $portfolioItem = PortfolioItem::findOrFail($id);

        $categories = [
            'ILLUSTRATIONS',
            'DIGITAL ART',
            'ANIMATION',
            'BRANDING',
            'OTOMOTIF',
            'BLUE COLLAR',
        ];

        return view('admin.portfolio.edit', compact('portfolioItem', 'categories'));
    }

    public function update(Request $request, $id)
    {
        $portfolioItem = PortfolioItem::findOrFail($id);

        $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:51200',
        ]);

        $data = [
            'title' => $request->title,
            'category' => $request->category,
            'description' => $request->description,
        ];

        if ($request->hasFile('image')) {
            if ($portfolioItem->image) {
                Storage::disk('public')->delete($portfolioItem->image);
            }

            $data['image'] = $request->file('image')->store('portfolio_images', 'public');
        }

        $portfolioItem->update($data);

        return redirect()
            ->route('admin.portfolio.index')
            ->with('success', 'Item portfolio berhasil diperbarui!');
    }

    public function destroy($id)
    {
        $portfolioItem = PortfolioItem::find($id);

        if (!$portfolioItem) {
            return redirect()
                ->route('admin.portfolio.index')
                ->with('error', 'Item portfolio tidak ditemukan!');
        }

        if ($portfolioItem->image) {
            Storage::disk('public')->delete($portfolioItem->image);
        }

        $portfolioItem->delete();

        return redirect()
            ->route('admin.portfolio.index')
            ->with('success', 'Item portfolio berhasil dihapus!');
    }
}