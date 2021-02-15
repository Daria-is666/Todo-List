<template>
  <div id="app">
    <ToDoList :todos="todos" :todoList="todoList" @add_list = "add_list" @add_point_to_list = "add_point_to_list"  @deleteTodo="deleteTodo" @add_done_status = "add_done_status" @changeDoneFilterStatus = "changeDoneFilterStatus" />
    <!-- <create-todo v-on:create-todo="createTodo"/> -->
    <!-- <ToDoList :todos.sync="todos" :todo.sync ="todo" @add-list = "add_list"/> -->
  </div>
</template>

<script>
// import sweetalert from 'sweetalert';
import ToDoList from './components/ToDoList';
// import TodoCreate from './components/TodoCreate';

export default {
  name: 'App',
  data(){
    return{
      todos:[{
        name:"",
        doneFilter:false,
        isEmpty:true
      }],
      todoList:[{
          todoName:"",
          urgency: false,
          done: false,
          todosIndex:0,
          date: null
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
      this.todos[pointContent.todosIndex].isEmpty = false;
    },
    deleteTodo(index) {
      // const todoIndex = this.todos.index(todo);
      this.todoList.splice(index, 1);
    },
    add_done_status(index,status){
        this.todoList[index].done = status;
    },
    changeDoneFilterStatus(index,status){
      this.todos[this.todoList[index].todosIndex].doneFilter = status;
    }
  }
};
</script>

<style lang="scss">
</style>
