<template>
<div class="Todo">
    <div class="List">
        <div class="Filter">
            <select class="selectCategory">
                <option >Все категории</option>
                <option> Выполненные  </option>
                <option> Невыполненные  </option>
            </select>
        </div>
        <div class="ListItem" >
            <ul>
                <li v-for="(todo,index) in todos" :key="index" @click="showForm(index)">{{todo.name}}</li>
            </ul>    
        </div>
        <div class="InsertList">
            <input v-model="todos.name" id="addInput" class="add_list_input" placeholder="Новая список" type="text">
            <button @click="add_list()" class="add_list_btn">Добавить список</button>
        </div>
               
    </div>

    <div class="ItemList">
        <p  class="ItemList_title">Список дел </p>
        <div  class="ItemRow" v-for="(todo,index) in todoList" :key="index" v-show="checkIndex(todo.todosIndex)">
            <input  type="checkbox" class="item_done"/>
            <p class="item_name">{{todo.todoName}}</p>
            <button class='trash_icon' @click="deleteTodo(index)"></button>
        </div>
       
        <div class="InsertItem">
            <input v-model="todoList.todoName" placeholder="Новая задача" type="text">
            <button class="add_list_btn" @click="add_point_to_list()">Добавить</button>
        </div>   
    </div>   
</div>

    <!-- <ul>
        <li v-for="(todo, index) in todos" @click="deleteToDo(index)" :key="index"> {{todo}}</li>
    </ul> -->
</template>



<script >
import sweetalert from 'sweetalert';
    export default {
    props: ['todos','todoList'],
    data() {
      return {
          currentTodos:0,
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
       add_list(){
                const name = this.todos.name;           
                this.$emit('add_list',{name});
                this.todos.name = "";       
        },
        add_point_to_list(){
            const name = this.todoList.todoName;   
            const index = this.currentTodos;  
            if(index != undefined && name!="" ){
                this.$emit('add_point_to_list',
                {todoName:name,
                urgency:false,
                done:false,
                todosIndex:index}
                );
                this.todoList.todoName = "";
                sweetalert('Новая задача добавлена', 'Надеюсь, это не очередное бесполезное просиживание штанов в тик-токе', 'success');
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
    right: 0;
    left: 0;
    width: 100%;;
    display: flex; 
    flex-direction: column;
    flex-wrap: wrap;
}
.item_name
{
    list-style-type: none;
}

</style>