import Vue from 'vue'
import App from './App.vue'
import components from './my-components.js'

Vue.config.productionTip = false

new Vue({
  components,
  render: h => h(App),
}).$mount('#app')
