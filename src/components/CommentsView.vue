<template>
  <div>

    <ul class="list-group pt-5 list-group-flush">
      <li class="list-group-item"><span class="fw-bold">{{ comment.email }}</span> : <p>{{ comment.body }}</p></li>
    </ul>
    <hr>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
 defineProps(['comment'])

</script>

<style>

</style>