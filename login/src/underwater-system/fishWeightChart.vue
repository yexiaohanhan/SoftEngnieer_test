<template>
    <div style="height: 100%;width: 100%;">
        <!-- 用于显示ECharts图表的div -->
        <div id="fishWeightChart" style="width: 100%; height: 85%;"></div>
        <!-- 添加按钮选项，用于选择不同的鱼类 -->
        <div class="button-container">
            <button class="fishButton" @click="drawChart('金枪鱼')">金枪鱼</button>
            <button class="fishButton" @click="drawChart('鲈鱼')">鲈鱼</button>
            <button class="fishButton" @click="drawChart('鳕鱼')">鳕鱼</button>
            <button class="fishButton" @click="drawChart('鲑鱼')">鲑鱼</button>
            <button class="fishButton" @click="drawChart('马哈鱼')">马哈鱼</button>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
import generateFishWeightData from './fishWeightGenerator.js';

export default {
    data() {
        return {
            fishCountData: [
                { value: 1500, name: "金枪鱼" },
                { value: 1200, name: "鲈鱼" },
                { value: 800, name: "鳕鱼" },
                { value: 400, name: "鲑鱼" },
                { value: 300, name: "马哈鱼" }
            ]
        };
    },
    mounted() {
        this.drawChart('金枪鱼');
    },
    methods: {
        drawChart(fishType) {
            var fishWeightData = generateFishWeightData(this.fishCountData);
            var selectedFishWeights = fishWeightData.find(fish => fish.name === fishType).weights;
            this.initEcharts(selectedFishWeights);
        },
        initEcharts(selectedFishWeights) {
            var myChart = echarts.init(document.getElementById("fishWeightChart"));
            var option = {
                xAxis: {
                    type: 'value',
                    name: '重量(g)',
                    nameTextStyle: {
                        color: '#fff' // 横轴字体颜色为白色
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#fff' // 横轴线颜色为白色
                        }
                    },
                    splitLine: {
                        show: false // 隐藏竖直网格线
                    }
                },
                yAxis: {
                    type: 'value',
                    name: '数量',
                    nameTextStyle: {
                        color: '#fff' // 纵轴字体颜色为白色
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#fff' // 纵轴线颜色为白色
                        }
                    },
                    splitLine: {
                        show: false // 隐藏网格线
                    },
                },
                grid: {
                    top: '20%',
                    bottom: '20%',
                    right: '18%'
                },
                series: [{
                    data: selectedFishWeights,
                    type: 'line',
                    smooth: true,
                }]
            };
            myChart.setOption(option);
            window.addEventListener("resize", function () {
                myChart.resize();
            });
        }
    }
}
</script>

<style scoped>
.fishButton {
    height: 8%;
    width: 50px;
    padding: 10px 2px;
    margin-right: 10px;
    border: none;
    background-color: #2f649f;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
}

.fishButton:hover {
    background-color: #1a8bc2
}
</style>