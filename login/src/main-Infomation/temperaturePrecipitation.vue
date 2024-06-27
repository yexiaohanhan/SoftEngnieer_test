<template>
    <div id="temperaturePrecipitation" style="width: 100%; height: 100%;"></div>
</template>
<script>
import * as echarts from 'echarts';
export default {
    mounted() {
      this.initEcharts();
    },
    methods: {
        initEcharts() {
            const myChart = echarts.init(document.getElementById("temperaturePrecipitation"));
            const colors = ['#FFA500', '#91CC75', '#EE6666'];
            var option = {
  color: colors,
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  grid: {
    right: '110px'
  },
  legend: {
      data: ['蒸发量', '降水量', '温度'],
      textStyle: {
            color: '#fff' // 设置图例文字颜色为白色
        }
  },
  xAxis: [
    {
      type: 'category',
      axisTick: {
        alignWithLabel: true
      },
      // prettier-ignore
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          axisLabel: {
            textStyle: {
                color: '#fff' // 设置横坐标文字颜色为白色
            }
        }
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '蒸发量',
      position: 'right',
      min: 0, // 设置最小值为 0
      max: 200, // 设置最大值为 200，确保两个纵轴比例尺一致
      alignTicks: true,
      axisLine: {
        show: true,
        lineStyle: {
          color: colors[0]
        }
      },
      axisLabel: {
        formatter: '{value}ml',
      }
    },
    {
      type: 'value',
      name: '降水量',
      position: 'right',
      min: 0, // 设置最小值为 0
      max: 200, // 设置最大值为 200，确保两个纵轴比例尺一致
      alignTicks: true,
      offset: 60,
      axisLine: {
        show: true,
        lineStyle: {
          color: colors[1]
        }
      },
      axisLabel: {
        formatter: '{value}ml'
      }
    },
    {
      type: 'value',
      name: '温度(°C)',
      position: 'left',
      alignTicks: true,
      axisLine: {
        show: true,
        lineStyle: {
          color: colors[2]
        }
      },
    }
  ],
  series: [
    {
      name: '蒸发量',
      type: 'bar',
      data: [
        2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
      ]
    },
    {
      name: '降水量',
      type: 'bar',
      yAxisIndex: 1,
      data: [
        2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
      ]
    },
    {
      name: '温度',
      type: 'line',
      yAxisIndex: 2,
    data: [14.0, 14.2, 15.3, 16.5, 18.3, 22.2, 32.3, 35.4, 35.0, 28.5, 24.0, 18.2]
    }
  ]
};

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            window.addEventListener("resize", function () {
            myChart.resize();});
        }
    }
}

</script>
