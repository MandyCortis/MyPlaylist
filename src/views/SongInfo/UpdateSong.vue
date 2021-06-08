<template>
<div class="container">
    <h2 class="headerText">Update Song</h2>
    <form @submit.prevent="submitForm">
        <div class="form-group row">
            <label for="title" class="col-md-1 col-form-label">Title</label>
            <div class="col-sm-6">
              <input @blur="$v.title.$touch()" id="title" class="form-control" type="text" v-model.trim="title"/>
              <div v-if="$v.title.$error">
                <div v-for="(error, index) of $v.title.$errors" :key="index">
                    <div class="text-danger">{{ error.$message }}</div>
                </div>
              </div>
            </div>
        </div>
        <div class="form-group row">
            <label for="artist" class="col-md-1 col-form-label">Artist</label>
            <div class="col-sm-6">
              <input @blur="$v.artist.$touch()" id="artist" class="form-control" type="text" v-model.trim="artist"/>
              <div v-if="$v.artist.$error">
              <div v-for="(error, index) of $v.artist.$errors" :key="index">
                  <div class="text-danger">{{ error.$message }}</div>
              </div>
            </div>
            </div>
        </div>
        <div class="form-group row">
            <label for="album" class="col-md-1 col-form-label">Album</label>
            <div class="col-sm-6">
              <input @blur="$v.album.$touch()" id="album" class="form-control" type="text" v-model.trim="album"/>
              <div v-if="$v.album.$error">
              <div v-for="(error, index) of $v.album.$errors" :key="index">
                  <div class="text-danger">{{ error.$message }}</div>
              </div>
            </div>
            </div>
        </div>
        <div class="form-group row">
            <label for="year" class="col-md-1 col-form-label">Year</label>
            <div class="col-sm-6">
              <input @blur="$v.year.$touch()" id="year" class="form-control" type="text" v-model.trim="year"/>
              <div v-if="$v.year.$error">
              <div v-for="(error, index) of $v.year.$errors" :key="index">
                  <div class="text-danger">{{ error.$message }}</div>
              </div>
            </div>
            </div>
        </div>
        <div class="form-group row">
            <label for="genre" class="col-md-1 col-form-label">Genre</label>
            <div class="col-sm-6">
              <select @blur="$v.genre.$touch()" id="genre" name="genre" class="form-control" v-model.trim="genre">
                <option value=""></option>
                <option value="blues">Blues</option>
                <option value="classical">Classical</option>
                <option value="country">Country</option>
                <option value="electronic">Electronic</option>
                <option value="folk">Folk</option>
                <option value="hiphop">Hip-Hop</option>
                <option value="jazz">Jazz</option>
                <option value="newage">New age</option>
                <option value="raggea">Reggae</option>
                <option value="rock">Rock</option>
              </select>
              <div v-if="$v.genre.$error">
              <div v-for="(error, index) of $v.genre.$errors" :key="index">
                  <div class="text-danger">{{ error.$message }}</div>
              </div>
            </div>
            </div>
        </div>
        
        <div class="form-group col-md-6">   
          <button @click="back" type="button" class="btn btn-secondary">Back</button>
          <button type="submit" :disabled="$v.$invalid" id="save" class="btn btn-success">Save</button> 
        </div>
  </form>
</div>
</template>

<script>
import { required, minLength, maxLength, numeric } from '@vuelidate/validators'

export default {
  data() {
    return {
      id: '',
      title: '',
      artist: '',
      album: '',
      year: '',
      genre: ''      
    };
  },
  
  validations(){
    return{
      title:{required},
      artist:{required},
      album:{required},
      year:{required, numeric, minLength: minLength(4), maxLength: maxLength(4)},
      genre:{required}
    }
  },
  computed: {
    yearSuccess: function () {
      return this.year.length > 4 || this.year.length > 0 && this.year.length < 4
    }
  },
  inject: ['GStore'],
  methods: {
    back(){
      this.$router.back();
    },
    async submitForm() 
    {
      const id = this.$route.params.id;
      try
      {
        this.GStore.flashMessage = 'Song ' + this.title + ' has been updated'

        this.$router.push({
          name: 'DisplayData',
        })  
        const response = await fetch('https://myplaylist-mandycortis-default-rtdb.europe-west1.firebasedatabase.app/Songs/' + id + '.json',{
          method: 'PATCH',
          headers:
          {
            'Content-Type':'application/json'
          },
          body: JSON.stringify({
              id: this.id,
              title: this.title,
              artist: this.artist,
              album: this.album,
              year: this.year,
              genre: this.genre
          })
        })
        if(!response.ok){
        console.log("Something went wrong");
        }
      }
      catch(error)
      {
          console.log(error);
      }
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
  //lifecycle hook which is called before component is shown on the screen but all data is available
  created(){
      if(typeof this.$route.params.id !== 'undefined')
      {
          const songId = this.$route.params.id;
          this.updateMode = true;
          //if no id user will add a member. If there is an id user will update so we need to populate form with data
          if(songId!=='')
          {
              this.getData();
          }
      }
  }
};
</script>

<style scoped>
.container
{
    padding-top: 20px;
}

.text-danger
{
    position: relative;
    padding: 10px;
    left: 190px;
}

.headerText
{
    padding: 10px;
    text-align: center;
    color: #ffffff;
    font-weight: bold;
}

form {
  display: inline-block;
  max-width: 40rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 50px;
  background-color: #ffffff;
  margin-left: 22%;
}


label {
    float: left;
    font-weight: bolder;
    width: 500px;
    color: black; 
}

.form-control
{
    position: relative;
    left: 135px;
}


button {
  font: inherit;
  border: 1px solid #0076bb;
  background-color: #0076bb;
  color: white;
  cursor: pointer;
  padding: 0.75rem 2rem;
  border-radius: 30px;
  text-align: center;
  align-content: center;
  margin-left: 14rem ;
}

#back
{
    position: relative;
    right: 100px;
}

#submit
{
    position: relative;
    left: 50px;
    bottom: 49px;
}

button:hover,
button:active {
  border-color: #002350;
  background-color: #002350;
}
</style>