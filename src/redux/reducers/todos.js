let nextTodoId = 0;
export function addTodo(todoText) {    
    return {
        type: 'ADD_TODO',
        text: todoText,
        id: nextTodoId++
    };
}

export default function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([ action.text ])
    default:
      return state
  }
}