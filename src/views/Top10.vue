<template>
  <div class="tasks">
    <div class="card" style="width: 24rem;">
      <div class="card-header"><b>Top 10</b></div>
      <transition-group
        tag="ul"
        appear
        name="slide-up"
        class="list-group list-group-flush"
      >
        <Top10Card v-for="task in tasks" :key="task.name" :task="task" />
      </transition-group>
    </div>
    <div class="form-group col-md-6">
      <button @click="back" type="button" class="btn btn-secondary">
        Back
      </button>
    </div>
  </div>
</template>

<script>
import Top10Card from '@/components/Top10Card.vue';
import SongAPI from '@/services/SongAPI.js';

export default {
  name: 'Top10',
  data() {
    return {
      tasks: null,
      lessTasks: null,
      totalTasks: 0
    };
  },

  methods: {
    back() {
      this.$router.back();
    }
  },

  created() {
    SongAPI.getTasks()
      .then(response => {
        this.tasks = response.data;
        this.totalTasks = Object.keys(this.tasks).length;
      })
      .catch(error => {
        console.log(error);
      });
  },

  components: {
    Top10Card
  }
};
</script>

<style scoped>
.card {
  margin: auto;
}
.card-header {
  font-size: 2em;
}
</style>
