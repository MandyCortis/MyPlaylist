<template>
      <ul class="list-group list-group-flush">
        <li class="list-group-item"><b>{{TITLE()}}  <b>{{type()}}</b></b></li>
       </ul>
</template>

<script>
export default {
  name: 'Top10 Card',

  props: {
    task: Object
  },

  methods:{
    TITLE(){
      return this.task.title.toUpperCase()
    },
    type(){
      return this.task.artists[0].alias.toLowerCase()
    }
  }
}
</script>

<style scoped>

.task-link{
  text-decoration:none;
  color: #2c3e50
}

.list-group-item:hover{
  transform:scale(1.01);
  box-shadow: 0 3px 12px 0;
  margin: 5px;
}
</style>