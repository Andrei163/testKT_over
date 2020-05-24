import Vue from "vue";
import VueRouter from "vue-router";
import TodoList from '../components/TodoList';
import edit from '../components/edit';

Vue.use(VueRouter);

const routes = [

	{
		path: "/",
		name: "TodoList",
		component: TodoList
	},


	{
		path: "/edit/:id",
		name: "edit",
		component: edit,
		props: true
	}
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
});

export default router;
