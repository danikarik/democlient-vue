<template>
  <div class="login">
    <h1>This is an login page</h1>

    <section v-if="errored">
      <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
    </section>

    <section v-else>
      <div v-if="loading">Loading...</div>

      <div v-else>

        <div v-if="isLoggedIn">
          <p v-if="lastSignInAt">{{ lastSignInAt }}</p>
          <button type="button" v-on:click="loadAccount">Load Account</button>

          <div v-if="user">
            <p>{{user.email}}</p>
            <p>{{user.username}}</p>

            <form v-on:submit.prevent="handleUsernameChange">
              <label for="newusername">New Username: </label>
              <input type="text" name="newusername" id="newusername" v-model="newusername">
              <button type="submit">Change</button>
            </form>

            <button v-on:click="handleLogout">Logout</button>
          </div>
        </div>
        <div v-else>
          <form v-on:submit.prevent="handleLogin">
            <label for="username">Username: </label>
            <input type="text" name="username" id="username" v-model="username">
            <br>
            <label for="password">Password: </label>
            <input type="password" name="password" id="password" v-model="password">
            <button type="submit">Login</button>
          </form>
        </div>
      </div>

    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'login',
  data: function() {
    return {
      url: 'https://api-dev.okpock.com',
      username: '',
      newusername: '',
      password: '',
      loading: false,
      errored: false
    }
  },
  computed: mapState({
    isLoggedIn: 'isLoggedIn',
    lastSignInAt: 'lastSignInAt',
    user: 'user'
  }),
  methods: {
    getUrl(path) {
      return this.url + path
    },
    handleLogin: function() {
      this.loading = true
      this.$axios.post(this.getUrl('/login'), {
        username: this.username,
        password: this.password
      }).then(response => {
        this.$store.commit('authenticateUser', response.data.lastSignInAt)
      }).catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
    },
    handleLogout: function() {
      this.loading = true
      this.$axios.delete(this.getUrl('/logout')).then(response => {
        this.$store.commit('logoutUser')
      }).catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
    },
    loadAccount: function() {
      this.loading = true
      this.$axios.get(this.getUrl('/account'), {
        withCredentials: true
      }).then(response => {
        this.$store.commit('saveUser', response.data)
      }).catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
    },
    handleUsernameChange: function() {
      this.loading = true
      this.$axios.put(this.getUrl('/account/username'), {
        username: this.newusername
      }, {
        withCredentials: true
      }).then(response => {
        this.$store.commit('changeUsername', response.data.username)
      }).catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
    }
  }
}
</script>
