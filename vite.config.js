import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Components from 'unplugin-vue-components/vite';
import {AntDesignVueResolver} from 'unplugin-vue-components/resolvers';

let isPro = process.env.NODE_ENV === 'production';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/rush-traffic/',
    build: {
        outDir: 'docs',
    },
    plugins: [vue(), Components({
        resolvers: [
            AntDesignVueResolver({
                importStyle: false, // css in js
            }),
        ],
    })],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')  // 为./src配置别名
        }
    }
})