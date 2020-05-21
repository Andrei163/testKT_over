<template>
	<h1>id {{ id }}</h1>
</template>

<script>
export default {
	data() {
		return {
			id: this.$router.currentRoute.params["id"]
		};
	}
};
</script>

<style scoped></style>
