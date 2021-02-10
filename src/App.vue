<template>
  <div id="app">
    <ToDoList :todos.sync="todos" :todo.sync ="todo" @add-list = "add_list"/>
  </div>
</template>

<script>
import ToDoList from './components/ToDoList';

export default {
  name: 'App',
  data(){
    return{
      todo:"",
      todos: []
    }
  },
  components: {
   ToDoList
  },
  methods:{
    add_list(text){
      this.todos.push(text);
      this.todo = "";
    }
  }
}
</script>

<style lang="scss">

</style>
