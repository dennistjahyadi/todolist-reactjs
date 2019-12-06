const initState = {
  list: []
}

const workspaceReducer = (state = initState, action) => {
  switch(action.type) {
    case "CREATE_WORKSPACE":
      console.log("created workspace", action.workspace)
      return { list: [...state.list, action.workspace] }
    case "CREATE_WORKSPACE_ERROR":
      console.log('create workspace error', action.err)
      return state;
    case "GET_ALL_WORKSPACES":
      console.log("it's worked: ", action.workspaces)
      return { list: action.workspaces }
    default:
      return state
  }
}

export default workspaceReducer