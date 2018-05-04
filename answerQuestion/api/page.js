/**
 * 主页文件的 api
 */

import api from './index';

const path = {
  getDate: '/jisuapi/astro1',
  getMsg: '/jisuapi/astro',
};


const getDate = () =>api.get(path.getDate);

const getMsg = (form) =>
  api.get(path.getMsg, {
    ...form,
  });

export default {
  getMsg,
  getDate,
};