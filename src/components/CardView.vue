<template>
  <div class="card m-auto" style="width: 90%;">
    <div class="card-header">
    <router-link :to="{name:'ShowUser', params:{ id : user.id} }" >
      {{ user.name }}
    </router-link> 
    </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">UserName : {{ user.username }}</li>
    <li class="list-group-item">Email :{{ user.email }}</li>
    <li class="list-group-item">Phone :{{ user.phone }}</li>
  </ul>
</div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps(["user"])
</script>

<style>
  .card{
    transition: 0.3s ease-in-out;

  }
.card:hover{
  transition: 0.3s ease-in-out;
box-shadow: 2px 2px 10px 1px rgba(211, 209, 209, 0.481);
}
</style>