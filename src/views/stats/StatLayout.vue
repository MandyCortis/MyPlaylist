<template>
  <div v-if="stat" class="task-details">
    <p>Title: {{stat.title}}</p>
    <p>Artist: {{stat.artists[0].alias}}</p>

    <router-view :stat="stat" v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
  </div>
</template>

<script>
import SongAPI from '@/services/SongAPI.js'
export default {
  props: ['id'],
  data () {
    return {
      stat: null
    }
  },
  created () {
    SongAPI.getTasks()
      .then(response => {
        this.stat = response.data
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>

<style scoped>
  .task-details{
    border: black 2px solid;
    width:40%;
    margin:15px auto;
    padding:10px;
    color: black;
    background-color: rgba(255, 255, 255, 0.699);
    box-shadow: 0px 0px 10px rgb(82, 82, 82);
  }
</style>