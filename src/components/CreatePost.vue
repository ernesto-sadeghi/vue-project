<template>
  <div class="container">

    <div class="row">
      <div class="col-12 col-md-6">
        <h2 class="mb-5">Create Post :</h2>
        <FormView @formData="submitHandler" />
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import Swal from 'sweetalert2';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import FormView from './FormView.vue';



    // const form = reactive({
    //   title: ''
    //   , body: ""
    //   , statusBody: ""
    //   , statusTitle: ""
    // })
    const isLoading = ref(false)
    const router = useRouter()
    console.log(router);
    


    const submitHandler = (form) => {

      axios
        .post('https://jsonplaceholder.typicode.com/posts', {
          title: form.title,
          body: form.body,
          userId: 1
        })
        .then((res) => {
          console.log(res);
          isLoading.value = false
          Swal.fire({
            title: "Thanks",
            text: "Post created successfully ",
            icon: "success"
          });
          router.push("/posts")
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Something went wrong!",
            text: " try again later",
            
          });
          isLoading.value = false
        })
    }

 
</script>

<style></style>