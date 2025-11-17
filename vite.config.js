import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            // Mendaftarkan semua file "entry point" yang akan digunakan
            input: [
                'resources/css/app.css',
                'resources/js/app.jsx',     // Untuk halaman Inertia/React
                'resources/js/admin.js',    // Untuk halaman Admin Blade
            ],
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@': '/resources/js',
        },
    },
});

