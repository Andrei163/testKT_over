<template>
	<div class="wrapper">
		<h1>Задачи</h1>
		<div>
		</div>
		

		<todo></todo>
	</div>
</template>

<script>
import { db } from "@/main";

import todo from "./Todo";
export default {
	components: {
		
		todo
	},
	data() {
		return {
			locations: [],
			newTodo: ""
		};
	},
	firestore() {
		return {
			locations: db.collection("testTask")
		};
	},
	methods: {
   deleteLocation (id) { 
     db.collection('testTask').doc(id).delete()
   }
 }
};
</script>

<style scoped>
h1 {
	text-align: left;
}
</style>
