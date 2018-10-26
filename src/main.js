import Vue from 'vue'
import App from './App.vue'
import htmlToPdf from './utils/htmlToPdf'
//全局打印方法
Vue.use(htmlToPdf)

new Vue({
	el: '#app',
	render: h => h(App)
})
