const initState = {
  list: []
}

const todoDetailsReducer = (state = initState, action) => {
  const newState = {...state}

  switch(action.type) {
    case "CREATE_TODO_DETAILS":
      newState.list = [...state.list, action.todoDetails]
      return newState

    case "GET_ALL_TODO_DETAILS":
      newState.list = action.todoDetails
      return newState

    case "EDIT_TODO_DETAILS":
      newState.list = state.list.map(todoDetails => {
        if(todoDetails.id === action.editedTodoDetails.id) todoDetails.content = action.editedTodoDetails.content
        return todoDetails
      })
      return newState

    case "DELETE_TODO_DETAILS":
      newState.list = state.list.filter(todoDetails => todoDetails.id !== action.deletedId)
      return newState

    default:
      return state
  }
}

export default todoDetailsReducer