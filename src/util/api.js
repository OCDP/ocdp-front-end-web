import axios from 'axios';
import base64 from 'base-64';

function apiFunc(usuario, senha){
  const api = axios.create({
      baseURL: 'http://api-ocdp.us-east-2.elasticbeanstalk.com:8080/api/',
      auth: {
        username: usuario,
        password: senha
      },
      headers:{
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Basic ' + base64.encode(usuario + ':' + senha)
      }
  });
  return api;
}
export default apiFunc;