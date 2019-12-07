import TodoAPI from '../api/todo';

export const getAllTodo = (workspaceId) => {
  return async (dispatch, getState) => {
      const todos = await TodoAPI.get()
      const newTodos = todos.map(todo => {
        return {...todo, workspaceId}
      })
      dispatch({ type: 'GET_ALL_TODO', todos: newTodos })
  }
}

export const createTodo = (workspaceId, content) => {
  return async (dispatch, getState) => {
    try{
      const result = await TodoAPI.create(workspaceId, content)
      dispatch({ type: 'CREATE_TODO', todo: result })
    }catch(err){
      console.log("CREATE_TODO_ERROR", err)
    }
  }
}

export const editTodo = (id, content) => {
  return async (dispatch, getState) => {
    try{
      await TodoAPI.update(id, content)
      dispatch({ type: 'EDIT_TODO', editedTodo: {id, content} })
    }catch(err){
      console.log("EDIT_TODO_ERROR", err)
    }
  }
}

export const deleteTodo = (id) => {
  return async (dispatch, getState) => {
    try{
      await TodoAPI.destroy(id)
      dispatch({ type: 'DELETE_TODO', deletedId: id })
    }catch(err){
      console.log("DELETE_TODO_ERROR", err)
    }
  }
}

export const selectedTodo = (todo) => {
  return async (dispatch, getState) => dispatch({ type: 'SELECTED_TODO', todo })
  
}
