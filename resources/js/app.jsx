import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

// PERBAIKAN: Impor 'route' sebagai named export menggunakan kurung kurawal {}.
import { route } from 'ziggy-js';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        // Cek jika properti ziggy ada sebelum digunakan
        if (props.initialPage.props.ziggy) {
            const { ziggy } = props.initialPage.props;
            window.route = (name, params, absolute) => route(name, params, absolute, ziggy);
        }

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

