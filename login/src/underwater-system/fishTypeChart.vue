<template>
    <div id="fishTypeChart" style="width: 100%; height: 100%;"></div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  mounted() {
      this.initEcharts();
  },
  methods: {
    initEcharts() 
    {
      const myChart = echarts.init(document.getElementById("fishTypeChart"));
      // 指定图表的配置项和数据
      var option = {
  // 图例
  legend: {
  orient: "vertical",
  x: "left",
  data: ["金枪鱼", "鲈鱼", "鳕鱼", "鲑鱼", "马哈鱼"],
  icon: "react",
  textStyle: {
      color: "#ffffff", // 白色
    },
  },
  // 数据与参数设置
  series: [
    {
      type: "pie",
      radius: "60%",
      left: '20%', // 将饼形图向右移动
      
      data: [
        {
          value: 1500, // 金枪鱼数量
          name: "金枪鱼",
        },
        {
          value: 1200, // 鲈鱼数量
          name: "鲈鱼",
        },
        {
          value: 800, // 鳕鱼数量
          name: "鳕鱼",
        },
        {
          value: 400, // 鲑鱼数量
          name: "鲑鱼",
        },
        {
          value: 300, // 马哈鱼数量
          name: "马哈鱼",
        },
      ],
      //阴影
      emphasis: {
        itemStyle: {
          shadowBlur: 100,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
      // 颜色
      color: [
        "#516b91",
        "#59c4e6",
        "#edafda",
        "#93b7e3",
        "#a5e7f0",
        "#cbb0e3",
        "#c12e34",
        "#e6b600",
        "#0098d9",
        "#2b821d",
        "#005eaa",
        "#339ca8",
        "#cda819",
        "#32a487",
      ],
    },
  ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener("resize", function () {
             myChart.resize();
      });
    }
  }
}
    
</script>