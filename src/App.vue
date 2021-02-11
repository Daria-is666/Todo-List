<template>
  <div id="app">
    <ToDoList :todos="todos" :todoList="todoList" @add_list = "add_list" @add_point_to_list = "add_point_to_list"  @deleteTodo="deleteTodo" />
    <!-- <create-todo v-on:create-todo="createTodo"/> -->
    <!-- <ToDoList :todos.sync="todos" :todo.sync ="todo" @add-list = "add_list"/> -->
  </div>
</template>

<script>
// import sweetalert from 'sweetalert';
import ToDoList from './components/ToDoList';
import sweetalert from 'sweetalert';
// import TodoCreate from './components/TodoCreate';

export default {
  name: 'App',
  data(){
    return{
      todos:[{
        name:"",
      }],
      todoList:[{
          todoName:"",
          urgency: false,
          done: false,
          todosIndex:0,
      }]
    }
  },
  mounted(){
    this.todos.splice(0,1);
    this.todoList.splice(0,1);
  },
  components: {
   ToDoList,
  //  TodoCreate,
  },
  methods:{
    add_list(text){
      this.todos.push(text);
      this.todos.name = "";
    },
    add_point_to_list(pointContent){
      this.todoList.push(pointContent);
    },
    deleteTodo(index) {
      // const todoIndex = this.todos.index(todo);
      this.todoList.splice(index, 1);
    },
  }
//  methods: {
//     deleteTodo(todo) {
//       const todoIndex = this.todos.indexOf(todo);
//       this.todos.splice(todoIndex, 1);
//     },
//   },
};
</script>

<style lang="scss">
</style>
