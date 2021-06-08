<template>
  <div class="tasks">
    <div class="card align-items-center" style="width: 70rem;">
      <table class="table-responsive">
        <table class="table">
          <thead>
            <router-link class="task-link" :to="{name: 'AddSong'}"><button type="button" id="add" class="btn btn-primary">AddSong</button></router-link>
            <tr class="tr">
              <th scope="col">Title</th>
              <th scope="col">Artist</th>
            </tr>
          </thead>
          <tbody>
            <div v-if="results.length">
              <tr v-for="res in results" :key="res.id">
                <li class="list-group-item">
                  <router-link class="task-link" :to="{name: 'ViewSong', params:{id: res.id}}">
                    <td class="left">{{res.title}}</td>
                    <td class="right">{{res.artist}}</td>
                  </router-link><br><br>
                  <router-link class="task-link" :to="{name: 'DeleteSong', params:{id: res.id}}">
                    <button type="button" id="deleteLocal" class="btn btn-danger"><i class="bi bi-trash-fill"></i>Delete</button>
                  </router-link>
                  <router-link class="task-link" :to="{name: 'UpdateSong', params:{id: res.id}}">
                    <button type="button" class="btn btn-success">Update</button>
                  </router-link>
                </li>
              </tr>
            </div>
            <div v-else-if="!results.length">
              No songs in my playlist yet
            </div>
          </tbody>
        </table>
      </table>
      <div class="back">
        <button @click="back" type="button" class="btn btn-secondary">
          Back
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      results: []
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    updateSong(member) {
      const id = member.id;
      this.$router.push('/updateSong/' + id);
    },
    async getData () {
      try {
        const response = await fetch('https://myplaylist-mandycortis-default-rtdb.europe-west1.firebasedatabase.app/Songs.json', 
          { 
            method: 'GET' 
          }
        );
        const responseData = await response.json()
        if (!response.ok) {
          console.log('Something went wrong')
        }
        console.log(responseData)
        const results = []
        for (const id in responseData) {
          results.push({
            id: id,
            title: responseData[id].title,
            artist: responseData[id].artist
          });
          this.results = results
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  // when component is fully initialised call method
  mounted () {
    this.getData()
  }
}
</script>

<style scoped>
.tasks {
  padding: 5%;
}

.card {
  border-radius: 2%;
  display: flex;
  padding: 2%;
  margin:auto;
  background-color: #9b026894;
  color: white;
}

.tr {
  color: white;
  font-size: 1.5em;
}

.pagination{
  display: flex;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: white
}

#prev {
  padding: 1%;
  text-align: left;
}

#next {
  padding: 1%;
  text-align: right;
}

.task-link {
  color: white;
  font-size: 1.2em;
  margin-right:5%;
}

.list-group-item:hover {
  border-radius: 20px;
  transform:scale(1);
  padding-bottom: 15%;
  padding-right: 15%;
  margin-left: 58%;
  box-shadow: 10px 5px 10px 0;
  color:rgb(50, 0, 70);
}

.list-group-item {
  width: 150%;
  padding-bottom: 15%;
  padding-right: 15%;
  margin-left: 60%;
  font-size: 1.2em;
  background-size: 90%;
  background-repeat: no-repeat;
  background-blend-mode: overlay;
  background-color: rgba(37, 35, 1, 0.4);
}

table.table {
  width:60%; 
  margin-left:15%;
}

 table tr td.left{
   color: yellow;
 }
</style>
