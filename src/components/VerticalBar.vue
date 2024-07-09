<!-- 1左上水平柱状图 -->
<template>
  <div>
    <div>【服务资源占用比】</div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<script setup>
import {ref,onMounted,watch} from 'vue'
import * as echarts from 'echarts';


  const props = defineProps({
    data:{
      type: Object,
      required: true
    }
  })
  console.log(props.data)

  // 1.初始化echarts实例,vue里面要去获取DOM必须在Mounted之后使用
let myChart =null;
const target = ref(null)

onMounted(()=>{
  myChart=echarts.init(target.value)
  renderChart()
})
// var myChart = echarts.init(this.$refs.target);
// 2.构建options对象
const renderChart = () => {
  const options = {
    xAxis: {
      type: 'category',
      data: props.data.servers.map((item)=>item.name),
      inverse: false,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#9eb1c8'
      }
     
    },
    yAxis: {
      show: false,
      type: 'value',
      max: function (value){
        return parseInt(`${value.max * 1.2}`)
      }
    },
    grid: {
      top: 16,
      right: 0,
      bottom: 26,
      left: -26,
      containLabel: true
    },
    series: [
      {
        type: 'bar',
        data: props.data.servers.map(item=>({
          name: item.name,
          value: item.value,
        })),
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        itemStyle: {
          color: '#2f89cf',
          borderRadius: 5,
          shadowColor: 'rgba(0, 0, 0, 0.3)',
          shadowBlur: 5
        },
        barWidth: 12,
        label: {
          show: true,
          position: 'top',
          color: '#fff',
          formatter:'{c}%'
        }
      }
    ]
  }
  // 3.通过实例.setOptions(option)
  myChart.setOption(options)
}
watch(()=>props.data,
()=>{
  renderChart()
})
</script>

<style lang="scss" scoped>

</style>