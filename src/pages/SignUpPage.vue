<script>
import axios from 'axios'

export default {
  name: 'SignUpPage',
  data () {
    return {
      disabled: false,
      username: '',
      email: '',
      password: '',
      passwordRepeat: '',
      apiProgress: false
    }
  },
  methods: {
    submit() {
      this.disabled = true
      this.apiProgress = true
      axios.post('/api/1.0/users', {
        username: this.username,
        email: this.email,
        password: this.password,
      })
      // const requestBody = {
      //   username: this.username,
      //   email: this.email,
      //   password: this.password
      // }

      // fetch('localhost:8090/api/1.0/users', {
      //   method: 'POST',
      //   body: JSON.stringify(requestBody),
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // })
    }
  },
  computed: {
    isDisabled () {
      return (this.password && this.passwordRepeat) 
      ? this.password !== this.passwordRepeat 
      : true
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3 pt-5 pb-5">
        <h1 class="text-center">Sign Up</h1>
        <form>
          <label for="username" class="form-label">Username</label>          
          <input 
          v-model="username"
          id="username" name="username" class="form-control mb-3" />
          
          <label for="e-mail" class="form-label">E-mail</label>
          <input 
          v-model="email"
          id="e-mail" name="emai" class="form-control mb-3" />

          <label for="password" class="form-label">Password</label>
          <input 
          class="form-control mb-3"
          v-model="password"
          id="password" name="password" type="password" />
          
          <label for="password-repeat" class="form-label">Password repeat</label>
          <input 
          class="form-control mb-3"
          v-model="passwordRepeat"
          name="passowrdRepeat"
          id="password-repeat" type="password" />
          
          <button 
          type="submit"
          class="btn btn-primary w-100"
          @click.prevent="submit"
          :disabled="isDisabled || disabled">
            <span 
            v-if="apiProgress"
            class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Sign Up
          </button>
        </form>
      </div>
    </div>    
  </div>  
</template>

<style scoped> 
</style>