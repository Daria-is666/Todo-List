<template>
  <div id="app">
    <div class="todo">
      <to-do-list :currentTodos="currentTodos" :todos="todos" :todoList="todoList"  @addPointToList = "addPointToList"  @addDoneStatus = "addDoneStatus"  @deleteTodo="deleteTodo" @changeDoneFilterStatus = "changeDoneFilterStatus"/>
      <to-do-create :currentTodos="currentTodos" :todos="todos" :todoList="todoList" @addList = "addList"  @changeCurrentTodos = "changeCurrentTodos"  />
    </div>
    
  </div>
</template>

<script>
import ToDoList from './components/ToDoList.vue';
import ToDoCreate from './components/ToDoCreate.vue';

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
      }],
      currentTodos:null
    }
  },
  mounted(){
    this.todos.splice(0,1);
    this.todoList.splice(0,1);
  },
  components: {
    ToDoList,
    ToDoCreate
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
      console.log( this.todos[this.todoList[index].todosIndex].doneFilter);
    },
    changeCurrentTodos(index){
      this.currentTodos = index;
    }

  }
};
</script>

<style lang="scss">
.todo
{   
 display: flex;
 justify-content: space-between;
}
</style>
