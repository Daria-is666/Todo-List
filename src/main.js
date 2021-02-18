import Vue from 'vue'
import store from './store'
import App from './App.vue'
import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({
  store: store,
  render: h => h(App),
}).$mount('#app')
