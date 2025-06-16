<template>
    <div>

        <div class="container_fluid d-flex flex-column ">
            <h1 class="ps-4 ps-md-0 pb-4 ps-md-4">Posts :</h1>
            <div class="col-12 col-sm-6 col-md-4 p-4">
                <router-link to="/posts/createPost" class="btn btn-dark ">Create Post </router-link>

            </div>
        </div>
        <div class="d-flex justify-content-center">
            <div v-show="!isLoad" class="m-auto spinner-border text-success" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div v-show="isLoad" class="row g-3">
            <div v-for="post in allPosts" :key="post.id" class=" col-md-4 col-sm-6">
                <div class="card m-auto" style="width: 90%;">
                    <div class="card-header">
                        <router-link :to="{ name: 'ShowPost', params: { postId: post.id } }">
                            {{ post.title }}

                        </router-link>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">{{ post.body }}</li>

                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';





    const allPosts = ref([]);
    const isLoad = ref(false);


    const getUsers = () => {
        isLoad.value = false;
        axios
            .get("https://jsonplaceholder.typicode.com/posts")
            .then((res) => {
                allPosts.value = res.data;
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