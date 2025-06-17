<template>
  <div>

    <div class="container d-flex justify-content-around">
      <h1 class="">user {{ route.params.id }} </h1>
    </div>
    <div class="d-flex justify-content-center">
      <div v-show="!isLoad" class="m-auto spinner-border text-success" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-show="isLoad" class="row mt-5 pt-5 d-flex justify-content-center">
      <div class="col-sm-6">
        <CardView :user="user" />
      </div>
    </div>

    <div class="container d-flex justify-content-center mt-5 p-0  p-md-5">
      <button class="btn btn-success mx-2 fw-light " @click="pre"> Previous</button>
      <button class="btn btn-secondary mx-2 fw-light " @click="all">All users</button>
      <button class="btn btn-success mx-2 fw-light " @click="next">Next </button>
    </div>
  </div>
</template>

<script setup>
import CardView from '@/components/CardView';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';



const route = useRoute();
const router = useRouter();

let user = ref({});
const isLoad = ref(false);
const currentId = ref(Number(route.params.id));

const getUser = async () => {
  isLoad.value = false;
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${route.params.id}`);
    user.value = response.data;
    currentId.value = Number(route.params.id);
    isLoad.value = true;
  } catch (err) {
    console.error(err);
    isLoad.value = false;
    // You might want to handle the error here, like redirecting or showing a message
  }
};

// Watch for route changes to update the user data
watch(() => route.params.id, () => {
  getUser();
});

// Initial fetch
getUser();

const pre = () => {
  const newId = currentId.value > 1 ? currentId.value - 1 : 10;
  router.push({ name: "ShowUser", params: { id: newId } });
};

const all = () => {
  router.push({ name: "users" });
};

const next = () => {
  const newId = currentId.value < 10 ? currentId.value + 1 : 1;
  router.push({ name: "ShowUser", params: { id: newId } });
};



</script>

<style></style>