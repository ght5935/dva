import axios from 'axios';
import qs from 'qs';
import {API_PREFIX} from './config'
import {Modal} from 'antd'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
axios.defaults.withCredentials = true; // cookie
axios.defaults.timeout = 15000; // 15s
axios.defaults.maxContentLength = 1024 * 1024; // 1M

axios
  .interceptors
  .request
  .use(config => {
    const {method} = config;
    if (method && method.toLowerCase() === 'post') {
      config.data = qs.stringify(config.data);
    }
    return config;
  }, error => {
    Promise.reject(error);
  });

/**
 * Requests a URL, returning a promise.
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] { method, params, data}
 * @return {object}           An object containing either "res" or "err"
 * response = {data,status,statusText,headers,config,request}
 * err = {response,request,message,config}
 */
export default function request(url, options) {
  return axios(url, options)
    .then(response => {
      // 登录验证
      if(response.data.message == '请登录' && response.data.result === 'invalid login')
      {
        let secondsToGo = 5;
        const modal = Modal.error({
          title: '登录超时',
          content: `${secondsToGo}秒后返回登录页面`,
        });
        const timer = setInterval(() => {
          secondsToGo -= 1;
          modal.update({
            content: `${secondsToGo}秒后返回登录页面`,
          });
        }, 1000);
        setTimeout(() => {
          clearInterval(timer);
          modal.destroy();
          window.location.href = API_PREFIX
        }, secondsToGo * 1000);
      }

      return { response }
    })
    .catch(err => { 
      return {err}; 
    });
}
