import Axios from 'axios';
export default{
    actions:{
        async fetchTodos(ctx){
            return await Axios.get(
                "http://localhost:3000/todos"
              ).then((response)=>{
                ctx.commit('updateTodos', response.data);
              })
              .catch((err)=>{
                  console.log(err);
              });
              
        }
    },
    mutations:{
        updateTodos(state,todos){
            state.todos = todos;
            
            
        },
        createTodos(state,newTodos){
            state.todos.push(newTodos);
        },
        setDoneFilterStatus(state,data){
            state.todos[data.key].doneFilter = data.status;
        }
    },
    state:{
        todos:[{
            name:"",
            doneFilter:false,
            isEmpty:true
          }],
    },
    getters:{
        allTodo(state)
        {
            return state.todos
        }
    }
}