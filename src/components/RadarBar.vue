<!-- 2.左中雷达图 -->
<template>
  <div>
    <div>【云端报警风险】</div>
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
// 2.构建options对象
const renderChart=()=>{
  const options={
    //雷达图的坐标系配置
	  radar:{
      name:{
        textStyle:{
          color:'#05D5FF',
          fontSize:16
        }
      },
      shape:'polygon',
      center:['50%', '50%'],
      radius:'95%',
      startAngle:120,
      axisLine:{
        lineStyle:{
          color:'rgba(5,213,255,.8)',
        }
      },
      splitLine:{
        show:true,
        lineStyle:{
          width:1,
          color:'rgba(5,213,255,.8)',
        }
      },
      indicator:props.data.risks.map((item)=>({
        name: item.name,
        max: 100
      })),
      splitArea:{
        show:false,
      }
    },
    legend:{
      show:true,
      top: 'top',  //设置图例距离顶部边距
      left: 'center',  //设置图例距离左侧边距
      itemWidth: 10,  //设置图例标记的图形宽度
      itemHeight: 10,  //设置图例标记的图形高度
      itemGap: 10,  //设置图例每项之间的间隔
      textStyle: { fontSize: 15, color: '#fff' },
      data:{name:props.data.risks.map((item)=>item.name)},
       
      
    },
    //坐标极点
    polar:{
      center:['50%','50%'],
      radius:'0%'
    },
    //坐标角度
    angleAxis:{
      min:0,
      interval:5,
      clockwise:false,
    },
    //径向轴
    radiusAxis:{
      min:0,
      interval:20,
      splitLine:{
        show:true
      }
    },
    //图表核心配置
    series:{
      type:'radar',
      symbol:'circle',
      symbolSize:10,
      itemStyle:{
        normal:{
          color:'#05d5ff'
        }
      },
      areaStyle:{
        normal:{
          color:'#05d5ff',
          opacity:0.5
        }
      },
      lineStyle:{
        width:2,
        color:'05d5ff'
      },
      label:{
        normal:{
          show:true,
          color:'#fff'
        }
      },
      data:[
        {value:props.data.risks.map((item)=>item.value)}
      ]
    }
}
myChart.setOption(options)
}
watch(()=>props.data,
()=>{
  renderChart()
})
</script>

<style lang="scss" scoped>

</style>