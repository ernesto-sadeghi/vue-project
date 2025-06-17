<template>
    <form @submit.prevent="ValidateCheck" class="needs-validation" novalidate>

        <div class="mb-3">
            <label for="exampleFormControlInput1" class="fs-4 fw-bold form-label">title : </label>
            <input v-model.trim="form.title" @input="checkChanges" type="text" class="form-control"
                id="exampleFormControlInput1" maxlength="60" placeholder="title" required>
            <div class="text-danger">
                {{ form.statusTitle }}
            </div>
        </div>
        <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="fs-4 fw-bold form-label">body : </label>
            <textarea v-model.trim="form.body" @input="checkChanges" class="form-control"
                id="exampleFormControlTextarea1" placeholder="write somthing ..." rows="7" required></textarea>
            <div class="text-danger">
                {{ form.statusBody }}
            </div>
        </div>

        <button type="submit" class="btn btn-dark mt-3" :disabled="!hasChanges || isLoading">
            Submit
            <div v-show="isLoading" class="spinner-border spinner-border-sm text-light" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </button>

    </form>
</template>

<script setup>
import { reactive, ref,defineEmits,defineProps } from 'vue'

// ✅ Define props & emits at the TOP LEVEL
const props = defineProps({ post: Object })
const emit = defineEmits(['formData']) // Define possible emits

const isLoading = ref(false)
const form = reactive({
    title: '',
    body: "",
    statusBody: "",
    statusTitle: ""
})
const originalData = reactive({
    title: '',
    body: ""
})

const setInput = () => {
    if (props.post) { // Use `props.post` instead of just `post`
        form.title = props.post.title
        form.body = props.post.body
        originalData.title = props.post.title
        originalData.body = props.post.body
    }
}

setInput()

const hasChanges = ref(false)

const checkChanges = () => {
    hasChanges.value = form.title !== originalData.title || form.body !== originalData.body
}

const ValidateCheck = () => {
    let isValid = true

    if (!form.title) {
        form.statusTitle = "Please write at least one word for title."
        isValid = false
    } else {
        form.statusTitle = ""
    }

    if (!form.body) {
        form.statusBody = "Body is required."
        isValid = false
    } else {
        form.statusBody = ""
    }

    if (isValid && hasChanges.value) {
        isLoading.value = true
        emit('formData', form) // ✅ Use the stored `emit` function
    }
}
</script>
