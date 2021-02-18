
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
            //   const todos = await res.json();
              
        }
    },
    mutations:{
        updateTodos(state,todos){
            state.todos = todos;
        },
        createTodos(state,newTodos){
            state.todos.push(newTodos);
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
        allTodos(state)
        {
            return state.todos
        }
    }
}