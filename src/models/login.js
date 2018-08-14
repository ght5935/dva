
import cookie from 'react-cookie';
import { onlogin } from '../services/login';
import MD5 from 'crypto-js/md5';

import { isApiSuccess, apiData } from '../utils/utils';

export default {
  namespace: 'login',
  state: {
    loading: false,
    isLogin: false,
    hasError: false,
    errorMsg: null,
    username: null
  },

  subscriptions: {
    setup({ dispatch, history }) { // 查询cookie中保存的用户名,accessToken
      history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({
            type: 'loadCookie',
            payload: {
              cookieName: 'login_name'
            }
          });
        }
      });
    }
  },

  effects: {
    * onLogin({ payload }, { call, put }) {
      yield put({
        type: 'setLoadingState',
        payload: {
          loading: true
        }
      });
      const { username, password, remember } = payload;

      const pwdMD5 = MD5(password).toString();  // MD5值是5f4dcc3b5aa765d61d8327deb882cf99

      const response = yield call(onlogin, {
        username,
        remember,
        password: pwdMD5
      });
      if (isApiSuccess(response)) {
        yield put({
          type: 'loginSuccess',
          payload: {
            isLogin: true,
            username
          }
        });
      } else {
        yield put({
          type: 'setLoadingState',
          payload: {
            loading: false
          }
        });
        yield put({
          type: 'loginFailed',
          payload: {
            isLogin: false,
            hasError: true,
            errorMsg: '用户名密码错误!'
          }
        });
      }
    },
    * onOk({ payload }, { put }) {
      yield put({
        type: 'resetState',
        payload: {
          hasError: payload.hasError,
          errorMsg: payload.errorMsg
        }
      });
    },
    * loadCookie({ payload }, { put }) {
      const { cookieName } = payload;

      const userName = cookie.load(cookieName) ? cookie.load(cookieName) : null;

      yield put({
        type: 'loadLocalCookie',
        payload: {
          username: userName
        }
      });
    },
    * clearMsg({ payload }, { put, call }) {
      yield put({
        type: 'loginFailed',
        payload: {
          hasError: false,
          errorMsg: ''
        }
      });
    }
  },

  reducers: {
        // 使用服务器数据返回
    loginSuccess(state, action) {
      return { ...state, ...action.payload };
    },
    loginFailed(state, action) {
      return { ...state, ...action.payload };
    },
    resetState(state, action) {
      return { ...state, ...action.payload };
    },
    loadLocalCookie(state, action) {
      return { ...state, ...action.payload };
    },
    setLoadingState(state, action) {
      return { ...state, ...action.payload };
    }
  }

};
