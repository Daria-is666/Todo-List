<template>

  <div>
      <router-link to="/" class="home_back">Уже уходите?</router-link>
    <div class="todo">
      
      <ToDoCreate :currentTodos="currentTodos" @addList = "addList"  @changeCurrentTodos = "changeCurrentTodos"  />
      <ToDoList :currentTodos="currentTodos"   @addPointToList = "addPointToList"  @addDoneStatus = "addDoneStatus"  @deleteTodo="deleteTodo" @changeDoneFilterStatus = "changeDoneFilterStatus"/>
    </div>
  </div>
</template>

<script>
import ToDoList from '../components/ToDoList.vue';
import ToDoCreate from '../components/ToDoCreate.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  data(){
    return{
      currentTodos:null
    }
  },
  computed:{
    allTodos(){
      return this.$store.getters.allTodos
    },
    allTodoList(){
      return this.$store.getters.allTodoList
    }
  },
  async mounted(){
    this.$store.dispatch("fetchTodos");
    this.$store.dispatch("fetchTodoList"); 
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
    },
    changeCurrentTodos(index){
      this.currentTodos = index;
    }


  }
};
</script>
