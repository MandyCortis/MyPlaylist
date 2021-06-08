<template>
    <div class="container">
      <div class="vue-template">
        <form @submit.prevent="userLogin">
            <h3>Sign In</h3>

            <div class="form-group">
                <label>Email address</label>
                <input type="email" class="form-control form-control-lg" v-model="user.email" />
            </div>

            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control form-control-lg" v-model="user.password" />
            </div>

            <button type="submit" class="btn btn-dark btn-lg btn-block">Sign In</button>
        </form>
      </div>
    </div>
</template>


<script>
import firebase from "firebase";

export default {
  data() {
    return {
      user: {   
        email: '',
        password: '',
        name: '',
      }
    };
  },
  methods: {
    userLogin() {
        firebase
        .auth()
        .signInWithEmailAndPassword(this.user.email, this.user.password)
        .then(() => {
            this.$router.push('/displayData')
            this.$store.dispatch('setAuth', true)
            this.$store.dispatch('setName', this.user.name)
            console.log("logged in")
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  }
};
</script>

<style scoped>
.vue-template{
  margin-top: 5%;
  background-color: rgba(93, 75, 117, 0.6);
}
</style>