import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './components/HomePage.vue'
import PostsPage from './components/PostsPage.vue'
import UsersPage from './components/UsersPage.vue'
import ShowPost from './components/ShowPost.vue'
import ShowUser from './components/ShowUser.vue'
import TemplatePost from './components/TemplatePost.vue'
import TemplateUsers from './components/TemplateUsers.vue'
import CreatePost from './components/CreatePost.vue'
import EditPost from './components/EditPost.vue'
const routes = [
    { path: '/', component: HomePage },
    { path: '/posts', component: TemplatePost,children:[
        { path: "", component: PostsPage },
        { path: ":postId", name: "ShowPost", component: ShowPost },
        { path: "createPost", name: "CreatePost", component: CreatePost },
        { path: "edit/:id", name: "EditPost", component: EditPost },
    ] },


    { path: '/users', component: TemplateUsers ,children:[
        { path: '', name: "users", component: UsersPage },
        { path: ':id', name: "ShowUser", component: ShowUser },
    ]},

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router