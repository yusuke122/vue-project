<template>
  <div class="controls">
    <!-- プルダウン① -->
    <label>
      Option 1:
      <select v-model="selectedOption1">
        <option
          v-for="opt in options1"
          :key="opt"
          :value="opt"
        >{{ opt }}</option>
      </select>
    </label>

    <!-- プルダウン② -->
    <label>
      Option 2:
      <select v-model="selectedOption2">
        <option
          v-for="opt in options2"
          :key="opt"
          :value="opt"
        >{{ opt }}</option>
      </select>
    </label>

    <!-- チェックボックス群（最大10個まで） -->
    <div class="checkbox-group">
      <label
        v-for="series in seriesList"
        :key="series.id"
        class="checkbox-item"
      >
        <input
          type="checkbox"
          :value="series.id"
          v-model="selectedSeries"
        /> {{ series.label }}
      </label>
    </div>
  </div>

  <!-- 折れ線グラフ -->
  <Line :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  CategoryScale,
} from 'chart.js'
import 'chartjs-adapter-date-fns'

// 1) 受け取る props 定義
const props = defineProps({
  // Y軸の最大値
  max: { type: Number, default: 100 },

  // チェックボックスに並べる系列。最大10個
  // [{ id: 's1', label: '系列1' }, … ]
  seriesList: {
    type: Array,
    default: () => [],
    validator(arr) { return arr.length <= 10 }
  },

  // プルダウン用選択肢
  options1: { type: Array, default: () => [] },
  options2: { type: Array, default: () => [] },

  // 元データ。各レコードに seriesId, option1, option2, date, score が必要
  // [{ seriesId, option1, option2, date: 'YYYY-MM-DD', score }, …]
  rawData: { type: Array, default: () => [] },
})

// 2) Chart.js の登録
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  CategoryScale
)

// 3) UI 制御用のリアクティブ変数
// プルダウンの初期値は「1」を期待
const selectedOption1 = ref(props.options1[0] ?? null)
const selectedOption2 = ref(props.options2[0] ?? null)

// チェック済み系列はデフォルトで全部チェック
const selectedSeries = ref(props.seriesList.map(s => s.id))

// 4) フィルタリング済みデータ
const filteredData = computed(() => {
  return props.rawData.filter(item =>
    item.option1 === selectedOption1.value &&
    item.option2 === selectedOption2.value &&
    selectedSeries.value.includes(item.seriesId)
  )
})

// 5) Chart.js 用の datasets を生成
const chartData = computed(() => {
  // seriesList 順に dataset を作る
  const datasets = props.seriesList
    .filter(s => selectedSeries.value.includes(s.id))
    .map((series, idx) => {
      // この系列分のデータのみ抽出し、time軸形式に整形
      const data = filteredData.value
        .filter(item => item.seriesId === series.id)
        .map(item => ({ x: item.hour, y: item.score }))

      // シンプルなカラーパレット
      const palette = [
        '#EF4444', '#3B82F6', '#F59E0B',
        '#10B981', '#8B5CF6', '#D946EF',
        '#14B8A6', '#F43F5E', '#84CC16', '#22D3EE'
      ]

      return {
        label: series.label,
        data,
        borderColor: palette[idx % palette.length],
        backgroundColor: `${palette[idx % palette.length]}33`,
        tension: 0.3,
        fill: true,
      }
    })

  // Chart.js の data フォーマット
  return {
    datasets
  }
})

// 6) 共通オプション
const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false   // ← ここで非表示
    },    
    title: { display: false },
  },
  scales: {
    x: {
      type: 'linear',           // ← ここをlinearに
      min: 0,                   // 軸の最小値
      max: 23,                  // 軸の最大値（必要なら設定）
      ticks: {
        stepSize: 1,            // 目盛の間隔
      },
      title: { display: true, text: 'Hour' },
    },
    y: {
      beginAtZero: true,
      max: props.max,
      title: { display: true, text: 'Score' },
    }
  }
}

// 7) ドロップダウンの初期値変更時に初期描画を強制
// （Chart.js の再描画を確実に行いたい場合）
watch(
  [selectedOption1, selectedOption2, selectedSeries],
  () => { /* Chart.js コンポーネントが自動で更新 */ }
)
</script>

<style scoped>
.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.checkbox-item {
  font-size: 0.9rem;
}
</style>
