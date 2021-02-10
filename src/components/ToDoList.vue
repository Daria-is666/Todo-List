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
                <li v-for="(todo, index) in todos" :key="index">{{todo}}</li>
            </ul>    
        </div>
        <div class="InsertList">
            <input v-model="todo" id="addInput" class="add_list_input" placeholder="Новая список" type="text">
            <button @click="add_list" class="add_list_btn">Добавить список</button>
        </div>
               
    </div>

    <div class="ItemList">
        <p class="ItemList_title">Список дел</p>
        <div class="ItemRow">
            <button class="item_done">✔️</button>
            <ul class="Item">
                <li class="item_name">Задача 1</li>
            </ul>
        </div>
       
        <div class="InsertItem">
            <input placeholder="Новая задача" type="text">
            <button class="add_list_btn">Добавить</button>
        </div>   
    </div>   
</div>

    <!-- <ul>
        <li v-for="(todo, index) in todos" @click="deleteToDo(index)" :key="index"> {{todo}}</li>
    </ul> -->
</template>

<script>
export default {
    props:['todos','todo'],
    methods:{
        // deleteToDo(index)
        // {
        //     this.$emit('delete-todo', index);
        // },
        add_list(){
            let inputText = document.getElementById('addInput').value;
            this.$emit('add-list',inputText);
        }
    }
}
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