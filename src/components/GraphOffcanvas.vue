<script setup>
import {defineProps} from 'vue'
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

const props = defineProps({
  max:Number,
})

// Chart.js を登録
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

// スコアデータ（カレンダーと連携可）
const scoreData = [
  { date: '2025-06-20', score: 90 },
  { date: '2025-06-21', score: 60 },
  { date: '2025-06-22', score: 30 },
]

// グラフ用データ整形
const chartData = {
  labels: scoreData.map(item => item.date),
  datasets: [
    {
      label: 'Score',
      data: scoreData.map(item => item.score),
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      tension: 0.4, // 線の滑らかさ
      fill: true,
    },
  ],
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
  scales: {
    x: {
      type: 'time',
      time: {
        unit: 'day',
      },
      title: {
        display: true,
        text: 'Date',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Score',
      },
      beginAtZero: true,
      max: props.max ?? 100,
    },
  },
}
</script>

<template>
  <Line :data="chartData" :options="chartOptions" />
</template>
