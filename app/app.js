import Vue from "nativescript-vue";

import Home from "./components/Home";
import VueDevtools from 'nativescript-vue-devtools';

import store from './store';

if (TNS_ENV !== 'production') {
    Vue.use(VueDevtools);
    // Vue.use(VueDevtools, { host: '192.168.1.42' }) // ONLY USE IT LIKE THIS WITH REAL DEVICE > IP PC
}
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = TNS_ENV === 'production';

new Vue({
    render: h => h('frame', [h(Home)]),
}, store).$start();