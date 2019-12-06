import WorkspaceAPI from '../api/workspace';

export const getAllWorkspace = () => {
  return async (dispatch, getState) => {
      const workspaces = await WorkspaceAPI.get()
      dispatch({ type: 'GET_ALL_WORKSPACES', workspaces })
  }
}

export const createWorkspace = (name) => {
  return async (dispatch, getState) => {
    try{
      const result = await WorkspaceAPI.create(name)
      dispatch({ type: 'CREATE_WORKSPACE', workspace: result })
    }catch(err){
      dispatch({ type: 'CREATE_WORKSPACE_ERROR', err })
    }
  }
}

export const editWorkspace = (name) => {
  return async (dispatch, getState) => {

    //dispatch({ type: 'EDITED_WORKSPACE', workspaces })
  }
}

export const deleteWorkspace = (id) => {
  return async (dispatch, getState) => {

    //dispatch({ type: 'DELETED_WORKSPACES', workspaces })
  }
}

