<template>
  <div>
    <div v-if="editTask.length">
      <h1>Задача № {{ +id + 1 }}</h1>
      <ul class="tasklist">
        <li>{{ editTask[id].title }}</li>
        <input v-model="editTask.title" />
        <button @click="onEditSubmit(editTask[id].taskid), getTask()">Edit</button>
        <button @click="onCancel">Cancel</button>
        <router-link tag="button" class="btn" :to="'/'">Back</router-link>
      </ul>
    </div>
    <p v-else>Задача отсутствует</p>
  </div>
</template>

<script>
import { db } from "@/main";
export default {
  props: ["index"],
  data() {
    return {
      id: this.$router.currentRoute.params["id"],
      editTask: [],
      title: "",
      taskid: "",
	  createdAt: "",
	  
    };
  },

  created() {
    this.getTask();
  },

  methods: {
    getTask() {
      db.collection("testTask")
        .orderBy("createdAt")
        .get()
        .then(querySnapshot => {
          const editTask = [];
          querySnapshot.forEach(doc => {
            this.editTask.push({
              title: doc.data().title,
              createdAt: doc.data(),
              taskid: doc.id
            });
          });

          this.$editTask = editTask;
        });
    },

    onEdit(editTask) {
      //   this.editId = this.taskid;
      this.editTask.title = editTask.title;
    },
    onCancel() {
      this.editTask.title = "";
    },
    onEditSubmit(id) {
      db.collection("testTask")
        .doc(id)
        .set({
          createdAt: new Date(),
          title: this.editTask.title
        })
        .then(this.getTask());
	  this.onCancel();
	  this.$router.push("/");
    }
  },

//   watch: {
//     editTask() {
//       this.getTask();
//     }
//   }
};
</script>


<style scoped>
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
</style>
