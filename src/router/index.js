import Vue from "vue";
import VueRouter from "vue-router";
import TodoList from '../components/TodoList';
import edit from '../components/edit';
import Todo from '../components/Todo';

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
	},
	{
		path: "/page/:id",
		name: "page",
		component: Todo
	}
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
});

export default router;
