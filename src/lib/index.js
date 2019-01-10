import MyTest from './MyTest.vue'
import Paging from './Paging.vue'
import TableView from './TableView.vue'
const comment = {
  install: function(Vue) {
      Vue.component(MyTest.name, MyTest)
      Vue.component(Paging.name, Paging)
      Vue.component(TableView.name, TableView)
  }
}
if (typeof window !== 'undefined' && window.Vue) { 
	window.Vue.use(comment) 
}
export default comment