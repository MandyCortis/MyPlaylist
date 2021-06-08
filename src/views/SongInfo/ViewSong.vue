<template>
  <div class="container">
        <div class="table-responsive">
      <table class="table">
      <thead>
        <tr>
          <th scope="row">Title</th>
          <th scope="row">Artist</th>
          <th scope="row">Album</th>
          <th scope="row">Year</th>
          <th scope="row">Genre</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{title}}</td>
          <td>{{artist}}</td>
          <td>{{album}}</td>
          <td>{{year}}</td>
          <td>{{genre}}</td>
        </tr>
      </tbody> 
    </table>
    </div>
      <div class="form-group col-md-6">
        <button @click="back" type="button" class="btn btn-secondary">Back</button>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: 0,
      title: '',
      artist: '',
      album: '',
      year: '',
      genre: ''
    }
  },
  methods: { 
    back(){
      this.$router.back();
    },

    async getData () {
      const id = this.$route.params.id
      try {
        const response = await fetch('https://myplaylist-mandycortis-default-rtdb.europe-west1.firebasedatabase.app/Songs/' + id + '.json', {
          method: 'GET'
        })
        const responseData = await response.json()
        if (!response.ok) {
          console.log('Something went wrong')
        }
        console.log(responseData)
        this.id = responseData.id-1
        this.title = responseData.title
        this.artist = responseData.artist
        this.album = responseData.album
        this.year = responseData.year
        this.genre = responseData.genre
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style scoped>

#back
{
    position: relative;
    left: 140px;
    top: 30px;
}

.container
{
    position: relative;
    top: 150px;
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
