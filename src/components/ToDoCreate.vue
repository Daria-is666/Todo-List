<template>
     <div class="list">
        <div class="filter">
            <select @change="doneFilterList($event)" class="select_category">
                <option value="all">Все</option>
                <option value="done"> Выполненные </option>
                <option value="undone"> Невыполненные </option>
            </select>
        </div>
        <div class="list_item" >
            <div class="list_style" v-for="(todo,index) in allTodos" :key="index" @click="changeCurrentTodos(index)" v-bind:class="[{activeClass : allTodos[index].doneFilter && !allTodos[index].isEmpty}, {unactiveClass : !allTodos[index].doneFilter && !allTodos[index].isEmpty} , {errorClass : allTodos[index].isEmpty}]" v-show="checkFilter(index)">
                <h1>{{todo.name}}</h1>
                <hr>
            </div>
        </div>
        <div class="insert_list">
            <input v-model="allTodos.name" id="addInput" class="add_list_input" placeholder="Новый список" type="text">
            <button @click="addList()" class="add_list_btn">Создать список</button>
        </div>     
    </div>

</template>

<script >
import { mapMutations } from 'vuex';
export default{
    props: ['currentTodos'],
    data() {
      return {
          isAll:true,
          isDone:false,
          isUndone:false,
          allTodos: this.$store.getters.allTodos,
        allTodoList: this.$store.getters.allTodoList,
      };
    },
    mounted(){
        console.log("this.allTodos.length");
    },  
    methods: {
        ...mapMutations(["createTodos"]),
      changeCurrentTodos(index) {
        this.$emit('changeCurrentTodos', index);
        console.log(this.currentTodos);
       },
        checkIndex(index){
          if(this.currentTodos == index)
              return true;             
          else
            return false;

       },
        checkCurrentTodos(){
          if(this.currentTodos != null){
              this.header = this.allTodos[this.currentTodos].name;
              return true;
          }
          else
            return false;
       },
       addList(){
        const name = this.allTodos.name;      
           this.createTodos({
                name:name,
                doneFilter: false,
                isEmpty:true,
           })
            this.allTodos.name = "";       
        },
        addDoneStatus(index){
            const status = document.getElementById('status_box');
            this.allTodoList[index].done = status.checked;
            this.$emit('addDoneStatus',index,status.checked);
              for (let i = 0; i < this.allTodos.length; i++) {
                    for (let index = 0; index < this.allTodoList.length; index++) {
                        if(i == this.allTodoList[index].todosIndex)
                        {
                            if(this.allTodoList[index].done == false)
                            {
                                this.$emit('changeDoneFilterStatus',index,false);
                                break;
                            }
                            if(this.allTodoList[index].done != false)
                        {
                            this.$emit('changeDoneFilterStatus',index,true);
                        }
                    }              
                } 
            }
        },
        doneFilterList(event)
        {
             for (let i = 0; i < this.allTodos.length; i++) {
                    for (let index = 0; index < this.allTodoList.length; index++) {
                        if(i == this.allTodoList[index].todosIndex)
                        {
                            if(this.allTodoList[index].done == false)
                            {
                                this.$emit('changeDoneFilterStatus',index,false);
                                break;
                            }
                            if(this.allTodoList[index].done != false)
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
        },
        checkFilter(index){
            if(this.isAll)
                return true;  
            else if(this.isDone){
                if(this.allTodos[index].doneFilter == true){
                    return true;
                }
                else
                    return false;
            }
            else if(this.isUndone){
                 if(this.allTodos[index].doneFilter == false){
                    return true;
                }
                else
                    return false;
            }
        },
         
    },
    
};
</script>

<style>
/* Списки дел */

.list
{
    position: relative;
    width: 100%;
    max-width: 30%;
    border: 1px solid teal;
    height: 700px;
    border-radius: 15px;
    box-shadow: 0 0  25px  teal;
    background: white;
    
}
.list_item
{
    margin-top: 15px;
    width: 90%;
    position: relative;
    left: 10px;
    right: 10px;
    overflow: auto;
    height: 600px;
    font-size:13px;
}
.list_style
{
    margin-bottom: 10px;
    border-radius: 5px;
}
.filter
{
    display:flex;
    justify-content: center;
    margin-top:10px;
}
.select_category
{
    height: 25px;
    border-radius: 15px;  
    width: 70%;
    border: 1px solid teal;

}
.insert_list
{
    position:absolute;
    bottom:0;
    left: 10px;
    right: 10px;
    display:flex;
    justify-content: center;
    margin-bottom: 10px;
}
.add_list_input
{
    width: 70%;
    border-radius: 15px 0 0 15px;
    border: 1px solid teal;
}
.add_list_btn
{
    border-radius: 0 15px 15px 0;
    border: 1px solid teal;
    background: teal;
    transition: opacity .2s ;
    opacity: 0.8;
}
.add_list_btn:hover
{
  opacity: 1;
}
.ListStyle.activeClass{
background: green;
}
.ListStyle.errorClass{
 background: gray;
}
.ListStyle.unactiveClass
{
    background: red;
}

</style>