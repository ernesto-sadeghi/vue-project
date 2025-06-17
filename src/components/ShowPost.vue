<template>
  <div>

    <div class="container d-flex mb-5  justify-content-around">
      <h3 class="ps-0 ps-md-4">post {{ route.params.postId }} :</h3>


      <router-link to="/posts" class="btn btn-dark ">Back to Posts </router-link>


    </div>
    <div class="d-flex justify-content-center">
      <div v-show="!isLoad" class="m-auto spinner-border text-success" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-show="isLoad" class="container  d-flex justify-content-center">
      <div class=" col-sm-6">
        <div class="card m-auto" style="width: 100%;">
          <div class="card-header d-flex justify-content-between">
            <span v-if="user.id">
              Author :
              <router-link :to="{ name: 'ShowUser', params: { id: user.id } }">
                {{ user.name }}
              </router-link>
            </span>
            <span v-else>{{ user.username }}</span> <!-- Fallback if user.id is not available -->
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item"> <span class="fw-bold">{{ user.username }} said :</span> {{ post.title }}</li>
            <li class="list-group-item">{{ post.body }}</li>

          </ul>
          <div class="card-footer">
            <router-link :to="{ name: 'EditPost', params: { id: route.params.postId } }"
              class="btn btn-secondary me-4">Edit Post
            </router-link>
            <btn @click="deleteHandler" class="btn btn-danger">Delete Post
            </btn>

          </div>
        </div>
        <h3 class="text-success pt-5 pb-5 ps-3">Comments: </h3>
        <div class="comment-container ">

          <div v-for="comment in comments" :key="comment.id">

            <commentsView :comment="comment" />
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import CommentsView from './CommentsView.vue';
import Swal from 'sweetalert2';


 

    const post = ref({});
    const user = ref({});
    const comments = ref([]);
    const isLoad = ref(false);
    const route = useRoute()
    const router = useRouter()

    const getPosts = () => {
      isLoad.value = false;
      axios
        .get(`https://jsonplaceholder.typicode.com/posts/${route.params.postId}`)
        .then((res) => {
          getUser(res.data.userId)
          post.value = res.data;
          isLoad.value = true;
        })
        .catch((err) => {
          isLoad.value = false;
          console.log(err);
        });
    };

    getPosts()

    const getUser = (userid) => {
      axios
        .get(`https://jsonplaceholder.typicode.com/users/${userid}`)
        .then((res) => {
          // console.log(res.data)
          user.value = res.data
        }).catch((err) => {
          console.log(err);
        });
    }
    const getComment = (postid) => {
      axios
        .get(`https://jsonplaceholder.typicode.com/comments?postId=${postid}`)
        .then((res) => {

          comments.value = res.data;
          // console.log(comments);

        })
    }
    getComment(route.params.postId)

    const deleteHandler = () => {
      Swal.fire({
        title: `deleting post ${route.params.postId} `,
        text: "are you sure ?",
        icon: "question",
        // showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "yes",
        // denyButtonText: `cancle`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          axios
            .delete(`https://jsonplaceholder.typicode.com/posts/${route.params.postI}`)
            .then(() => {


              Swal.fire("Deleted successfully", "", "info");
              router.push("/posts")
            })
        }
      });
    }

</script>
<style scoped>
.comment-container {
  border: #41b883 3px solid;
  border-radius: 15px;
  transition: 0.3s ease-in;
  box-shadow: 5px 5px 5px 5px #41b88300;
}

.comment-container:hover {
  transition: .3s ease-in;
  box-shadow: 2px 2px 42px 1px #1e7e534c;
}
</style>