import { defineConfig, loadEnv } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import liveReload from 'vite-plugin-live-reload';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import path from 'path';

export default defineConfig(config => {
    const env = loadEnv(config.mode, process.cwd(), '');
    return  {
        define: {
            'process.env.__APP_ENV__': JSON.stringify(env.APP_ENV),
            'process.env.__APP_URL__': JSON.stringify(env.APP_URL),
        },
        plugins: [
            react(),
            liveReload('resources/**/*.tsx'),
            laravel({
                publicDirectory: 'public_html',
                public_directory: 'public_html',
                build_path: 'public_html',
                buildPath: 'public_html',
                input: ['resources/ts/styles/app.scss', 'resources/ts/index.tsx'],
                refresh: true,
                // @ts-ignore
                postcss: [
                    tailwindcss(),
                    autoprefixer(),
                ],
            }),
        ],
        css: {
            preprocessorOptions: {
                scss: {},
            },
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'resources/ts'),
            },
        },
        server : {
            port: 3000,
            host: true,
            watch: {
                usePolling: true,
            },
        },
        build: {
            chunkSizeWarningLimit: 3600,
        },
    };
});