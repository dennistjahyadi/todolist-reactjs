import ResponseAPI from '../response';
import AuthAPI from '../auth'

class TodoAPI{

  /**
   * 
   * @param {string} workspaceId 
   * @param {string} content 
   */
  static async create(workspaceId, content){
    const response = await fetch(process.env.REACT_APP_API_URL + "todos", {
        method: 'POST',
        body: JSON.stringify({ workspaceId: workspaceId, content: content }),
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + AuthAPI.getUserToken()
        }
    })
    return ResponseAPI.handleResponse(response)
  }

  /**
   * 
   * @param {string} workspaceId 
   */
  static async get(workspaceId = ""){

    const response = await fetch(process.env.REACT_APP_API_URL + "todos/" + workspaceId, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + AuthAPI.getUserToken()
        }
    })
    
    return ResponseAPI.handleResponse(response)
  }
  
  /**
   * 
   * @param {string} todoId 
   */
  static async getDetails(todoId){
    const response = await fetch(process.env.REACT_APP_API_URL + "todos/details/" + todoId, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + AuthAPI.getUserToken()
        }
    })
    
    return ResponseAPI.handleResponse(response)
  }

  /**
   * 
   * @param {string} id 
   * @param {string} content 
   */
  static async update(id, content){
    const response = await fetch(process.env.REACT_APP_API_URL + "todos/update", {
        method: 'POST',
        body: JSON.stringify({ id, content }),
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + AuthAPI.getUserToken()
        }
    })
    
    return ResponseAPI.handleResponse(response)
  }

  /**
   * 
   * @param {string} id 
   */
  static async destroy(id){
    const response = await fetch(process.env.REACT_APP_API_URL + "todos/destroy", {
        method: 'POST',
        body: JSON.stringify({ id }),
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + AuthAPI.getUserToken()
        }
    })
    
    return ResponseAPI.handleResponse(response)
  }

}

export default TodoAPI