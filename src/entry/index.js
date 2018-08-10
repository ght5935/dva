
import dva from 'dva';
import createLoading from 'dva-loading';
import 'console-polyfill';
import 'babel-polyfill';
import moment from 'moment';
import {message} from 'antd';
import {browserHistory} from 'dva/router';
import { createLogger } from 'redux-logger';
import '../index.css';

import index from '../models/example';
import router from '../routers/router';
// 1. Initialize
const app = dva();

// 2. Plugins
app.use(createLoading());

// 3. Model
// app.model(require('../models/example'));
app.model(index);
// 4. Router
// app.router(require('../routers/router').default);
app.router(router);
// 5. Start
app.start('#root');
