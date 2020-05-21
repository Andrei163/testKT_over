import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		tasks: JSON.parse(localStorage.getItem("tasks") || "[]")
	},
	mutations: {
		createTask(state, task) {
			state.tasks.unshift(task);
			localStorage.setItem("tasks", JSON.stringify(state.tasks));
		},
		REMOVE_TASK: (state, index) => {
			state.tasks.splice(index, 1);
			localStorage.setItem("tasks", JSON.stringify(state.tasks));
		}
	},
	actions: {
		createTask({ commit }, task) {
			commit("createTask", task);
		},
		REMOVE_TASK({ commit }, index) {
			commit("REMOVE_TASK", index);
		}
	},
	getters: {
		tasks: s => s.tasks
	},
	modules: {}
});
