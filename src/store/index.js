import Vue from 'vue'
import Vuex from 'vuex'
import todos from './modules/todos'
import todoList from './modules/todoList'


Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        todos,
        todoList
    }

})