let nextTodoId = 0;
export function addTodo(todoText) {  
    return dispatch => {
      new Promise(resolve => {
            setTimeout(()=>{
                console.log('resolving action');
                resolve({
                        type: 'ADD_TODO',
                        text: todoText,
                        id: nextTodoId++
                }); 
            }, 500);
      })
    }
}

export default function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      console.log('in Add to Do');
      return state.concat([ action.text ])
    default:
      return state
  }
}