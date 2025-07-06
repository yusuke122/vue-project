<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import Spinner from './components/Spinner.vue'
import CalendarOffcanvas from './components/calendarOffcanvas.vue'
import {ref,provide,inject} from 'vue'

const isShowLoading = ref(false)
function showLoading(){
  isShowLoading.value = true
};
function hideLoading(){
  isShowLoading.value = false
};
provide('showLoading',showLoading)
provide('hideLoading',hideLoading)
</script>
<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />
    <Spinner v-if="isShowLoading"/>
    <CalendarOffcanvas />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
