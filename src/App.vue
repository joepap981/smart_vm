<template>
  <div id="app">
    <!-- <SignIn /> -->
    <dashboard-index />
  </div>
</template>

<script>
import SignIn from './components/SignIn.vue'
import DashboardIndex from './components/DashboardIndex.vue'

export default {
  name: 'app',
  components: {
    SignIn, DashboardIndex
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
