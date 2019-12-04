/*
 * @Description
 * @Author ys1983/张睿博
 * @Date 2019-10-29 10:29:09
 * @LastEditors ys1983/张睿博
 * @LastEditTime 2019-11-07 10:38:56
 */
import Vue from "vue";
import axios from "axios";
import Echarts from "echarts"; //引入echarts
import VueRouter from "vue-router";

import "@/assets/css/reset.css";
import routes from "@/router/index.js";
Vue.use(VueRouter);
const router = new VueRouter({
  routes: [routes]
});

Vue.prototype.$echarts = Echarts;
/* eslint-disable */
let axiosIns = axios.create(
  process.env.NODE_ENV === "development"
    ? {
        baseURL: SERVICE_URL
      }
    : {}
);
Vue.prototype.$http = axiosIns;
const vm = new Vue({
  el: "#app",
  router
});
/* eslint-enable */
