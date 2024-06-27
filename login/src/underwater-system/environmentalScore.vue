<template>
    <div id="environmentalScore" style="width: 100%; height: 100%;"></div>
</template>

<script>
import * as echarts from 'echarts';
import { getwaterdata } from '../api/waterdata.js';

export default {
    data() {
        return {
            score: 0,
            pH: 0,  // pH(无量纲)
            O2: 0,  // 溶氧量(mg/L)
            Mn: 0,  // 高锰酸盐指数（mg/L）
            NH: 0,  // 氨氮（mg/L）
            P: 0,  // 总磷（mg/L）
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                const response = await getwaterdata();
                this.pH = response.data[0]['pH(无量纲)'];
                this.O2 = response.data[0]['溶氧量(mg/L)'];
                this.Mn = response.data[0]['高锰酸盐指数（mg/L）'];
                this.NH = response.data[0]['氨氮（mg/L）'];
                this.P = response.data[0]['总磷（mg/L）'];
                
                if(this.pH > 6 &&this.pH < 9){
                    this.score += 100*0.2;
                }
                
                if(this.O2>=7.5){
                    this.score += 100*0.2;
                }else{
                    if(this.O2>=6){
                        this.score += 80*0.2;
                    }else{
                        if(this.O2>=5){
                            this.score += 60*0.2;
                        }else{
                            if(this.O2>=3){
                                this.score += 40*0.2;
                            }else{
                                if(this.O2>=2){
                                    this.score += 20*0.2;
                                }
                            }
                        }
                    }
                }
                
                if(this.Mn<=2){
                    this.score += 100*0.2;
                }else{
                    if(this.Mn<=4){
                        this.score += 80*0.2;
                    }else{
                        if(this.Mn<=6){
                            this.score += 60*0.2;
                        }else{
                            if(this.Mn<=10){
                                this.score += 40*0.2;
                            }else{
                                if(this.Mn<=15){
                                    this.score += 20*0.2;
                                }
                            }
                        }
                        
                    }
                }

                if(this.NH<=0.15){
                    this.score += 100*0.2;
                }else{
                    if(this.NH<=0.5){
                        this.score += 80*0.2;
                    }else{
                        if(this.NH<=1){
                            this.score += 60*0.2;
                        }else{
                            if(this.NH<=1.5){
                                this.score += 40*0.2;
                            }else{
                                if(this.NH<=2){
                                    this.score += 20*0.2;
                                }
                            }
                        }
                    }
                }
                if(this.P<=0.02){
                    this.score += 100*0.2;
                }else{
                    if(this.P<=0.1){
                        this.score += 80*0.2;
                    }else{
                        if(this.P<=0.2){
                            this.score += 60*0.2;
                        }else{
                            if(this.P<=0.3){
                                this.score += 40*0.2;
                            }else{
                                if(this.P<=0.4){
                                    this.score += 20*0.2;
                                }
                            }
                        }
                    }
                }
                
                this.initEcharts();
            } catch (error) {
                this.$message.error('无法获取水质数据');
                console.error('Error fetching waterdata:', error);
            }
        },
        initEcharts() {
            const myChart = echarts.init(document.getElementById("environmentalScore"));
            var option = {
                series: [{
                    type: 'gauge',
                    startAngle: 180,
                    endAngle: 0,
                    min: 0,
                    max: 100,
                    splitNumber: 10,
                    radius: '100%',
                    center:['50%','70%'],  //边距
                    itemStyle: {
                        color: '#58D9F9',
                        shadowColor: 'rgba(0,138,255,0.45)',
                        shadowBlur: 2,
                        shadowOffsetX: 2,
                        shadowOffsetY: 2
                    },

                    pointer: {
                        icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
                        length: '75%',
                        width: 3,
                        offsetCenter: [0, '20%']
                    },
                    axisLine: {
                        roundCap: true,
                        lineStyle: {
                            width: 8,
                            color: [
                                [0.1, '#E71A6D'],
                                [0.3, '#F88168'],
                                [0.5, '#FBF76B'],
                                [0.75, '#7AD4DF'],
                                [1, '#70C27E']
                            ]
                        }
                    },
                    axisTick: {
                        splitNumber: 5,
                        lineStyle: {
                            width: 1,
                            color: '#fff'
                        }
                    },
                    splitLine: {
                        length: 12,
                        lineStyle: {
                            width: 2,
                            color: '#fff'
                        }
                    },
                    axisLabel: {
                        distance: 10,
                        color: 'rgba(255,255,255,0.5)',
                        fontSize: 12,
                        fontWeight: 'bolder'
                    },
                    detail: {
                        backgroundColor: 'transparent',
                        borderColor: 'transparent',
                        borderWidth: 2,
                        width: '100%',
                        lineHeight: 10,
                        height: 15,
                        borderRadius: 2,
                        offsetCenter: [0, '15%'],
                        valueAnimation: true,
                        formatter: function (value) {
                            return '{value|' + value.toFixed(0) + '}';
                        },
                        rich: {
                            value: {
                                fontSize: 20,
                                fontWeight: 'bolder',
                                color: '#6cf'
                            }
                        }
                    },
                    grid: {
                        top: '40%',
                    },
                    data: [{
                        value: this.score
                    }]
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