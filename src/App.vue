<template>
  <div id="app">
    <div class="todo">
      <to-do-create :currentTodos="currentTodos" @addList = "addList"  @changeCurrentTodos = "changeCurrentTodos"  />
      <to-do-list :currentTodos="currentTodos"   @addPointToList = "addPointToList"  @addDoneStatus = "addDoneStatus"  @deleteTodo="deleteTodo" @changeDoneFilterStatus = "changeDoneFilterStatus"/>
    </div>
    
  </div>
</template>

<script>
import ToDoList from './components/ToDoList.vue';
import ToDoCreate from './components/ToDoCreate.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  data(){
    return{
      currentTodos:null
    }
  },
  // :mapGetters(["allTodos"],["allTodoList"]),
  computed:{
    allTodos(){
      return this.$store.getters.allTodos
    },
    allTodoList(){
      return this.$store.getters.allTodoList
    }
  },
  // mounted(){
  //   this.todos.splice(0,1);
  //   this.todoList.splice(0,1);
  //   console.log(`сячсячячссячсячсячясч`);
    
  // },
  async mounted(){
    // this.fetchTodos();
    // this.fetchTodoList();
    this.$store.dispatch("fetchTodos");
    this.$store.dispatch("fetchTodoList");
    // console.log(this.$store.getters.allTodos);
   
  },
  components: {
    ToDoCreate,
    ToDoList
  },
  methods:{
    addList(text){
      this.allTodos.push(text);
      this.allTodos.name = "";
    },
    addPointToList(pointContent){
      this.allTodoList.push(pointContent);
      this.allTodos[pointContent.todosIndex].isEmpty = false;
    },
    deleteTodo(index) {
      this.allTodoList.splice(index, 1);
    },
    addDoneStatus(index,status){
        this.allTodoList[index].done = status;
    },
    changeDoneFilterStatus(index,status){
      this.allTodos[this.allTodoList[index].todosIndex].doneFilter = status;
      // console.log( this.todos[this.todoList[index].todosIndex].doneFilter);
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
