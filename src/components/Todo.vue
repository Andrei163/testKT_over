<template>
	<div class="body">
		<ul class="tasklist">
			<li v-for="(task, index) of displayedPosts" :key="index">
				{{ task.id }}) {{ task.title }}
				<div>
					<router-link tag="button" class="btn" :to="'/edit/' + index"
						>red</router-link
					>
					<span class="close" @click="removeTask(task.index)">X</span>
				</div>
			</li>
		</ul>

		<nav class="navigation">
			<ul class="pagination">
				<li class="page-item">
					<button
						type="button"
						class="page-link"
						v-if="page != 1"
						@click="page--"
					>
						Назад
					</button>
				</li>
				<li class="page-item">
					<button
						type="button"
						class="page-link"
						v-for="pageNumber in pages.slice(page - 1, page + 5)"
						:key="pageNumber"
						@click="page = pageNumber"
					>
						{{ pageNumber }}
					</button>
				</li>
				<li class="page-item">
					<button
						type="button"
						@click="page++"
						v-if="page < pages.length"
						class="page-link"
					>
						Вперед
					</button>
				</li>
			</ul>
		</nav>
	</div>
</template>

<script>
import { db } from "@/main";
import { mapActions } from "vuex";
export default {
	data() {
		return {
			locations: [],
			posts: [],
			page: 1,
			perPage: 10,
			pages: []
		};
	},
	firestore() {
		return {
			locations: db.collection("testTask")
		};
	},
	computed: {
		displayedPosts() {
			return this.paginate(this.posts);
		}
	},
	methods: {
		getPosts() {
			this.posts = [];
			this.pages = [];
			//   const data = this.$store.getters.tasks;
			const data = this.locations;
			console.log(Object.values(data));
			for (let i = 0; i < data.length; i++) {
				this.posts.push({
					title: data[i].title,
					id: i + 1,
					index: i
				});
			}
		},
		setPages() {
			let numberOfPages = Math.ceil(this.posts.length / this.perPage);
			for (let index = 1; index <= numberOfPages; index++) {
				this.pages.push(index);
			}
		},
		paginate(posts) {
			let page = this.page;
			let perPage = this.perPage;
			let from = page * perPage - perPage;
			let to = page * perPage;
			return posts.slice(from, to);
		},
		...mapActions(["REMOVE_TASK"]),
		removeTask(index) {
			this.REMOVE_TASK(index);
		}
	},
	watch: {
		posts() {
			this.setPages();
		}
	},
	created() {
		this.getPosts();
	},
	mounted() {
		this.$store.watch(
			state => state.tasks,
			() => {
				this.getPosts();
				this.paginate(this.posts);
			}
		);
	}
};
</script>

<style scoped>
.tasklist {
	height: 535px;
	margin: 0 auto;
	margin-top: 10px;
	padding: 0;
	list-style: none;
}

li {
	display: flex;
	justify-content: space-between;
	font-size: 18px;
	height: 40px;
	background-color: white;
	margin-bottom: 15px;
	border-radius: 4px;
	line-height: 40px;
	text-align: left;
	padding-left: 10px;
	cursor: pointer;
}

.close {
	color: red;
	font-weight: bold;
	font-size: 20px;
	margin-right: 20px;
	padding: 0 10px;
}

.close:hover {
	background-color: rgb(196, 196, 196);
	transition: 0.5s;
}

.navigation {
	display: flex;
	justify-content: center;
}
.pagination {
	display: flex;
	padding: 0;
}

.page-item {
	padding: 0;
}

.btn {
	background-color: red;
	margin-right: 20px;
	cursor: pointer;
}

.btn:hover {
	background-color: rgb(250, 129, 129);
}
</style>
