<template>
  <div>
      <router-link to="/" class="home_back">Уже уходите?</router-link>
    <div class="todo">
      <ToDoCreate :currentTodos="currentTodos" @changeCurrentTodos = "changeCurrentTodos"  />
      <ToDoList :currentTodos="currentTodos" />
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
    changeCurrentTodos(index){
      this.currentTodos = index;
    }
  }
};
</script>
