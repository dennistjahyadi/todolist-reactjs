import WorkspaceAPI from '../api/workspace';

export const getAllWorkspace = () => {
  return async (dispatch, getState) => {
    try{
      const workspaces = await WorkspaceAPI.get()
      dispatch({ type: 'GET_ALL_WORKSPACES', workspaces })
    }catch(err){
      console.log(err)
    }
  }
}

export const createWorkspace = (name) => {
  return async (dispatch, getState) => {
    try{
      const result = await WorkspaceAPI.create(name)
      result.Todos = []
      dispatch({ type: 'CREATE_WORKSPACE', workspace: result })
    }catch(err){
      console.log("CREATE_WORKSPACE_ERROR", err)
    }
  }
}

export const editWorkspace = (id, name) => {
  return async (dispatch, getState) => {
    try{
      await WorkspaceAPI.update(id, name)
      dispatch({ type: 'EDIT_WORKSPACE', editedWorkspace: {id, name} })
    }catch(err){
      console.log("EDIT_WORKSPACE_ERROR", err)
    }
  }
}

export const deleteWorkspace = (id) => {
  return async (dispatch, getState) => {
    try{
      await WorkspaceAPI.destroy(id)
      dispatch({ type: 'DELETE_WORKSPACE', deletedId: id })
    }catch(err){
      console.log("DELETE_WORKSPACE_ERROR", err)
    }
  }
}