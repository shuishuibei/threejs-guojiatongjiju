/*
 * @Description:
 * @Author: lys1626/刘芹芹
 * @Date: 2019-12-04 10:30:59
 * @LastEditors: lys1626/刘芹芹
 * @LastEditTime: 2019-12-06 15:12:52
 */
import Vue from "vue";
import axios from "axios";
import Echarts from "echarts"; //引入echarts
import VueRouter from "vue-router";
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";

import "@/assets/css/reset.css";
import routes from "@/router/index.js";
Vue.use(ViewUI);
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
