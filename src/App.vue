<template>
    <div>

        <Header-view class="mb-5"></Header-view>
        <router-view></router-view>
    </div>
</template>

<script>
import HeaderView from './components/headerView.vue';

export default {
    name: "App",
    components: { HeaderView },

}
</script>

<style></style>

