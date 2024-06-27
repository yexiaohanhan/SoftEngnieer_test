<template>
    <div id="sensor" style="width: 100%; height: 100%;">
        <div class="table-container">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th class="header-cell"> 设备</th>
                        <th class="header-cell"> 编号</th>
                        <th class="header-cell"> 大小</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(device, index) in deviceData" :key="index" class="table-row">
                        <td class="data-cell">{{ device.name }}</td>
                        <td class="data-cell">{{ device.id }}</td>
                        <td class="data-cell">{{ device.size }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            deviceData: [
                { name: "水底摄像头", id: "vedio-1", size: "4Mb" },
                { name: "水底摄像头", id: "vedio-2", size: "4Mb" },
                { name: "水底摄像头", id: "vedio-3", size: "4Mb" },
                { name: "声呐", id: "sonar-1", size: "3Mb" },
                { name: "声呐", id: "sonar-2", size: "3Mb" },
                { name: "声呐", id: "sonar-3", size: "3Mb" },
                { name: "传感器", id: "sensor-1", size: "2Mb" },
                { name: "传感器", id: "sensor-2", size: "2Mb" },
                { name: "传感器", id: "sensor-3", size: "2Mb" },
                { name: "气象站", id: "weather-1", size: "5Mb" },
                { name: "气象站", id: "weather-2", size: "5Mb" },
                { name: "云台", id: "gimbal-1", size: "1Mb" },
                { name: "云台", id: "gimbal-2", size: "1Mb" }
            ]
        };
    }
};
</script>

<style>
.table-container {
    height: 200px;
    /* 设置容器高度 */
    overflow-y: auto;
    /* 开启垂直滚动条 */
}

/* 样式可以根据需要自行调整 */
table {
    width: 100%;
    border-collapse: collapse;
}

th {
    background-color: transparent;
    text-align: center;
    /* 将表头文字右对齐 */
}

.table-container::-webkit-scrollbar {
    width: 8px;
}

.table-container::-webkit-scrollbar-track {
    background: #f1f1f1;
}

.table-container::-webkit-scrollbar-thumb {
    background: rgb(46, 140, 222);
}

.table-container::-webkit-scrollbar-thumb:hover {
    background: rgb(33, 80, 223);
}

/* 表格内数据的字体大小和间距 */
.data-cell {
    font-size: 14px;
    text-align: center;
    /* 修改字体大小为14像素 */
    padding: 10px;
    /* 设置文字间距 */
}
</style>
