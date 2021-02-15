<template>
  <div id="app">
    <to-do-list :todos="todos" :todoList="todoList" @addList = "addList" @addPointToList = "addPointToList"  @deleteTodo="deleteTodo" @addDoneStatus = "addDoneStatus" @changeDoneFilterStatus = "changeDoneFilterStatus" />
    <!-- <create-todo v-on:create-todo="createTodo"/> -->
    <!-- <ToDoList :todos.sync="todos" :todo.sync ="todo" @add-list = "add_list"/> -->
  </div>
</template>

<script>
// import sweetalert from 'sweetalert';
// import ToDoList from './components/ToDoList';
import ToDoList from './components/ToDoList.vue';
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
  },
  methods:{
    addList(text){
      this.todos.push(text);
      this.todos.name = "";
    },
    addPointToList(pointContent){
      this.todoList.push(pointContent);
      this.todos[pointContent.todosIndex].isEmpty = false;
    },
    deleteTodo(index) {
      this.todoList.splice(index, 1);
    },
    addDoneStatus(index,status){
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
