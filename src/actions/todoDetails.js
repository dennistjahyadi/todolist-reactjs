import TodoDetailsAPI from '../api/todoDetails';

export const getAllTodoDetails = (todoId) => {
  return async (dispatch, getState) => {
      const todos = await TodoDetailsAPI.get(todoId)
      dispatch({ type: 'GET_ALL_TODO_DETAILS', todos })
  }
}

export const createTodoDetails = (todoId, content) => {
  return async (dispatch, getState) => {
    try{
      const result = await TodoDetailsAPI.create(todoId, content)
      dispatch({ type: 'CREATE_TODO_DETAILS', todo: result })
    }catch(err){
      console.log("CREATE_TODO_DETAILS_ERROR", err)
    }
  }
}

export const editTodoDetails = (id, content) => {
  return async (dispatch, getState) => {
    try{
      await TodoDetailsAPI.update(id, content)
      dispatch({ type: 'EDIT_TODO_DETAILS', editedTodoDetails: {id, content} })
    }catch(err){
      console.log("EDIT_TODO_DETAILS_ERROR", err)
    }
  }
}

export const deleteTodoDetails = (id) => {
  return async (dispatch, getState) => {
    try{
      await TodoDetailsAPI.destroy(id)
      dispatch({ type: 'DELETE_TODO_DETAILS', deletedId: id })
    }catch(err){
      console.log("DELETE_TODO_DETAILS_ERROR", err)
    }
  }
}

