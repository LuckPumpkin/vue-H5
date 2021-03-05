/*
 * @Descripttion:
 * @version:
 * @Author: yanan.zhao
 * @Date: 2021-03-02 15:04:22
 * @LastEditors: yanan.zhao
 * @LastEditTime: 2021-03-02 15:23:42
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routers.js';

Vue.use(VueRouter);

const routerConfig = {
  // mode: history,
  routes: routes,
};
const router = new VueRouter(routerConfig);

export default router;
