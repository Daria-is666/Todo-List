<template>
     <div class="list">
        <div class="Filter">
            <select @change="doneFilterList($event)" class="select_category">
                <option value="all">Все</option>
                <option value="done"> Выполненные </option>
                <option value="undone"> Невыполненные </option>
            </select>
        </div>
        <div class="list_item" >
            <div class="list_style" v-for="(todo,index) in todos" :key="index" @click="changeCurrentTodos(index)" v-bind:class="[{activeClass : todos[index].doneFilter && !todos[index].isEmpty}, {unactiveClass : !todos[index].doneFilter && !todos[index].isEmpty} , {errorClass : todos[index].isEmpty}]" v-show="checkFilter(index)">
                <h1>{{todo.name}}</h1>
            </div>
        </div>
        <div class="insert_list">
            <input v-model="todos.name" id="addInput" class="add_list_input" placeholder="Новый список" type="text">
            <button @click="addList()" class="add_list_btn">Добавить список</button>
        </div>     
    </div>

</template>

<script >
export default{
    props: ['todos','todoList','currentTodos'],
    data() {
      return {
          isAll:true,
          isDone:false,
          isUndone:false,
          header: ""
      };
    },
    methods: {
      changeCurrentTodos(index) {
        this.$emit('changeCurrentTodos', index);
        // this.currentTodos = index;
       },
        checkIndex(index){
          if(this.currentTodos == index)
              return true;             
          else
            return false;

       },
        checkCurrentTodos(){
          if(this.currentTodos != null){
              this.header = this.todos[this.currentTodos].name;
              return true;
          }
          else
            return false;
       },
       addList(){
                const name = this.todos.name;           
                this.$emit('addList',{name:name,
                doneFilter: false,
                isEmpty:true,});
                this.todos.name = "";       
        },
        addDoneStatus(index){
            const status = document.getElementById('status_box');
            this.todoList[index].done = status.checked;
            this.$emit('addDoneStatus',index,status.checked);
              for (let i = 0; i < this.todos.length; i++) {
                    for (let index = 0; index < this.todoList.length; index++) {
                        if(i == this.todoList[index].todosIndex)
                        {
                            if(this.todoList[index].done == false)
                            {
                                this.$emit('changeDoneFilterStatus',index,false);
                                break;
                            }
                            if(this.todoList[index].done != false)
                        {
                            this.$emit('changeDoneFilterStatus',index,true);
                        }
                    }              
                } 
            }
        },
        doneFilterList(event)
        {
             for (let i = 0; i < this.todos.length; i++) {
                    for (let index = 0; index < this.todoList.length; index++) {
                        if(i == this.todoList[index].todosIndex)
                        {
                            if(this.todoList[index].done == false)
                            {
                                this.$emit('changeDoneFilterStatus',index,false);
                                break;
                            }
                            if(this.todoList[index].done != false)
                        {
                            this.$emit('changeDoneFilterStatus',index,true);
                        }
                    }              
                } 
            }
            if(event.target.value == "all"){
                this.isAll = true;
                this.isDone = false;
                this.isDone = false;
            }
            else if(event.target.value == "done"){
                this.isDone = true;
                this.isUndone = false;
                this.isAll = false;
            }
             else if(event.target.value == "undone"){
                this.isUndone = true;
                this.isDone = false;
                this.isAll = false;
            }
             this.$emit('changeCurrentTodos', null);
            // this.currentTodos = null; 
        },
        checkFilter(index){
            if(this.isAll)
                return true;  
            else if(this.isDone){
                if(this.todos[index].doneFilter == true){
                    return true;
                }
                else
                    return false;
            }
            else if(this.isUndone){
                 if(this.todos[index].doneFilter == false){
                    return true;
                }
                else
                    return false;
            }
        },
         
    },
    
};
</script>

<style scoped>
/* Списки дел */

.list
{
    position: relative;
    width: 100%;
    max-width: 30%;
    border: 1px solid black;
    height: 700px;
  
}
.select_category
{
    border-radius: 15px;  
    width: 90%;

}
.insert_list
{
    position:absolute;
    bottom:0;
    right: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}

</style>