import ResponseAPI from '../response';

class AuthAPI{

  /**
   * 
   * @param {string} username 
   * @param {string} password 
   */
  static async login(username, password){
    const response = await fetch(process.env.REACT_APP_API_URL + "login", {
        method: 'POST',
        body: JSON.stringify({username, password}),
        headers: { 
          'Content-Type': 'application/json'
        }
    })
    
    return ResponseAPI.handleResponse(response)
  }

  static async logout(){
    sessionStorage.removeItem('userLoggedIn')
  }

  static isLoggedIn(){
    const userLoggedIn = sessionStorage.getItem("userLoggedIn")
    return (userLoggedIn)? true : false
  }

  static getUserToken(){
    const userLoggedIn = sessionStorage.getItem("userLoggedIn")
    return JSON.parse(userLoggedIn).token
  }

}

export default AuthAPI