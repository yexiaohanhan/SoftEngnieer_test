<template>
    <div style="height: 100%;">
        <div class="info-list">
            <div class="info-item" v-for="(item, index) in infos" :key="index">
                <span class="limited-text">{{ item }}</span>
                <button @click="removeItem(index)">删除</button>
            </div>
        </div>

        <div style="height: 40px; display: flex; align-items: center;justify-content: center;">
            <el-button class="button" type="primary" style="width: 90%;" @click="openDialog">
                自定义报警阈值与通知
            </el-button>
        </div>

        <el-dialog title="自定义报警阈值与通知方式" v-model="showDialog" width="350px">
            <el-form :model="tempThresholdConfig">
                <div class="configItem">
                    <div class="configItem1">发送邮件通知: </div>
                    <div class="configItem2"><el-switch v-model="tempThresholdConfig.sendEmail"></el-switch></div>
                </div>

                <div class="configItem">
                    <div class="configItem1">水质类别: </div>
                    <div class="configItem2"><el-select v-model="tempThresholdConfig.waterQuality"
                            placeholder="请选择水质类别">
                            <el-option label="Ⅰ类" :value="1"></el-option>
                            <el-option label="Ⅱ类" :value="2"></el-option>
                            <el-option label="Ⅲ类" :value="3"></el-option>
                            <el-option label="Ⅳ类" :value="4"></el-option>
                            <el-option label="Ⅴ类" :value="5"></el-option>
                            <el-option label="劣Ⅴ类" :value="6"></el-option>
                            <el-option label="忽略" :value="7"></el-option>
                        </el-select></div>
                </div>

                <el-table :data="tempThresholdConfig.parameters" border height="200px">
                    <el-table-column prop="name" label="参数" show-overflow-tooltip></el-table-column>
                    <el-table-column label="最小值">
                        <template #default="scope">
                            <el-input v-model="scope.row.min" type="number" :placeholder="scope.row.name"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="最大值">
                        <template #default="scope">
                            <el-input v-model="scope.row.max" type="number" :placeholder="scope.row.name"></el-input>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button style="margin: 0px 30px;" @click="closeDialog">取消</el-button>
                <el-button style="margin: 0px 30px;" type="primary" @click="saveThresholdConfig">确认</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {sendEmail} from '../api/datas.js';
import qs from 'qs';

export default {
    props: {
        weatherData: Array,
        waterQualitys: Array,
    },
    data() {
        return {
            infos: [],
            showDialog: false,
            thresholdConfig: {
                sendEmail: false,
                waterQuality: 7,
                parameters: [
                    { name: '最高水温（℃）', min: 3.0, max: 33.0 },
                    { name: '最高pH(无量纲)', min: 6.0, max: 10.0 },
                    { name: '溶氧量(mg/L)', min: 2.0, max: null },
                    { name: '电导率（μS/cm）', min: null, max: null },
                    { name: '浊度（NTU）', min: null, max: 1000.0 },
                    { name: '高锰酸盐指数（mg/L）', min: 0.25, max: 20.0 },
                    { name: '氨氮（mg/L）', min: 0.025, max: 2.0 },
                    { name: '总磷（mg/L）', min: 0.005, max: 0.6 },
                    { name: '总氮（mg/L）', min: 0.25, max: 20.0 },
                    { name: '气温（℃）', min: 20.0, max: 40.0 },
                    { name: '降雨量（ml）', min: null, max: 500.0 },
                    { name: '风速（km/h）', min: null, max: 40.0 },
                ]
            },
            tempThresholdConfig: null,
        };
    },
    methods: {
        removeItem(index) {
            this.infos.splice(index, 1);
        },
        openDialog() {
            this.tempThresholdConfig = JSON.parse(JSON.stringify(this.thresholdConfig));
            this.showDialog = true;
        },
        closeDialog() {
            this.showDialog = false;
        },
        saveThresholdConfig() {
            this.thresholdConfig = JSON.parse(JSON.stringify(this.tempThresholdConfig));
            this.checkThresholds();
            this.showDialog = false;
        },
        convertLabelToValue(label) {
            switch (label) {
                case 'Ⅰ':
                    return 1;
                case 'Ⅱ':
                    return 2;
                case 'Ⅲ':
                    return 3;
                case 'Ⅳ':
                    return 4;
                case 'Ⅴ':
                    return 5;
                case '劣Ⅴ':
                    return 6;
                case '忽略':
                    return 7;
                default:
                    return 0;
            }
        },
        async checkThresholds() {
            this.infos = [];

            this.waterQualitys.forEach(waterQuality => {
                if (this.convertLabelToValue(waterQuality['水质类别']) >= this.thresholdConfig.waterQuality) {
                    this.infos.push(`水文数据 ${waterQuality.id} 的属性 水质类别 超出阈值，为 ${waterQuality['水质类别']}`);
                }
                this.thresholdConfig.parameters.forEach(param => {
                    const value = waterQuality[param.name];
                    if (value !== undefined && value !== null) {
                        if ((param.min !== null && value < param.min) || (param.max !== null && value > param.max)) {
                            this.infos.push(`水文数据 ${waterQuality.id} 的属性 ${param.name} 超出阈值，为 ${value}`);
                        }
                    }
                });
            });

            this.weatherData.forEach(weather => {
                this.thresholdConfig.parameters.forEach(param => {
                    let value;

                    // 获取对应的值并检查是否超出阈值
                    switch (param.name) {
                        case '气温（℃）':
                            const highTemp = parseFloat(weather.high);
                            const lowTemp = parseFloat(weather.low);
                            if (param.max !== null && highTemp > param.max) {
                                this.infos.push(`${weather.date} 的最高气温超出阈值，为 ${highTemp}℃`);
                            }
                            if (param.min !== null && lowTemp < param.min) {
                                this.infos.push(`${weather.date} 的最低气温超出阈值，为 ${lowTemp}℃`);
                            }
                            break;
                        case '降雨量（ml）':
                            value = parseFloat(weather.rainfall);
                            if ((param.min !== null && value < param.min) || (param.max !== null && value > param.max)) {
                                this.infos.push(`${weather.date} 的降雨量超出阈值，为 ${value}ml`);
                            }
                            break;
                        case '风速（km/h）':
                            value = parseFloat(weather.wind_speed);
                            if ((param.min !== null && value < param.min) || (param.max !== null && value > param.max)) {
                                this.infos.push(`${weather.date} 的风速超出阈值，为 ${value}km/h`);
                            }
                            break;
                        default:
                            break;
                    }
                });
            });

            if (this.thresholdConfig.sendEmail) {
                try {
                    const response = await sendEmail({data: this.infos.join('\n')});
                    this.$message.success('邮件发送成功');
                } catch (error) {
                    this.$message.error('邮件发送失败');
                }
            }
        },
    },
    mounted() {
        this.checkThresholds();
    }
};
</script>

<style>
.info-list {
    max-height: 168px;
    height: 168px;
    width: 100%;
    overflow-y: auto;
}

.info-list::-webkit-scrollbar {
    width: 8px;
}

.info-list::-webkit-scrollbar-track {
    background: #f1f1f1;
}

.info-list::-webkit-scrollbar-thumb {
    background: rgb(46, 140, 222);
}

.info-list::-webkit-scrollbar-thumb:hover {
    background: rgb(33, 80, 223);
}

.limited-text {
    max-width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.limited-text:hover {
    white-space: normal;
    overflow-wrap: break-word;
}

.info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;
    /* height: 28px; */
    border-bottom: 2px solid rgba(7, 118, 181, .8);
}

.info-item button {
    padding: 2px 2px;
    background-color: #dc3545;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin: 0 2px;
}

.configItem {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 32px;
    margin: 5px 0px;
}

.configItem1 {
    height: 100%;
    width: 228px;
}

.configItem2 {
    height: 100%;
    width: 90px;
}

.dialog-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
}
</style>