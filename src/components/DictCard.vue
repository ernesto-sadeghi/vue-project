<template>
    <div class="card dino-card mt-5">
        <div class="card-header">
            <div class="d-flex justify-content-between align-items-start">
                <div>
                    <h1 class="word-title mb-3">{{ props.word }}</h1>
                    <span class="pos-badge my-5">{{ props.data.partOfSpeech }}</span>
                </div>
                <div class="pronunciation">
                    <a @click.prevent="playAudio" href="#" class="bi bi-volume-up-fill px-4 fs-3"></a>
                    <span>/{{ props.phonetic }}/</span>
                </div>
            </div>
        </div>
        <div class="card-body">
            <h5 class="meaning-title">
                <i class="bi bi-bookmark-check"></i> Meaning
            </h5>
            <p class="meaning-text">
                {{ props.data.definitions[0].definition }}
            </p>

            <div v-if="props.data.synonyms.length > 0" class="synonyms-section">
                <h5 class="meaning-title">
                    <i class="bi bi-tags"></i> synonyms :
                </h5>
                <div>
                    <span v-for="synom, index in props.data.synonyms" class="synonym-badge" :key="index">{{ synom
                        }}</span>
                    <!-- <span class="synonym-badge">Theropod</span>
                        <span class="synonym-badge">Raptor</span>
                        <span class="synonym-badge">Carnivore</span> -->
                </div>
            </div>
            <div v-if="props.data.antonyms.length > 0" class="synonyms-section">
                <h5 class="meaning-title">
                    <i class="bi bi-tags"></i> antonyms :
                </h5>
                <div>
                    <span v-for="ant, index in props.data.antonyms" class="antonym-badge" :key="index">{{ ant }}</span>
                    <!-- <span class="synonym-badge">Theropod</span>
                        <span class="synonym-badge">Raptor</span>
                        <span class="synonym-badge">Carnivore</span> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref , defineProps} from 'vue';


 const props = defineProps({
        data: Object,
        word: String,
        phonetic: String,
        audio: String
})
   
        const audioPlayer = ref(null);

        const playAudio = () => {
            if (!props.audio) return;

            // Create audio element if it doesn't exist
            if (!audioPlayer.value) {
                audioPlayer.value = new Audio(props.audio);
            } else {
                // If it exists, reset it to play from start
                audioPlayer.value.currentTime = 0;
            }

            audioPlayer.value.play().catch(e => {
                console.error("Audio playback failed:", e);
                // You might want to show a user-friendly message here
            });
        };

       
    

</script>

<style scoped>
:root {
    --dino-primary: #41b883;
    --dino-primary-light: rgba(65, 184, 131, 0.1);
    --dino-dark: #2d8b5f;
}

body {
    font-family: 'Inter', -apple-system, sans-serif;
    background-color: #f9f9f9;
    padding: 2rem 0;
}
.pronunciation a{
    color: white;
    transition: 0.3s ease;
}
.pronunciation a:hover{
    transition: 0.3s ease;
    color: #a8dec6;

}
.dino-card {
    border: none;
    border-radius: 12px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.05);
    margin-bottom: 1.5rem;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.dino-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.08);
}

.card-header {
    background-color: #41b883;
    color: white;
    padding: 1rem 1.5rem;
    border-bottom: none;
}

.word-title {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
}

.pos-badge {
    background-color: white;
    color: #2d8b5f;
    font-weight: 500;
    padding: 0.35rem 0.75rem;
    border-radius: 50px;
    font-size: 0.8rem;
    text-transform: uppercase;
}

.pronunciation {
    display: flex;
    align-items: center;
    color: rgba(255, 255, 255, 0.9);
    margin-top: 0.5rem;
}

.pronunciation i {
    margin-right: 0.5rem;
    cursor: pointer;
    transition: transform 0.2s ease;
}

.pronunciation i:hover {
    transform: scale(1.1);
}

.card-body {
    padding: 1.5rem;
}

.meaning-title {
    color: var(--dino-primary);
    font-weight: 500;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
}

.meaning-title i {
    margin-right: 0.5rem;
}

.meaning-text {
    line-height: 1.7;
    color: #444;
}
.dark-mode .meaning-text {
    line-height: 1.7;
    color: #eee;
}

.synonyms-section {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px dashed #eee;
}

.synonym-badge {
    background-color: #a8dec6;
    color: var(--dino-dark);
    padding: 0.4rem 0.8rem;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    border-radius: 6px;
    display: inline-block;
    transition: all 0.2s ease;
}
.dark-mode .synonym-badge {
    background-color: #41b883;
    
}

.synonym-badge:hover {
    background-color: #41b883;
    color: white;
    transform: translateY(-2px);
}
.dark-mode .synonym-badge:hover {
    background-color: #a8dec6;
    
    
}

.antonym-badge {
    background-color: #dea8a8;
    color: var(--dino-dark);
    padding: 0.4rem 0.8rem;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    border-radius: 6px;
    display: inline-block;
    transition: all 0.2s ease;
}
.dark-mode .antonym-badge {
    background-color: #b84141;
}

.antonym-badge:hover {
    background-color: #b84141;
    color: white;
    transform: translateY(-2px);
}
.dark-mode .antonym-badge:hover {
    background-color: #dea8a8;
    
}

.empty-state {
    text-align: center;
    padding: 3rem;
    color: #888;
}

.empty-state i {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #ddd;
}

</style> 
