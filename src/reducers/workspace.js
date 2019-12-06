const initState = {
  list: []
}

const workspaceReducer = (state = initState, action) => {
  switch(action.type) {
    case "CREATE_WORKSPACE":
      return { list: [...state.list, action.workspace] }

    case "GET_ALL_WORKSPACES":
      return { list: action.workspaces }

    case "EDIT_WORKSPACE":
      const editedState = {}
      editedState.list = state.list.map(workspace => {
        if(workspace.id === action.editedWorkspace.id) workspace.name = action.editedWorkspace.name
        return workspace
      })
      return editedState

    case "DELETE_WORKSPACE":
      const deletedState = {}
      deletedState.list = state.list.filter(workspace => workspace.id !== action.deletedId)
      return deletedState

    default:
      return state
  }
}

export default workspaceReducer