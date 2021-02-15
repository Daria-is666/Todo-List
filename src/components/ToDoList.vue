<template>
<div class="Todo">
    <div class="List">
        <div class="Filter">
            <select @change="doneFilter_List($event)" class="selectCategory">
                <option value="all">Все</option>
                <option value="done"> Выполненные </option>
                <option value="undone"> Невыполненные </option>
            </select>
        </div>
        <div class="ListItem" >
            <div class="ListStyle" v-for="(todo,index) in todos" :key="index" @click="showForm(index)" v-bind:class="[{activeClass : todos[index].doneFilter && !todos[index].isEmpty}, {unactiveClass : !todos[index].doneFilter && !todos[index].isEmpty} , {errorClass : todos[index].isEmpty}]" v-show="checkFilter(index)">
                <h1>{{todo.name}}</h1>
            </div>
        </div>
        <div class="InsertList">
            <input v-model="todos.name" id="addInput" class="add_list_input" placeholder="Новый список" type="text">
            <button @click="add_list()" class="add_list_btn">Добавить список</button>
        </div>
               
    </div>

    <div class="ItemList">
        <h1  class="ItemList_title" v-show="checkCurrentTodos()">{{header}}</h1>
        <div  class="ItemRow" v-for="(todo,index) in todoList" :key="index" v-show="checkIndex(todo.todosIndex)">
            <input  type="checkbox" class="item_done" id="status_box" @click="add_done_status(index)"/>
            <h2 class="item_name">{{todo.todoName}}</h2>
            <h3 class="fullDate">{{todo.date}}</h3>
            <button class='trash_icon' @click="deleteTodo(index)"></button>
        </div>
       
        <div class="InsertItem">
            <div>
                <input v-model="todoList.todoName" placeholder="Новая задача" type="text">
                 <button class="add_list_btn" @click="add_point_to_list()">Добавить</button>
            </div>  
            <label for="urgencyCheck"><input type="checkbox" id="urgencyCheck"> Cрочное</label>
            
        </div>   
    </div>   
</div>
</template>


<script >
import sweetalert from 'sweetalert';
import moment from 'moment';
    export default {
    props: ['todos','todoList'],
    data() {
      return {
          currentTodos:null,
          header: "",
          isAll:true,
          isDone:false,
          isUndone:false
      };
    },
    methods: {
      showForm(index) {
          this.currentTodos = index;
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
       add_list(){
                const name = this.todos.name;           
                this.$emit('add_list',{name:name,
                doneFilter: false,
                isEmpty:true,});
                this.todos.name = "";       
        },
        add_point_to_list(){
            const name = this.todoList.todoName;   
            const index = this.currentTodos; 
           const dateFull = new Date();
            if(index != undefined && name!="" ){
                this.$emit('add_point_to_list',
                {todoName:name,
                urgency:false,
                done: false,
                todosIndex:index,
                date:moment(dateFull).format('L') + moment(dateFull).format('LT')
                });
                this.todoList.todoName = "";
                sweetalert('Новая задача добавлена', 'Надеюсь, это не очередное бесполезное просиживание штанов в тик-токе', 'success');
            }          
        },
        add_done_status(index){
            const status = document.getElementById('status_box');
            this.todoList[index].done = status.checked;
            this.$emit('add_done_status',index,status.checked);
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

        doneFilter_List(event)
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
            this.currentTodos = null; 
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
         deleteTodo(index) {
            sweetalert({
              title: 'Ты точно этого хочешь?',
              text: 'Сейчас удалишь, потом будешь 100 лет вспоминать',
              type: 'warning',
              showCancelButton: true,
              buttons:true,
              confirmButtonColor: '#DD6B55',
              confirmButtonText: 'Удаляй!',
              closeOnConfirm: false,
            }).then((willDelete) => {
                if(willDelete){
                    this.$emit('deleteTodo',index);
                    sweetalert('Удалено', 'Ты об это еще пожалеешь', 'success');
                }
       
      });
    },
    }
};
</script>

<style>
h1,h2,h3,h4,h5,h6,p {
margin: 0;
}
#app{
  width: 100%;
  max-width: 1000px;
  box-shadow: 0 3px 20px #00000023;
  font-family: 'Gilroy', sans-serif;
  padding: 10px;
  margin: 0 auto;

  color: var(--main);
}
/* .activeClass
{
    background: green;
}
.unactiveClass
{
    background: red;
}
.errorClass
{
    background: gray;
} */
</style>
<style scoped>
/* Списки дел */

.Todo
{   
 display: flex;
 justify-content: space-between;
}

.ItemList_title
{
    text-align: center;
    margin-top: 10px;
    
}
.List
{
    position: relative;
    width: 100%;
    max-width: 30%;
    border: 1px solid black;
    height: 700px;
  
}
.selectCategory
{
    border-radius: 15px;  
    width: 90%;

}
.InsertList
{
    position:absolute;
    bottom:0;
    right: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}

/* Задачи */
.ItemList
{
    position: relative;
    width: 100%;
    max-width: 65%;
    border: 1px solid black;
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
.trash_icon
{
    position: absolute;
    right: 0;
    background-image: url(../assets/garbage.png);
    width: 25px;
    height: 25px;
}
.ItemRow
{
    border: 1px solid black;
    width: 100%;
    max-width: 90%;
    margin: 0 auto;
    margin-top: 10px;
    display: flex;
    flex-flow: row wrap;   
}
.InsertItem
{
    position:absolute;
    bottom:0;
    width: 100%;;
   justify-content: space-around;
   display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.item_name
{
    list-style-type: none;
}

</style>