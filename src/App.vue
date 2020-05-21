<template>
	<div class="body">
		<todo></todo>
	</div>
</template>

<script>
import todo from "./components/TodoList";
export default {
	components: {
		todo
	}
};
</script>

<style scoped>
.body {
	max-width: 960px;
	margin: 0 auto;
	padding: 25px;
	background-color: rgb(224, 227, 230);
}

@media (max-width: 768px) {
	.body {
		max-width: 768px;
	}
}

@media (max-width: 576px) {
	.body {
		max-width: 576px;
	}
}
</style>
