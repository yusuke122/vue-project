<script setup>
import GraphOffcanvas from './components/GraphOffcanvas.vue'
import TheWelcome from './components/TheWelcome.vue'
import Spinner from './components/Spinner.vue'
import CalendarOffcanvas from './components/CalendarOffcanvas.vue'
import {ref,provide,inject, nextTick} from 'vue'

const isShowLoading = ref(false)
function showLoading(){
  isShowLoading.value = true
};
function hideLoading(){
  isShowLoading.value = false
};
const max = ref(105)
provide('showLoading',showLoading)
provide('hideLoading',hideLoading)
function changeMax(){
  max.value = Math.floor(Math.random()*10)+100
}
</script>
<template>
  <header>
    <div class="wrapper">
      <button @click="changeMax">click:{{ max }}</button>
      <div v-if="max>105">
      <GraphOffcanvas :max="max"/>
      </div>
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
    scale:calc(1.3)
  }
}
</style>
