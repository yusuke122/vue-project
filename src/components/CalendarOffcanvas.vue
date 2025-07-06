<script setup>
import { ref, computed } from 'vue'

const selectedData = ref(new Date())

// ✅ APIから受け取った日付とスコアの例（ISO形式で指定）
const scoreData = [
  { date: '2025-06-20', score: 90 },
  { date: '2025-06-21', score: 60 },
  { date: '2025-06-22', score: 30 },
]

// 🔁 色分類ロジック：スコアに応じて色を返す
function getColor(score) {
  if (score >= 80) return 'red'
  if (score >= 50) return 'blue'
  return 'gold'
}

// 📆 表示用の attributes を計算
const calendarAttributes = computed(() => {
  const colorDots = scoreData.map(item => ({
    key: `dot-${item.date}`,
    dates: new Date(item.date),
    dot: {
      color: getColor(item.score),
      backgroundColor: getColor(item.score),
    },
    order: 1,
  }))

  const selectedRing = {
    key: 'selected-ring',
    dates: selectedData.value,
    customData: { selected: true },
    contentClass: 'selected-outline',
    order: 0,
  }

  return [...colorDots, selectedRing]
})
</script>
<template>

<div class="offcanvas" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="staticBackdropLabel">Offcanvas</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <div>
        <v-calendar
            v-model="selectedData"
            :attributes="calendarAttributes"
        />    
    </div>
  </div>
</div>
</template>
<style scoped>
.offcanvas{
  width: 90vw;
  height: 80vh;
  margin-top:-20%;
  z-index: 9999;
  display: flex;
  justify-content: center;
  text-align:center;
  background-color: rgba(155,129,129,1);
}
/* Light テーマで solid ハイライトを変えたい例 */
/*
::v-deep(.vc-light.vc-attr) {
  --vc-highlight-solid-bg: #ffffff;
  --vc-highlight-solid-content-color: #ffffff;
}*/

::v-deep .vc-light.vc-attr {
  --vc-highlight-outline-bg: #ef0303;
  --vc-highlight-outline-border: rgb(226, 20, 106);
  --vc-highlight-outline-content-color: #10b981;
}
/* もし .vc-highlight-outline が親要素に付くなら… */
::v-deep .vc-light .vc-highlight-outline {
  --vc-highlight-outline-border: rgb(226,20,106);
}
::v-deep .vc-light .selected-outline {
  --vc-highlight-outline-bg:    #ef0303;
  --vc-highlight-outline-border: rgb(226,20,106);
  --vc-highlight-outline-content-color: #10b981;
}
/* .vc-light.vc-attr {
  --vc-highlight-solid-bg:    #fff;
  --vc-highlight-solid-content-color: #fff;
  --vc-highlight-outline-bg:    #ef0303;
  --vc-highlight-outline-border: rgb(226,20,106);
  --vc-highlight-outline-content-color: #10b981;
} */
</style>