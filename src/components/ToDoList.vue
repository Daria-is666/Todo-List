<template>
    <div class="item_list">
        <h1  class="item_list_title" v-show="checkCurrentTodos()">{{header}}</h1>
        <div  class="item_row" v-for="(todo,index) in allTodoList" :key="index" v-show="checkIndex(todo.todosIndex)">
            <input  type="checkbox" class="item_done" id="status_box" @click="addDoneStatus(index)"/>
            <h2 class="item_name" v-bind:class="{active_class: allTodoList[index].urgency}">{{todo.todoName}}</h2>
            <h3 class="full_date">{{todo.date}}</h3>
            <button class='trash_icon' @click="deleteTodo(index)"></button>
        </div>
       
        <div class="insert_item">
            <div class="insert_list_item">
                <input v-model="allTodoList.todoName" class="add_list_input" placeholder="Новая задача" type="text">
                 <button class="add_list_btn" @click="addPointToList()">Добавить дело</button>
            </div>  
            <input type="checkbox" id="urgency_check" v-model="allTodoList.urgency" class="urgency_check">
        </div>   
    </div>   
</template>


<script >
import sweetalert from 'sweetalert';
import moment from 'moment';
import { mapMutations, mapGetters } from 'vuex';

    export default {
    props: ['currentTodos'],
    data() {
      return {
          header: "",
          allTodoList: this.$store.getters.allTodoList,
          allTodos: this.$store.getters.allTodo
      };
    },
    mounted(){
        console.log("1111");
    },  
    computed:mapGetters(['allTodo']),
    methods: {
         ...mapMutations(["createTodoList","deleteTodoList","setStatus","setDoneFilterStatus"]),
        addPointToList(){ 
            const name = this.allTodoList.todoName;   
            const index = this.currentTodos;
            const urgency = this.allTodoList.urgency;
           const dateFull = new Date();
            if(index != undefined && name!="" ){
                this.createTodoList({
                todoName:name,
                urgency:urgency,
                done: false,
                todosIndex:index,
                date:moment(dateFull).format('L') + moment(dateFull).format('LT')
                })
                this.allTodoList.todoName = "";
                sweetalert('Новая задача добавлена', 'Надеюсь, это не очередное бесполезное просиживание штанов в тик-токе', 'success');
                 this.allTodoList= this.$store.getters.allTodoList;
                 this.allTodos= this.$store.getters.allTodo;
            }  
            console.log( urgency)        
        },
        addDoneStatus(index){
        this.allTodoList= this.$store.getters.allTodoList;
        this.allTodos= this.$store.getters.allTodo;
        const status = document.getElementById('status_box');
        this.allTodoList[index].done = status.checked;
        this.setStatus({index:index,status:status.checked});
          for (let i = 0; i < this.allTodos.length; i++) {
                for (let index = 0; index < this.allTodoList.length; index++) {
                    if(i == this.allTodoList[index].todosIndex)
                    {
                         let key = this.allTodoList[index].todosIndex;
                        if(this.allTodoList[index].done == false)
                        {
                             this.setDoneFilterStatus({key:key,
                                status:false});
                            break;
                        }
                        if(this.allTodoList[index].done != false)
                        {
                             this.setDoneFilterStatus({key:key,
                                status:true});
                        }
                }              
            } 
        }
    },
        checkIndex(index){
          if(this.currentTodos == index)
              return true;             
          else
            return false;
       },
        checkCurrentTodos(){
        this.allTodos= this.$store.getters.allTodo;
          if(this.currentTodos != null){
              this.header = this.allTodos[this.currentTodos].name;
              return true;
          }
          else
            return false;
       },
         deleteTodo(index) {
            this.allTodoList= this.$store.getters.allTodoList;
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
                    this.deleteTodoList(index);
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
  border-radius: 15px;
  font-family: 'Gilroy', sans-serif;
  padding: 10px;
  margin: 0 auto;
 color: var(--main);
 background: rgb(221, 220, 220);
}

</style>

<style >


/* Задачи */
.item_list
{
    position: relative;
    width: 100%;
    max-width: 60%;
    border: 1px solid teal;
    border-radius: 15px;
    box-shadow: 0 0 25px  teal;
    background: white;
    height: 700px;
}
.item_list_title
{
    text-align: center;
    margin-top: 10px;  
}
.insert_list_item
{

    display:flex;
    width: 80%;
    margin: 0 auto;
}
.trash_icon
{
    position: absolute;
    right: 10px;
    background-image: url(../assets/garbage.png);
    width: 25px;
    height: 25px;
}
.item_row
{
    position: relative;
    border: 1px solid teal;
    border-radius: 5px;
    padding: 5px 5px 5px 0;
    width: 100%;
    max-width: 80%;
    margin: 0 auto;
    text-align: center;
    margin-top: 15px;
    display: flex;
    flex-flow: row wrap;   
}
.full_date
{
    position: absolute;
    right: 40px;
    font-size: 15px;
}
.insert_item
{
    position:absolute;
    bottom:0;
    left: 20%; 
    right: 20%;
    margin-bottom: 10px; 
    display: flex;
    justify-content: space-between;
    
}
.urgency_check
{
    position: relative;
    right: 10px;
    display: flex;
}
.item_name.active_class{
    color: rgb(233, 2, 2);
}
.item_name
{
    list-style-type: none;
    margin-left: 10px;

}
</style>