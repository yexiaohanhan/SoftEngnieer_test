<template>
  <div id="fishNumberChart" style="width: 100%; height: 100%;"></div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  mounted() {
    this.initEcharts();
  },
  methods: {
    initEcharts() {
      const myChart = echarts.init(document.getElementById("fishNumberChart"));
      // 数据生成器部分
      let base = +new Date(2024, 8, 3);
      let oneDay = 24 * 3600 * 100;
      let date = [];
      let data = [Math.random() * 400 + 300];
      for (let i = 1; i < 20000; i++) {
        var now = new Date((base += oneDay));
        date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
        data.push(Math.abs(Math.round((Math.random() - 0.5) * 20 + data[i - 1])));
      }
      // 找到数据数组中的最大值
      let maxData = Math.max(...data);

      // 计算最接近 maxData 的 100 的倍数的值
      let maxYAxis = Math.ceil(maxData / 100) * 100;
      // 指定图表的配置项和数据
      var option = {
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '20%'];
          }
        },

        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: date,
          axisLabel: {
            color: '#ffffff' // 将横轴字体颜色设置为白色
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          min: 0,
          max: maxYAxis,
          name: '单位：尾', // 设置纵坐标单位为 Fish Unit
          nameLocation: 'end', // 将纵轴单位显示在纵轴顶部的上面
          nameGap: 30, // 纵轴单位与纵轴顶部的距离
          nameTextStyle: {
            fontSize: 13, // 纵坐标单位的字体大小
            fontWeight: 'bold', // 纵坐标单位的字体粗细
            color: '#ffffff' // 将纵轴字体颜色设置为白色
          },
          axisLabel: {
            color: '#ffffff' // 将纵轴字体颜色设置为白色
          }
        },

        series: [
          {
            name: 'Fish Number',
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',
            itemStyle: {
              color: 'rgb(0, 0, 255)'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(0, 0, 255)'
                },
                {
                  offset: 1,
                  color: 'rgb(220, 255, 255)'
                }
              ])
            },
            data: data
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    }
  }
}
</script>