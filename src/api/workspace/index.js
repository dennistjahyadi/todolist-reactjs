import ResponseAPI from '../response';
import AuthAPI from '../auth'
require('dotenv').config()

class WorkspaceAPI{

  /**
   * 
   * @param {string} name 
   */
  static async create(name){
    const response = await fetch(process.env.REACT_APP_API_URL + "workspaces", {
        method: 'POST',
        body: JSON.stringify({name: name}),
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + AuthAPI.getUserToken()
        }
    })

    return ResponseAPI.handleResponse(response)
  }

  static async get(){
    const response = await fetch(process.env.REACT_APP_API_URL + "workspaces", {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + AuthAPI.getUserToken()
        }
    })
    
    return ResponseAPI.handleResponse(response)
  }


}

export default WorkspaceAPI