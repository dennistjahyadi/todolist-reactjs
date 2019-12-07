const initState = {
  list: [],
  currentTodo: {}
}

const todoReducer = (state = initState, action) => {
  const newState = {...state}

  switch(action.type) {
    case "CREATE_TODO":
      newState.list = [...state.list, action.todo]
      return newState

    case "GET_ALL_TODO":
      newState.list = action.todos
      return newState

    case "EDIT_TODO":
      newState.list = state.list.map(todo => {
        if(todo.id === action.editedTodo.id) todo.content = action.editedTodo.content
        return todo
      })
      newState.currentTodo = action.editedTodo
      if(state.currentTodo.id === action.editedTodo.id) newState.currentTodo.name = action.editedTodo.name

      return newState

    case "DELETE_TODO":
      newState.list = state.list.filter(todo => todo.id !== action.deletedId)
      if(state.currentTodo.id === action.deletedId) newState.currentTodo = {}
      return newState
      
    case "GET_CURRENT_TODO":
      newState.currentTodo = action.todo
      return newState
    
    case "DELETE_WORKSPACE":
      if(newState.currentTodo.Workspace && newState.currentTodo.Workspace.id === action.deletedId) newState.currentTodo = {}
      return newState
    
    case "EDIT_WORKSPACE":
      if(newState.currentTodo.Workspace && newState.currentTodo.Workspace.id === action.editedWorkspace.id) newState.currentTodo.Workspace.name = action.editedWorkspace.name
      return newState

    default:
      return state
  }
}

export default todoReducer