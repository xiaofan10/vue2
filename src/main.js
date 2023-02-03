import Vue from "vue";
import App from "./App.vue";

const a = 123;
function add(a, b) {
  return a + b;
}
console.log(add(a, a));

async function sleep() {
  const res = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(123);
    }, 3000);
  });
  console.log(res);
}
sleep();

function createRoot(id) {
  const el = document.createElement("div");
  el.setAttribute("id", id);
  document.body.append(el);
}
createRoot("app");

const app = new Vue({
  render: (h) => h(App),
}).$mount("#app");

export default app;
