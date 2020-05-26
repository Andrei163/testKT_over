<template>
  <div>
    <form class="todo-form" @submit.prevent="addTodo(title), getPosts()">
      <input
        v-model="title"
        class="newtask"
        type="text"
        id="newtask"
        placeholder="Enter a title for this card"
        required
      />
      <button class="btnAdd" type="submit">Add Card</button>
    </form>

    <ul class="tasklist" v-if='displayedPosts.length'>
      <li v-for="(task, index) of displayedPosts" :key="index">
        {{ task.index + 1 }}) {{ task.title }}
        <div>
          <router-link tag="button" class="btn" :to=" '/edit/' + task.index">Edit</router-link>
          <span class="close" @click="removeTask(task.id), getPosts()">X</span>
        </div>
      </li>
    </ul>
	<div v-else>Loading...</div>

    <nav class="navigation">
      <ul class="pagination">
        <li class="page-item">
          <button type="button" class="page-link" v-if="page != 1" @click="page--">Назад</button>
        </li>
        <li class="page-item">
          <button
            type="button"
            class="page-link"
            v-for="pageNumber in pages.slice(page - 1, page + 5)"
            :key="pageNumber"
            @click="page = pageNumber"
          >{{ pageNumber }}</button>
        </li>
        <li class="page-item">
          <button type="button" @click="page++" v-if="page < pages.length" class="page-link">Вперед</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { db } from "@/main";
export default {
  data() {
    return {
      locations: [],
      posts: [],
      postsArr: [],
      page: 1,
      perPage: 10,
      pages: []
    };
  },

  computed: {
    displayedPosts() {
      return this.paginate(this.posts);
    }
  },
  created() {
    this.getPosts();
  },

  methods: {
    addTodo(title) {
      const createdAt = new Date();
      db.collection("testTask").add({ title, createdAt });
      this.title = "";
      //   this.$router.push("/");
    },
    getPosts() {
      this.pages = [];
      db.collection("testTask")
        .orderBy("createdAt")
        .get()
        .then(querySnapshot => {
          const postsArr = [];
          querySnapshot.forEach(doc => {
            postsArr.push({
              title: doc.data().title,
              id: doc.id
            });
          });
          this.postsArr = postsArr;
          const posts = [];
          for (let i = 0; i < this.postsArr.length; i++) {
            posts.push({
              title: this.postsArr[i].title,
              id: this.postsArr[i].id,
              index: i
            });
          }
          this.posts = posts;
        });
    },
    removeTask(id) {
      db.collection("testTask")
        .doc(id)
        .delete();
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
    }
  },
  watch: {
    posts() {
      // this.getPosts();
      this.setPages();
    }
  },
  mounted: function() {
    window.setInterval(() => {
      this.getPosts();
    }, 10000);
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
  background-color: rgb(166, 255, 0);
  color: rgb(66, 6, 94);
  font-weight: bold;
  margin-right: 20px;
  cursor: pointer;
}

.btn:hover {
  background-color: rgb(250, 129, 129);
}

.todo-form {
  display: flex;
  flex-direction: column;
}

.newtask {
  width: 100%;
  height: 30px;
  margin-bottom: 10px;
}

.btnAdd {
  color: white;
  font-weight: bold;
  font-size: 18px;
  border-radius: 7px;
  width: 120px;
  height: 40px;
  background-color: rgb(97, 202, 17);
}
</style>
