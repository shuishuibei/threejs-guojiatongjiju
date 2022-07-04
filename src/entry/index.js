/*
 * @Description:
 * @Author: lys1626/刘芹芹
 * @Date: 2019-12-04 10:30:59
 * @LastEditors  : lys1626/刘芹芹
 * @LastEditTime : 2019-12-25 16:47:57
 */
import Vue from "vue";
import axios from "axios";
import Echarts from "echarts"; //引入echarts
import VueRouter from "vue-router";
import Iview from "iview";
import Loading from "@/components/h3c-loading/H3cLoading.vue";
import "@/assets/font/iconfont.css";
import * as Three from 'three';
import "@/assets/css/reset.css";
import "iview/dist/styles/iview.css";
import routes from "@/router/index.js";

window.THREE = Three;
Vue.use(Iview);
Vue.use(VueRouter);
const router = new VueRouter({
  routes: [routes]
});
Vue.prototype.$THREE = Three;
Vue.prototype.$echarts = Echarts;
/* eslint-disable */
let axiosIns = axios.create(
  process.env.NODE_ENV === "development" ? { baseURL: SERVICE_URL } : {}
);
Vue.prototype.$http = axiosIns;
axiosIns.defaults.withCredentials = true;

Vue.prototype.$loading = {
  show(_this) {
    _this.$Spin.show({
      render: h => {
        return h(Loading);
      }
    });
  },
  hide(_this) {
    _this.$Spin.hide();
  }
};

const vm = new Vue({
  el: "#app",
  router
});
/* eslint-disable */
