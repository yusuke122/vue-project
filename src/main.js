import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { createApp } from 'vue'
import App from './App.vue'
import VCalendar from 'v-calendar'

import 'v-calendar/style.css'

const app = createApp(App)
app.use(VCalendar, {})
app.mount('#app')
