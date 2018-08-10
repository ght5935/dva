import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import mo from '../assets/mo.jpg';
function IndexPage() {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to dva!</h1>
      <div className={styles.tou}>
        <a href="http://www.cnblogs.com/gaoht"><img src={mo} /></a>
      </div>
      <a href="http://www.cnblogs.com/gaoht"><h1 className={styles.title2}>跳转</h1></a>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
