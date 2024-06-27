<template>
    <div id="echartAqpf" style="width: 100%; height: 100%;"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
    mounted() {
        this.initEcharts();
    },
    methods: {
        initEcharts() {
            const myChart = echarts.init(document.getElementById("echartAqpf"));
            const option = {
                title: {
                    text: "95",
                    x: "center",
                    y: "center",
                    textStyle: {
                        fontWeight: "normal",
                        color: "#ffffff",
                        fontSize: "30",
                    },
                },
                color: ["rgba(176, 212, 251, 1)"],
                series: [
                    {
                        name: "Line 1",
                        type: "pie",
                        clockWise: true,
                        radius: ["100%", "85%"],
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false,
                                },
                                labelLine: {
                                    show: false,
                                },
                            },
                        },
                        hoverAnimation: false,
                        data: [
                            {
                                value: 90,
                                name: "01",
                                itemStyle: {
                                    normal: {
                                        color: {
                                            colorStops: [
                                                {
                                                    offset: 0,
                                                    color: "#00cefc",
                                                },
                                                {
                                                    offset: 1,
                                                    color: "#367bec",
                                                },
                                            ],
                                        },
                                        label: {
                                            show: false,
                                        },
                                        labelLine: {
                                            show: false,
                                        },
                                    },
                                },
                            },
                            {
                                name: "02",
                                value: 10,
                            },
                        ],
                    },
                ],
            };
            myChart.setOption(option);
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        }
    }
}
</script>