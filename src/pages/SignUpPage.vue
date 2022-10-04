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
  <h1>Sign Up</h1>
  <label for="username">Username</label><br />
  <input id="username" /><br />
  <label for="e-mail">E-mail</label><br />
  <input id="e-mail" /><br />
  <label for="password">Password</label><br />
  <input 
  v-model="password"
  id="password" type="password" /><br />
  <label for="password-repeat">Password repeat</label><br />
  <input 
  v-model="passwordRepeat"
  id="password-repeat" type="password" /><br />
  <button :disabled="isDisabled">Sign Up</button><br />
</template>