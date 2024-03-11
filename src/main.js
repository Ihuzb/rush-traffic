import {createApp} from 'vue'
import './style.css'
import App from './App.vue'

const modules = import.meta.glob('@/public/config/config.json');

const app = createApp(App);
app.config.globalProperties.$modules = modules;

app.mount('#app')
