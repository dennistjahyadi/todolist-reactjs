const CustomError = require('../../entities/error')

require('dotenv').config()

class ResponseAPI{

  /**
   * 
   * @param {Response} result 
   */
  static handleResponse(result){
    if(result.status === 200) return result.json()
    else {
      if(result.status === 403) throw new CustomError('auth-failed', 'Wrong username or password')
      else throw new CustomError('auth-failed', 'Response status: '+ result.status)
    }
  }

}

export default ResponseAPI