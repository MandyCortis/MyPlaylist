<template>
<div v-if="!isAuth">
    <router-link class="task-link" :to="{name: 'Login'}">Log In</router-link>
    <router-link class="task-link" :to="{name: 'Signup'}">Sign Up</router-link>
  </div>
  <div v-if="isAuth">
    <router-link class="task-link" @click="logout" :to="{name: 'Login'}">Log Out</router-link>
    <p><b>Welcome {{ user.displayName.substring(0,1).toUpperCase() }} </b></p>
  </div>
  <div id="nav">
    <base-container title="Vuex" v-if="isAuth">
      <router-link :to="{name: 'DisplayData'}">My Playlist</router-link> |
    </base-container>

    <router-link :to="{name: 'Top10'}">Top 10</router-link>
  </div>

  <router-view v-slot="{ Component }">
    <transition name="slide-fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
import index from './store/index.js'
import firebase from 'firebase';

export default {
  components: {
    index
  },
  data() {
    return {
      user: null
    };
  },
  methods: {
    logout () {
      this.$store.dispatch('setAuth', false)
    },
    initial(){
      return this.user.displayName.substring(0)
    }

  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
        this.$store.dispatch('setAuth', false);
      }
    });
  },
  computed: {
    isAuth () {
      return this.$store.getters.userIsAuthenticated
    },
    getName(){
      console.log(this.$store.getters.getName)
      return this.$store.getters.getName
    },
    getUserID(){
      return this.$store.getters.getId
    }
  }
}
</script>

<style>
#app {
  width:100%;
  margin:auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  background-image: url("https://effectiviology.com/wp-content/uploads/The-Benefits-of-Music-and-Background-Noise.jpg"), linear-gradient(180deg, rgba(255,150,0,255) 0%, rgba(255,200,1,255) 100%);
  background-repeat: no-repeat;
  background-position: center, center;
  background-attachment: fixed;
  background-size: 100%
}

p{
  font-size:1.5em;
  float:right;
  padding-right:15px;
  color:white;
}

.task-link {
  font-size: 1.3em;
  position: relative;
  padding-right: 30px;
  float: right;
  font-weight: bold;
  color: #7fa3c7;
}

#nav {
  background-color: #310047;
  width: 100%;
  padding: 35px 0 35px 0;
  font-size: 1.5em;
}

#nav a {
  font-weight: bold;
  color:white;
}

#nav a.router-link-exact-active {
  color: yellow;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 1s ease-in-out;
}

.fade-leave-active {
  transition: opacity 1s ease-in-out;
}

/* SLIDE-FADE TRANSITION */

.slide-fade-leave-to {
  transform: translateX(150px);
  opacity: 0;
}

.slide-fade-enter-from{
  transform: translateX(-150px);
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 1s ease;
}

.slide-up-enter-from{
  transform: translateY(10px);
  opacity: 0;
}

.slide-up-enter-active {
  transition: all 1s ease;
}

</style>
