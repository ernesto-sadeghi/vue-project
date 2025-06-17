<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-6">
        <h2 class="mb-5">Editing Post {{ route.params.id }} :</h2>
        <div v-if="!isLoading" class="spinner-border text-success" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <FormView v-else @formData="submitHandler" :post="post" />
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import FormView from './FormView.vue';


 


    const router = useRouter()
    const route = useRoute()
    const isLoading = ref(false)
    const post = ref({})

    const getPost = () => {
      axios
        .get(`https://jsonplaceholder.typicode.com/posts/${route.params.id}`)
        .then((res) => {
          // console.log(res);

          post.value = res.data
          isLoading.value = true
        })
        .catch((err) => {
          console.error(err)
          Swal.fire({
            icon: "error",
            title: "Failed to load post",
            text: "Please try again later",
          })
        })
    }

    const submitHandler = (form) => {
      axios
        .put(`https://jsonplaceholder.typicode.com/posts/${route.params.id}`, {
          title: form.title,
          body: form.body,
          userId: 1
        })
        .then(() => {
          isLoading.value = false
          Swal.fire({
            title: "Thanks",
            text: "Post Edited successfully",
            icon: "success"
          })
          router.push("/posts")
        })
        .catch((err) => {
          console.error(err)
          Swal.fire({
            icon: "error",
            title: "Something went wrong!",
            text: "Try again later",
          })
          isLoading.value = false
        })
    }

    onMounted(() => {
      getPost()
    })

  
</script>

<style></style>