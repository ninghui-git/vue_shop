import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login.vue";
import Home from "../components/Home.vue";
import Welecome from "../components/Welecome.vue";
import Users from "../components/user/Users.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  {
    path: "/Home",
    component: Home,
    redirect: "/welecome",
    children: [
      {
        path: "/welecome",
        component: Welecome
      },
      {
        path: "/users",
        component: Users
      }

    ]
  }
];

const router = new VueRouter({
  routes
});
router.beforeEach((to, from, next) => {
  if (to.path === "/login") return next();

  const tokenstr = window.sessionStorage.getItem("token");
  if (!tokenstr) return next("/login");
  next();
});

export default router;
