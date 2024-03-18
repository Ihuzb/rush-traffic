import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Components from 'unplugin-vue-components/vite';
import {AntDesignVueResolver} from 'unplugin-vue-components/resolvers';
// https://vitejs.dev/config/
export default defineConfig({
    // base: './',
    build: {
        outDir: 'docs',//想要把dist修改成什么名字在这边改
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