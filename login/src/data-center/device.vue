<template>
    <div id="device" style="width: 100%; height: 100%;"></div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts-liquidfill'
export default {
    mounted() {
        this.initEcharts();
    },
    methods: {
        initEcharts() {
            const myChart = echarts.init(document.getElementById("device"));
            var maxDiskSize = 2500;
            var threadNum = 648;
            var option = {
                //backgroundColor: '#04184A',
                series: [{
                    type: 'liquidFill',
                    name: 'CPU使用率',
                    center: ['20%', '22%'],
                    radius: '38%',
                    // 水球颜色
                    color: ['#ee0000', '#ee0000', '#ee0000'],
                    data: [0.4],
                    label: {
                        formatter: function (param) {
                            return param.seriesName + '\n'
                                + param.value * 100 + '%';
                        },
                        fontSize: 14,
                        color: '#fff' // 将文本字体颜色设置为白色
                    },
                    // outline  外边
                    outline: {
                        borderDistance: 5,
                        itemStyle: {
                            borderWidth: 5,
                            borderColor: '#ee0000',
                        },
                    },
                    // 内图 背景色 边
                    backgroundStyle: {
                        color: 'rgba(0,37,83,0.8)',
                    }
                },
                // 内存使用率
                {
                    type: 'liquidFill',
                    name: '内存使用率',
                    // 水球颜色
                    color: ['#49d088', '#38b470', '#2aaf66'],
                    center: ['72%', '22%'],
                    data: [0.5],
                    radius: '38%',
                    label: {
                        formatter: function (param) {
                            return param.seriesName + '\n'
                                + param.value * 100 + '%';
                        },
                        fontSize: 14,
                        color: '#fff' // 将文本字体颜色设置为白色
                    },
                    // outline  外边
                    outline: {
                        borderDistance: 5,
                        itemStyle: {
                            borderWidth: 5,
                            borderColor: '#49d088',
                        },
                    },
                    // 内图 背景色 边
                    backgroundStyle: {
                        color: 'rgba(0,37,83,0.8)',
                    }
                },

                // 进程总数
                {
                    type: 'liquidFill',
                    name: '进程总数',
                    // 水球颜色
                    color: ['#7f00ff', '#F4B30E', '#EACE36'],
                    center: ['46%', '50%'],
                    data: [0.1],
                    radius: '38%',
                    label: {
                        formatter: function (param) {
                            return param.seriesName + '\n'
                                + threadNum;
                        },
                        fontSize: 18,
                        color: '#fff' // 将文本字体颜色设置为白色
                    },
                    // outline  外边
                    outline: {
                        borderDistance: 5,
                        itemStyle: {
                            borderWidth: 5,
                            borderColor: '#7f00ff',
                        },
                    },
                    // 内图 背景色 边
                    backgroundStyle: {
                        color: 'rgba(0,37,83,0.8)',
                    }
                },

                // GPU使用率
                {
                    type: 'liquidFill',
                    name: 'GPU使用率',
                    // 水球颜色
                    color: ['#E3B340', '#F4B30E', '#EACE36'],
                    center: ['20%', '80%'],
                    data: [0.3],
                    radius: '38%',
                    label: {
                        formatter: function (param) {
                            return param.seriesName + '\n'
                                + param.value * 100 + '%';
                        },
                        fontSize: 14,
                        color: '#fff' // 将文本字体颜色设置为白色
                    },
                    // outline  外边
                    outline: {
                        borderDistance: 5,
                        itemStyle: {
                            borderWidth: 5,
                            borderColor: '#FFBF11',
                        },
                    },
                    // 内图 背景色 边
                    backgroundStyle: {
                        color: 'rgba(0,37,83,0.8)',
                    }
                },

                // 硬盘使用情况
                {
                    type: 'liquidFill',
                    name: '硬盘使用情况',
                    // 水球颜色
                    color: ['#66ccff', '#F4B30E', '#EACE36'],
                    center: ['72%', '80%'],
                    data: [0.4],
                    radius: '38%',
                    label: {
                        formatter: function (param) {
                            return param.seriesName + '\n'
                                + param.value * maxDiskSize + '/' + maxDiskSize + 'TB';
                        },
                        fontSize: 14,
                        color: '#fff' // 将文本字体颜色设置为白色
                    },
                    // outline  外边
                    outline: {
                        borderDistance: 5,
                        itemStyle: {
                            borderWidth: 5,
                            borderColor: '#66ccff',
                        },
                    },
                    // 内图 背景色 边
                    backgroundStyle: {
                        color: 'rgba(0,37,83,0.8)',
                    }
                }
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