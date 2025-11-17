<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PortfolioItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PortfolioController extends Controller
{
    /**
     * Menampilkan daftar semua item portofolio.
     */
    public function index()
    {
        // PERBAIKAN: Gunakan latest()->get() untuk memastikan data selalu yang terbaru.
        $portfolioItems = PortfolioItem::latest()->get();
        return view('admin.portfolio.index', compact('portfolioItems'));
    }

    /**
     * Menyimpan item portofolio baru ke database.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:51200', // 50 MB
        ]);

        $path = $request->file('image')->store('portfolio_images', 'public');

        PortfolioItem::create([
            'title' => $request->title,
            'category' => $request->category,
            'image' => $path,
        ]);

        return redirect()->route('admin.portfolio.index')->with('success', 'Item portofolio berhasil ditambahkan!');
    }

    /**
     * Menampilkan formulir untuk mengedit item portofolio.
     */
    public function edit(PortfolioItem $portfolioItem)
    {
        return view('admin.portfolio.edit', compact('portfolioItem'));
    }

    /**
     * Memperbarui item portofolio di database.
     */
    public function update(Request $request, PortfolioItem $portfolioItem)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:51200', // 50 MB, opsional
        ]);

        $data = $request->only('title', 'category');

        // Jika ada file gambar baru yang diunggah
        if ($request->hasFile('image')) {
            // Hapus gambar lama jika ada
            if ($portfolioItem->image) {
                Storage::disk('public')->delete($portfolioItem->image);
            }
            // Simpan gambar baru dan perbarui path
            $data['image'] = $request->file('image')->store('portfolio_images', 'public');
        }

        $portfolioItem->update($data);

        return redirect()->route('admin.portfolio.index')->with('success', 'Item portofolio berhasil diperbarui!');
    }

    /**
     * Menghapus item portofolio dari database.
     */
    public function destroy($id)
    {
        // PERBAIKAN: Cari item secara manual berdasarkan ID untuk memastikan data yang benar ditemukan.
        $portfolioItem = PortfolioItem::find($id);

        // Jika item tidak ditemukan, kembali dengan pesan error.
        if (!$portfolioItem) {
            return redirect()->route('admin.portfolio.index')->with('error', 'Item tidak ditemukan!');
        }

        // Hapus file gambar dari storage jika ada
        if ($portfolioItem->image) {
            Storage::disk('public')->delete($portfolioItem->image);
        }

        // Hapus record dari database
        $portfolioItem->delete();

        return redirect()->route('admin.portfolio.index')->with('success', 'Item portofolio berhasil dihapus!');
    }
}

