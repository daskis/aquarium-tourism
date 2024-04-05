import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': '/src',

            '@styles': '/src/app/styles',

            '@app': '/src/app',

            '@pages': '/src/pages',

            '@shared': '/src/shared',

            '@assets': '/src/shared/assets',

            '@widgets': '/src/widgets',

            '@features': '/src/features',

            '@entities': '/src/entities',
        },
    },
});
