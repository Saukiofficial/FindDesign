import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

// PERBAIKAN: Pastikan ziggy-js sudah terinstall via npm (npm install ziggy-js)
// Jika error local, cek vite.config.js untuk alias ziggy
import { route } from 'ziggy-js';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        // Mengatur helper route() global agar bisa dipanggil di semua komponen
        if (props.initialPage.props.ziggy) {
            const { ziggy } = props.initialPage.props;
            window.route = (name, params, absolute) => route(name, params, absolute, ziggy);
        }

        root.render(<App {...props} />);
    },
    progress: {
        // PERBAIKAN KOSMETIK:
        // Mengubah warna loading bar ke Merah Brand (#DC2626) agar sesuai tema
        color: '#DC2626',
    },
});
