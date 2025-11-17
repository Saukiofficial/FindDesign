import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    // File-file yang akan di-scan oleh Tailwind untuk mencari class utility.
    // Instalasi Breeze sudah secara otomatis menyertakan path untuk file React (.jsx)
    // dan file Blade (.blade.php) jika Anda membutuhkannya.
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx', // Ini adalah path penting untuk React + Inertia
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [forms],
};
