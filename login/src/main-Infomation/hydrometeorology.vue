<template>
    <div id="hydrometeorology" style="width: 100%; height: 90%;"></div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    mounted() {
        this.initEcharts();
    },
    methods: {
        initEcharts() {
            var myChart = echarts.init(document.getElementById('hydrometeorology'));

            var option = {
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params) {
                        var indicatorName = params[0].name + '<br>';
                        var indicatorValue = '';
                        for (var i = 0; i < params.length; i++) {
                            indicatorValue += params[i].marker + params[i].seriesName + ' : ' + params[i].value + '<br>';
                        }
                        return indicatorName + indicatorValue;
                    }
                },
                radar: {
                    indicator: [
                        { name: '海水温度/°C', max: 30 },
                        { name: '海水盐度/%', max: 40 },
                        { name: '水深/m', max: 10 },
                        { name: '流速/(m/s)', max: 2 },
                        { name: '氧气含量/%', max: 1 },
                        { name: 'pH值', max: 14 },
                        { name: '浊度/%', max: 5 },
                        { name: '光照强度/lx', max: 1000 }
                    ],
                    shape: 'circle',
                    radius: '70%',
                    splitNumber: 5,
                    name: {
                        textStyle: {
                            color: '#FFF', // 将文字颜色改成白色
                            fontSize: 14,
                            fontWeight: 12
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: ['#ccc']
                        }
                    },
                    splitArea: {
                        areaStyle: {
                            color: ['rgba(243, 243, 243, 0.5)'] // 设置雷达的背景透明
                        }
                    }
                },
                series: [{
                    type: 'radar',
                    data: [
                        {
                            value: [25, 36.13, 8.5, 1.5, 0.6, 7.9, 3.35, 668],
                            name: '海洋牧场数据',
                            label: {
                                show: true,
                                formatter: function (params) {
                                    return params.value;
                                }
                            },
                            areaStyle: {
                                normal: {
                                    color: 'rgba(255, 102, 0, 0.5)'
                                }
                            },
                            lineStyle: {
                                normal: {
                                    color: 'rgba(255, 102, 0, 0.8)'
                                }
                            }
                        }
                    ]
                }]
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