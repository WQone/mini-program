/**
 * 主页文件的 api
 */

import api from './index';

const path = {
  getDate: '/jisuapi/astro1',
  getMsg: '/jisuapi/astro',
};


const getDate = () =>api.get(path.getDate);

const getMsg = (astroid) =>
  api.get(path.getMsg, {
    astroid,
  });

export default {
  getMsg,
  getDate,
};