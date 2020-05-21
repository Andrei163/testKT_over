import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Paginate from "vuejs-paginate";
import { firestorePlugin } from "vuefire";
import firebase from "firebase/app";
import "firebase/firestore";

Vue.config.productionTip = false;
Vue.component("paginate", Paginate);

Vue.use(firestorePlugin);

firebase.initializeApp({
	projectId: "testtaskktteam",
	databaseURL: "https://testtaskktteam.firebaseio.com"
});
export const db = firebase.firestore();

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
