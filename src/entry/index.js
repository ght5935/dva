
import dva from 'dva';
import createLoading from 'dva-loading';
import 'console-polyfill';
import 'babel-polyfill';
import moment from 'moment';
import { message } from 'antd';
import { browserHistory } from 'dva/router';
// import { createLogger } from 'redux-logger';
import '../index.css';

// 修改时间选择器语言为中文
moment.locale('zh-cn');
// 1. Initialize
const app = dva({
    history: browserHistory,
    onError(error) {
        message.error(error.message);
    }
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('../models/example').default);
// 4. Router
app.router(require('../routers/router').default);
// 5. Start
app.start('#root');
