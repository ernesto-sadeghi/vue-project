<template>
    <div>

        <div class="container dino-container m-auto">
            <div class="dino-input">
                <div class="dino-icon">🦖</div>
                <input @keypress="inputHandler" v-model.trim="word" type="text" placeholder="Search ..." autofocus>
            </div>
            
            <div v-show="error" class="text-danger mt-1">{{ error }}</div>
            <div v-if="loading" class="spinner-border text-success m-5" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <div v-else class="container">
                
                <DictCard  v-for="data, index in datas.meanings" :key="index" :data="data" :word="exactWord"
                :phonetic="phonetic" :audio="audio" />
                
            </div>
        </div>
        <footer class="mt-5 pt-5 d-flex justify-content-center">
            <p class="mt-5 pt-5">this web is made by <a href="https://github.com/ernesto-sadeghi">Ernesto.vue</a></p>
        </footer>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import DictCard from './DictCard.vue';
import axios from 'axios';


    const word = ref("")
    const phonetic = ref("")
    const exactWord = ref("")
    const audio = ref("")
    const datas = ref({})
    const loading = ref(false)
    const error = ref("")

    const inputHandler = async (e) => {
      if (e.key !== "Enter" || !word.value.trim()) return;

      loading.value = true;
      error.value = null;
      audio.value = "";  // Reset audio before new search
      datas.value = {};  // Also good to reset previous data

      try {
        const response = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${word.value}`
        );

        const firstEntry = response.data[0];

        exactWord.value = firstEntry.word;
        phonetic.value = firstEntry.phonetic || "";

        // Find the first audio URL that exists
        const phoneticsWithAudio = firstEntry.phonetics?.find(p => p.audio);
        audio.value = phoneticsWithAudio?.audio || "";

        datas.value = firstEntry;
      } catch (err) {
        console.error("API error:", err);
        error.value = err.response?.data?.message || "Word not found";
        datas.value = {};
      } finally {
        loading.value = false;
      }
    };


</script>

<style scoped>
:root {
  --dino-primary: #41b883;
  --dino-primary-light: rgba(65, 184, 131, 0.2);
  --text-dark: #222;
  --text-light: #777;
}

body {
  font-family: 'Inter', -apple-system, sans-serif;
  background-color: #fefefe;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  padding: 2rem;
  background-image: radial-gradient(circle at 1px 1px, #f0f0f0 1px, transparent 0);
  background-size: 20px 20px;
}
footer a{
color: #41b883;
}
.dino-container {
  width: 100%;
  max-width: 580px;
  position: relative;
}

.dino-input {
  position: relative;
  padding-bottom: 6px;
  border-bottom: 3px solid #e0e0e0;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.dino-input:focus-within {
  border-bottom-color: var(--dino-primary);
  transform: translateY(-2px);
}

.dino-input:focus-within::after {
  border-bottom: 3px solid #41b883;
  transform: scaleX(1);
  opacity: 1;
}

.dino-input::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--dino-primary);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1),
    opacity 0.3s ease;
  opacity: 0;
}

.dino-input input {
  width: 100%;
  border: none;
  background: transparent;
  font-size: clamp(1.8rem, 5vw, 2.5rem);
  padding: 0.8rem 1rem 0.8rem 3rem;
  outline: none;
  color: var(--text-dark);
  font-weight: 300;
  letter-spacing: -0.5px;
  transition: all 0.3s ease;
}

.dino-input input::placeholder {
  color: var(--text-light);
  transition: all 0.3s ease;
}

.dino-input:focus-within input::placeholder {
  opacity: 0.2;
}

.dino-icon {
  position: absolute;
  left: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.6rem;
  color: var(--dino-primary);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.dino-input:focus-within .dino-icon {
  transform: translateY(-50%) scale(1.2);
  animation: dinoPulse 2s infinite;
}

@keyframes dinoPulse {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.7;
  }

  100% {
    opacity: 1;
  }
}

.dino-input:hover {
  border-bottom-color: #41b883;
}
</style>