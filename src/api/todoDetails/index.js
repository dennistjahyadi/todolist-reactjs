import ResponseAPI from '../response';
import AuthAPI from '../auth'

class WorkspaceAPI{

  /**
   * 
   * @param {string} todoId 
   * @param {string} content 
   */
  static async create(todoId, content){
    console.log(todoId, content)

    const response = await fetch(process.env.REACT_APP_API_URL + "tododetails", {
        method: 'POST',
        body: JSON.stringify({ todoId: todoId, content: content }),
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + AuthAPI.getUserToken()
        }
    })
    console.log(response)
    return ResponseAPI.handleResponse(response)
  }

  static async get(todoId){
    const response = await fetch(process.env.REACT_APP_API_URL + "tododetails/" + todoId, {
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
    const response = await fetch(process.env.REACT_APP_API_URL + "tododetails/update", {
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
    const response = await fetch(process.env.REACT_APP_API_URL + "tododetails/destroy", {
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

export default WorkspaceAPI