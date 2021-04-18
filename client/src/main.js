import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;
//Add unimported components to ignore list to prevent warnings.
Vue.config.ignoredElements = [
  "field",
  "block",
  "category",
  "xml",
  "mutation",
  "value",
  "sep",
];

// Vue.use(Router)

// const router = new Router({
//   routes: [
//     { path: '/', component: () => import('./components/BlocklyBuilderComponent.vue') },
//     { path: '/login', component: () => import('./components/LoginComponent.vue') }
//   ]
// })

new Vue({
  render: (h) => h(App),
}).$mount("#app");
