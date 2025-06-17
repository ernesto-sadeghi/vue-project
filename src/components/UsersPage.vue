<template>
  <div>

    <div class="container_fluid d-flex justify-content-start">
      <h1 class="ps-4 ">users :</h1>
    </div>
    <div class="d-flex justify-content-center">
      <div v-show="!isLoad" class="m-auto spinner-border text-success" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-show="isLoad" class="row g-3">
      <div v-for="user in allUsers" :key="user.id" class="col-lg-3 col-md-4 col-sm-6">
        <CardView :user="user" />
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';

import CardView from '@/components/CardView';

    const allUsers = ref([]);
    const isLoad = ref(false);


    const getUsers = () => {
      isLoad.value = false;
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((res) => {
          allUsers.value = res.data;
          isLoad.value = true;
        })
        .catch((err) => {
          isLoad.value = false;
          console.log(err);
        });
    };
    getUsers()


</script>

<style></style>