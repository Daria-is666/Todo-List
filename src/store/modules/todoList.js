import Axios from 'axios';
export default{
    actions:{
        async fetchTodoList(ctx)
        {
            return await Axios.get(
                "http://localhost:3000/todoList"
              ).then((response)=>{
                ctx.commit('updateTodoList', response.data);
              })
              .catch((err)=>{
                  console.log(err);
              });
        }
    },
    mutations:{
        updateTodoList(state,todoList){
            state.todoList = todoList;
        },
        createTodoList(state,newtodoList){
            state.todoList.push(newtodoList);
        },
        deleteTodoList(state,index)
        {
            state.todoList.splice(index, 1);
        },
        setStatus(state,data)
        {
            state.todoList[data.index].done = data.status;
        }
    },
    state:{
        todoList:[{
            todoName:"",
            urgency: false,
            done: false,
            todosIndex:0,
            date: null
        }],
    },
    getters:{
        allTodoList(state)
        {
            return state.todoList
        }
    }
}