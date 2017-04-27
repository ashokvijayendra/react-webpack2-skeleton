let nextTodoId = 0;

export let  addTodo = (text) => (dispatch) => {
    return new Promise(resolve => {
            setTimeout(()=>{
                resolve(dispatch({
                        type: 'ADD_TODO',
                        text: text,
                        id: nextTodoId++
                })); 
            }, 500);
      })     
};;

export default function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([ action.text ])
    default:
      return state
  }
}