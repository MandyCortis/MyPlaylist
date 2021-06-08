<template>
<div class="container">
    <div class="vue-template">
        <form @submit.prevent="userRegistration">
            <h3>Sign Up</h3>

            <div class="form-group">
              <label>Name</label>
              <input @blur="$v.user.name.$touch()" id="name" type="text" class="form-control form-control-lg" v-model.trim="user.name" v-bind:class="{'alert-color': nameSuccess }" />
              <div v-if="$v.user.name.$error">
                <div v-for="(error, index) of $v.user.name.$errors" :key="index">
                    <div class="text-danger">{{ error.$message }}</div>
                </div>
              </div>
            </div>

            <div class="form-group">
                <label>Email</label>
                <input @blur="$v.user.email.$touch()" type="email" class="form-control form-control-lg" v-model="user.email" />
                <div v-if="$v.user.email.$error">
                <div v-for="(error, index) of $v.user.email.$errors" :key="index">
                    <div class="text-danger">{{ error.$message }}</div>
                </div>
              </div>
            </div>

            <div class="form-group">
                <label>Mobile</label>
                <div class="col-sm-2">
                  <select @blur="$v.user.countrycode.$touch()" id="countrycode" name="countrycode" class="form-control" v-model.number="user.countrycode">
                      <option value=356>MT</option>
                      <option value=826>GB</option>
                      <option value=380>IT</option>
                  </select>
                  </div>
                  <input @blur="$v.user.mobile.$touch()" type="number" class="form-control form-control-lg" v-model="user.mobile" v-bind:class="{'alert-color': mobSuccess }" />
                
                <div v-if="$v.user.mobile.$error">
                <div v-for="(error, index) of $v.user.mobile.$errors" :key="index">
                    <div class="text-danger">{{ error.$message }}</div>
                </div>
              </div>
            </div>

            <div class="form-group">
                <label>Password</label>
                <input @blur="$v.user.password.$touch()" type="password" class="form-control form-control-lg" v-model="user.password" />
                <div v-if="$v.user.password.$error">
                <div v-for="(error, index) of $v.user.password.$errors" :key="index">
                    <div class="text-danger">{{ error.$message }}</div>
                </div>
              </div>
            </div>
            
            <div class="form-group row">
              <button :disabled="$v.$invalid" class="btn btn-dark btn-lg btn-block">
                Sign Up
              </button>
            </div>
        </form>
    </div>
</div>



</template>


<script>
import firebase from 'firebase';
import { required, minLength, maxLength, alpha, numeric, email } from '@vuelidate/validators'

export default {
  data() {
    return {
      user: {
        name: '',
        email: '',
        countrycode: '',
        mobile: '',
        password: ''
      }
    };
  },
  validations() {
    return {
      user: {
        name:{required, minLength: minLength(3), maxLength: maxLength(15), alpha},
        email:{required, email},
        countrycode:{required},
        mobile:{required, numeric, minLength: minLength(8), maxLength: maxLength(8)},
        password:{required, minLength: minLength(6)}
        }
      }
  },
  computed: {
    nameSuccess: function () {
      return this.user.name.length > 15 || this.user.name.length > 0 && this.user.name.length < 3
    },

    mobSuccess: function () {
      return this.user.mobile.length > 8 || this.user.mobile.length > 0 && this.user.mobile.length < 8
    }
  },
  methods: {
    userRegistration() {
      firebase
      .auth()
      .createUserWithEmailAndPassword(this.user.email, this.user.password)
      .then((res) => {
        res.user
          .updateProfile({
            displayName: this.user.name
          })
          .then(() => {
            this.$router.push('/')
          });
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
  margin-top: 2%;
  background-color: rgba(93, 75, 117, 0.6);
}

.alert-color {
  border-color: red;
}
</style>