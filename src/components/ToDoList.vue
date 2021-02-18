<template>

    <div class="item_list">
        <h1  class="item_list_title" v-show="checkCurrentTodos()">{{header}}</h1>
        <div  class="item_row" v-for="(todo,index) in todoList" :key="index" v-show="checkIndex(todo.todosIndex)">
            <input  type="checkbox" class="item_done" id="status_box" @click="addDoneStatus(index)"/>
            <h2 class="item_name">{{todo.todoName}}</h2>
            <h3 class="full_date">{{todo.date}}</h3>
            <button class='trash_icon' @click="deleteTodo(index)"></button>
        </div>
       
        <div class="insert_item">
            <div>
                <input v-model="todoList.todoName" placeholder="Новая задача" type="text">
                 <button class="add_list_btn" @click="addPointToList()">Добавить</button>
            </div>  
            <label for="urgency_check"><input type="checkbox" id="urgency_check"> Cрочное</label>    
        </div>   
    </div>   
</template>


<script >
import sweetalert from 'sweetalert';
import moment from 'moment';

    export default {
    props: ['todos','todoList','currentTodos'],
    data() {
      return {
          header: "",
      };
    },
    methods: {
        addPointToList(){
            const name = this.todoList.todoName;   
            const index = this.currentTodos;
           const dateFull = new Date();
            if(index != undefined && name!="" ){
                this.$emit('addPointToList',
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
    //     showForm(index) {
         
    //      console.log(this.currentTodos);
    //    },
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
</style>

<style >


/* Задачи */
.item_list_title
{
    text-align: center;
    margin-top: 10px;  
}
.item_list
{
    position: relative;
    width: 100%;
    max-width: 30%;
    border: 1px solid black;
    height: 700px;
}
.list_style.activeClass{
background: green;
}
.list_style.errorClass{
 background: gray;
}
.list_style.unactiveClass
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
.item_row
{
    border: 1px solid black;
    width: 100%;
    max-width: 90%;
    margin: 0 auto;
    margin-top: 10px;
    display: flex;
    flex-flow: row wrap;   
}
.insert_item
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