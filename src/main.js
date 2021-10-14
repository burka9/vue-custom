import Vue from 'vue'
import App from './App.vue'

import 'tailwindcss/tailwind.css'
import '@/components/Custom'

// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
// library.add(faUserSecret)

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
Vue.component('f-icon', FontAwesomeIcon)

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
}).$mount('#app')
