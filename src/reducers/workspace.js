const initState = {
  list: [],
  currentWorkspace: {}
}

const workspaceReducer = (state = initState, action) => {
  const newState = {...state}
  switch(action.type) {
    case "CREATE_WORKSPACE":
      newState.list = [...state.list, action.workspace] 
      return newState

    case "CREATE_TODO":
      newState.list = state.list.map(workspace => {
        if(workspace.id === action.todo.WorkspaceId) workspace.Todos.push(action.todo)
        return workspace
      })
      return newState

    case "EDIT_TODO":
      newState.list = state.list.map(workspace => {
        const todos = workspace.Todos.map(todo => {
          if(todo.id === action.editedTodo.id) todo.content = action.editedTodo.content
          return todo
        })
        workspace.Todos = todos
        return workspace
      })

      return newState

    case "GET_ALL_WORKSPACES":
      return { list: action.workspaces }

    case "EDIT_WORKSPACE":
      newState.list = state.list.map(workspace => {
        if(workspace.id === action.editedWorkspace.id) workspace.name = action.editedWorkspace.name
        return workspace
      })
      if(state.currentWorkspace.id === action.editedWorkspace.id) newState.currentWorkspace.name = action.editedWorkspace.name

      return newState

    case "DELETE_WORKSPACE":
      newState.list = state.list.filter(workspace => workspace.id !== action.deletedId)
      if(state.currentWorkspace.id === action.deletedId) newState.currentWorkspace = null
      return newState

    case "DELETE_TODO":
      newState.list = state.list.map(workspace => {
        const todos = workspace.Todos.filter(todo => (todo.id !== action.deletedId))
        workspace.Todos = todos
        return workspace
      })

      return newState

    case "SELECTED_WORKSPACE":
      newState.currentWorkspace = action.workspace
      return newState

    default:
      return state
  }
}

export default workspaceReducer