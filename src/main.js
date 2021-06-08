import { createApp, reactive } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import firebase from 'firebase'
import '@/assets/main.css'
import { VuelidatePlugin } from '@vuelidate/core'


const firebaseConfig = {
  apiKey: "AIzaSyDNBbkb4wKg3NkkoaNu7JDLyiFTu4iOeNM",
  authDomain: "myplaylist-mandycortis.firebaseapp.com",
  projectId: "myplaylist-mandycortis",
  storageBucket: "myplaylist-mandycortis.appspot.com",
  messagingSenderId: "450116822276",
  appId: "1:450116822276:web:78a56cc797041eab295c51",
  measurementId: "G-XV0ENX5EJD"
};

firebase.initializeApp(firebaseConfig);

const GStore = reactive({ flashMessage: '' })

createApp(App)
  .use(store)
  .use(router)
  .use(VuelidatePlugin)
  .provide('GStore', GStore)
  .mount('#app')