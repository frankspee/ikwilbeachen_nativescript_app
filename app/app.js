import VueDevtools from 'nativescript-vue-devtools';
import Vue from "nativescript-vue";

import Home from "./components/Home";

Vue.use(VueDevtools);
// Vue.use(VueDevtools, { host: '192.168.1.42' }) // ONLY USE IT LIKE THIS WITH REAL DEVICE > IP PC

new Vue({
    render: h => h('frame', [h(Home)]),
}).$start();
