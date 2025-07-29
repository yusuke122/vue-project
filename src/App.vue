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
// シリーズ一覧（チェックボックス用）
const seriesList = [
  { id: 'A', label: 'シリーズ A' },
  { id: 'B', label: 'シリーズ B' },
  { id: 'C', label: 'シリーズ C' },
  { id: 'C', label: 'シリーズ D' },
  { id: 'C', label: 'シリーズ E' },
]

// プルダウン選択肢
const yearOptions = [2023, 2024, 2025]
const typeOptions = ['X', 'Y', 'Z']

// 生データの例
const rawData = [
  { seriesId: 'A', option1: 2025, option2: 'X', hour: 0, score: 90 },
  { seriesId: 'B', option1: 2025, option2: 'X', hour: 1, score: 60 },
  { seriesId: 'C', option1: 2025, option2: 'X', hour: 2, score: 10 },
  { seriesId: 'A', option1: 2025, option2: 'X', hour: 3, score: 80 },
  { seriesId: 'B', option1: 2025, option2: 'X', hour: 4, score: 70 },
  { seriesId: 'C', option1: 2025, option2: 'X', hour: 5, score: 30 },
  { seriesId: 'A', option1: 2025, option2: 'X', hour: 6, score: 90 },
  { seriesId: 'B', option1: 2025, option2: 'X', hour: 7, score: 60 },
  { seriesId: 'C', option1: 2025, option2: 'Z', hour: 8, score: 50 },
  { seriesId: 'D', option1: 2025, option2: 'Z', hour: 9, score: 50 },
  { seriesId: 'E', option1: 2025, option2: 'Z', hour: 10, score: 50 },
]
</script>
<template>
  <header>
    <div class="wrapper">
      <button @click="changeMax">click:{{ max }}</button>
      <div v-if="max>105">
      <GraphOffcanvas 
      :max="max"
      :seriesList="seriesList"
      :options1="yearOptions"
      :options2="typeOptions"
      :rawData="rawData"
      />
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
