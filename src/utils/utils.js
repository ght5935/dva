import { Modal, message } from 'antd';

export function apiData({ response, err }) {
  return response.data.result;
}

export function isApiSuccess(response) {
  if (response.err) {
    return false;
  }
  const { data } = response.response;
  if (data && data.status === 0) {
    return true;
  }

  return false;
}

export function cfShowWarning(title, content, okText) {
  Modal.warn({ title, content, okText });
}

export function cfShowApiFail({
  response,
  err
}, opt = {}) {
  // api status !=0  or http error, or else
  let { title, content, okText } = opt;
  let msg;

  title = title || '操作失败';
  okText = okText || '确定';

  if (response) {
    const { data } = response;
    msg = data.message;
  }

  if (err) {
    if (err.response) {
      msg = `${err.response.status} ${err.response.statusText}`;
    } else if (err.request) {
      msg = '网络错误';
    } else {
      msg = '发生错误';
    }
  }

  content = content || msg;

  // Modal.warn({title, content, okText});
  message.error(content);
}
export function cfApiSuccess() {
  message.success('操作成功！');
}

export function takeImgFromWorker(dataSource) {
  if (dataSource.judgePerson) {
    if (dataSource.judgePerson.uploadImgs) {
      return dataSource.judgePerson.uploadImgs[0];
    }
    return dataSource.judgePerson.imgs[0];
  }
  return false;
}

//把时间戳转化为日期, 精确到秒
export function timestampToTime(timestamp) {
  let date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
  let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
  let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
  let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  return Y + M + D + h + m + s;
}

export function delay(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
