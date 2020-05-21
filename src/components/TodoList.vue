<template>
	<div class="wrapper">
		<h1>Задачи</h1>
		<div>
			<article v-for="(location, idx) in locations" :key="idx">
				<h1>{{ location.title }}</h1>
			</article>
		</div>
		<createtask></createtask>

		<todo></todo>
	</div>
</template>

<script>
import { db } from "@/main";
import createtask from "./CreateTask";
import todo from "./Todo";
export default {
	components: {
		createtask,
		todo
	},
	data() {
		return {
			locations: [],
			newTodo: "" // <-- новое свойство
		};
	},
	firestore() {
		return {
			locations: db.collection("testTask")
		};
	}
};
</script>

<style scoped>
h1 {
	text-align: left;
}
</style>
