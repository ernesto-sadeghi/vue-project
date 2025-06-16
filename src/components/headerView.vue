<template>
  <nav class="navbar shadow sticky-top navbar-expand-lg p-0 bg-body-tertiary">
  <div class="container-fluid pt-2">
    <router-link class="navbar-brand ms-3 pb-0 " to="/"><img src="../assets/logo.png" alt="vue"> <span class="fs-3  fw-bold ">Ernesto</span></router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse flex-row-reverse" id="navbarSupportedContent">
      <ul class="navbar-nav pe-5 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link " aria-current="page" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/posts">posts</router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/users">Users</router-link>
        </li>
      
        
      </ul>
     
    </div>
  </div>
</nav>
</template>

<script>
export default {
  name:"HeaderView"
}
</script>

<style scoped>
img {
  height: 3rem;
  width: 3rem;
}
.navbar-brand{
  transition: 0.5s ease-in-out;
  color: #41b883;
}
.navbar-brand span{
  transition: 0.5s ease-out;

}
.router-link-active span{
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