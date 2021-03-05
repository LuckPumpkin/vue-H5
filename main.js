/*
 * @Descripttion:
 * @version:
 * @Author: yanan.zhao
 * @Date: 2021-03-02 14:33:59
 * @LastEditors: yanan.zhao
 * @LastEditTime: 2021-03-04 21:19:38
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js';
import Vant from 'vant';
import 'vant/lib/index.less';
import './assets/commonStyle/common.less';
import './assets/commonStyle/template.less';

Vue.use(Vant);

new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
