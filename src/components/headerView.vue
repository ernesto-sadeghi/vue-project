<template>
  <nav class="navbar shadow sticky-top navbar-expand-lg p-0" :class="darkMode ? 'bg-dark' : 'bg-body-tertiary'">
    <div class="container-fluid pt-2">
      <router-link class="navbar-brand ms-3 pb-0" to="/">
        <img src="../assets/logo.png" alt="vue"> 
        <span class="fs-3 fw-bold" :class="darkMode ? 'text-light' : ''">Ernesto</span>
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon" :class="darkMode ? 'navbar-dark' : ''"></span>
      </button>
      <div class="collapse navbar-collapse flex-row-reverse" id="navbarSupportedContent">
        <ul class="navbar-nav pe-5 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" :class="darkMode ? 'text-light' : ''" aria-current="page" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :class="darkMode ? 'text-light' : ''" to="/posts">Posts</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :class="darkMode ? 'text-light' : ''" to="/users">Users</router-link>
          </li>
          <li class="nav-item">
            <label class="switch">
              <input @click="toggleDarkMode" v-model="darkMode" class="switch__input" type="checkbox">
              <span class="switch__slider"></span>
            </label>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

// Initialize darkMode from localStorage or prefer-color-scheme
const darkMode = ref(false);

// Check for saved preference or system preference
onMounted(() => {
  const savedMode = localStorage.getItem('darkMode');
  if (savedMode !== null) {
    darkMode.value = savedMode === 'true';
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    darkMode.value = prefersDark;
  }
  applyDarkMode();
});


watch(darkMode, (newVal) => {
  localStorage.setItem('darkMode', newVal);
  applyDarkMode();
});

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value;
};

const applyDarkMode = () => {
  if (darkMode.value) {
    document.documentElement.setAttribute('data-bs-theme', 'dark');
    document.body.classList.add('dark-mode');
  } else {
    document.documentElement.removeAttribute('data-bs-theme');
    document.body.classList.remove('dark-mode');
  }
};
</script>

<style >

.dark-mode {
  background-color: #121212;
  color: #ffffff;
}


.switch__input:checked + .switch__slider {
  background: #41b883;
}

.router-link-active::after {
  background-color: #41b883;
}

.navbar-brand span {
  color: #41b883;
}

.switch {
  position: relative;
  display: inline-block;

  width: 3.8rem;
  height: 2rem;
}

.switch__input {
  opacity: 0;
  width: 0;
  height: 0;

}

.switch__slider {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: #aaa 1px solid;
  background: #41b883;
  border-radius: 1rem;

  transition: background 0.2s;
  cursor: pointer;
}

.switch__slider::before {
  content: "";

  position: absolute;
  left: 0.2rem;
  top: 50%;
  transform: translateY(-50%);

  height: 1.6rem;
  width: 1.6rem;
  border-radius: 1.6rem;

  background-color:#ffffff;
  transition: transform 0.2s, width 0.2s, background 0.2s;
}

.switch__input:checked + .switch__slider {
  background: #aaa;
}

.switch__input:not(:checked):active + .switch__slider::before {
  width: 2.4rem;
}

.switch__input:checked:active + .switch__slider::before {
  transform: translate(1rem, -50%);
  width: 2.4rem;
}

.switch__input:checked + .switch__slider::before {
  transform: translate(1.8rem, -50%);
}

img {
  height: 3rem;
  width: 3rem;
}

.navbar-brand {
  transition: 0.5s ease-in-out;
  color: #41b883;
}

.navbar-brand span {
  transition: 0.5s ease-out;

}

.router-link-active span {
  transition: 0.5s ease-in-out;
  text-shadow: 2px 2px 10px #41b883;
}

.nav-link {
  position: relative;
  padding: 0.5rem 0;
  margin: 0 1rem;
  color: #000;
  text-decoration: none;
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 3px;
  bottom: 0;
  left: 0;
  background-color: black;
  transition: width 0.3s ease;
}


.router-link-active::after {
  width: 100%;
  background-color: #41b883;
}

.router-link-active {
  border-bottom: none !important;
}


.router-link-exact-active {
  font-weight: bold;
}

@media (max-width: 991.98px) {
  .navbar-nav {
    padding: 1rem 0;
  }

  .nav-link {
    margin: 0.5rem 0;
  }
}
</style>