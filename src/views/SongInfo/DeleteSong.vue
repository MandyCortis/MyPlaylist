<template>
  <div class="container">
        <h2>Delete Song</h2>
        <div class="text">Title: {{title}}</div>
        <div class="text">Artist: {{artist}}</div>
        <div class="text">Album: {{album}}</div>
        <div class="text">Year: {{year}}</div>
        <div class="text">Genre: {{genre}}</div>

        <h2>Song will be deleted from playlist. Confirm?</h2>
        <div class="form-group col-md-6">
            <router-link class="task-link" :to="{name: 'DisplayData'}"><button type="button" id="back" class="btn btn-secondary">No</button></router-link>
            <button data-toggle="modal" data-target="#myModal" @click="deleteRecord" type="button" id="delete" class="btn btn-danger">Yes</button> 
        </div>
  </div>
 
</template>

<script>
export default {
  data() {
    return {
      title: '',
      artist: '',
      album: '',
      year: '',
      genre: '',
    };
  },
  inject: ['GStore'],
  methods: {     
    async deleteRecord() {
        const id = this.$route.params.id;
        try
        {
          this.GStore.flashMessage = 'Song  ' + this.title + ' has been deleted'

          this.$router.push({
          name: 'DisplayData',
          params: { id: 0}
          })
            return fetch('https://myplaylist-mandycortis-default-rtdb.europe-west1.firebasedatabase.app/Songs/' + id + '.json',{
                method: 'DELETE'
            }).then(response => response.json)
        }
        catch(error)
        {
            console.log(error);
        }
    },  
    async getData() {
      console.log("Getting data");
      const id = this.$route.params.id;
      try {
        const response = await fetch('https://myplaylist-mandycortis-default-rtdb.europe-west1.firebasedatabase.app/Songs/' + id + '.json', {
          method: 'GET'
        })
        const responseData = await response.json();
        if (!response.ok) {
          console.log("Something went wrong")
        }

        this.id = id,
        this.title = responseData.title,
        this.artist = responseData.artist,
        this.album = responseData.album,
        this.year = responseData.year,
        this.genre = responseData.genre
      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted() {
    this.getData();
  },
};

</script>

<style scoped>

#back
{
    position: relative;
    left: 120px;
    top: 30px;
}

#delete
{
    position: relative;
    left: 150px;
    top: 30px;
}

.container
{
    position: relative;
    top: 50px;
    display: inline-block;
    max-width: 40rem;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    padding: 50px;
    background-color: #ffffff;
    margin-left: 35%;
    text-align: center;
}

h2
{
  color: black;
}

.text
{
    padding: 10px;
    color: black;
}
</style>