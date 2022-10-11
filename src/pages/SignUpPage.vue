<script>
  export default {
    name: 'SignUpPage',
    data () {
      return {
        password: '',
        passwordRepeat: ''
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
        <h1>Sign Up</h1>
        <form>
          <label for="username" class="form-label">Username</label>
          <input id="username" class="form-control mb-3" />
          <label for="e-mail" class="form-label">E-mail</label>
          <input id="e-mail" class="form-control mb-3" />
          <label for="password" class="form-label">Password</label>
          <input 
          class="form-control mb-3"
          v-model="password"
          id="password" type="password" />
          <label for="password-repeat" class="form-label">Password repeat</label>
          <input 
          class="form-control mb-3"
          v-model="passwordRepeat"
          id="password-repeat" type="password" />
          <button 
          type="button"
          class="btn btn-primary"
          :disabled="isDisabled">Sign Up</button>
        </form>
      </div>
    </div>    
  </div>  
</template>