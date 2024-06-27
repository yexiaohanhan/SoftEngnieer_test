<template>
    <div style="display: flex; flex-direction: column; align-items: center; justify-content:center; height: 100%;">
        <div class="function">
            <label>自动投喂：</label>
            <label class="switch">
                <input type="checkbox" v-model="autoFeed">
                <span class="slider"></span>
            </label>
        </div>
        <div class="function">
            <label>水质调节：</label>
            <label class="switch">
                <input type="checkbox" v-model="waterQuality">
                <span class="slider"></span>
            </label>
        </div>
        <div class="function">
            <label>温度控制：</label>
            <label class="switch">
                <input type="checkbox" v-model="temperatureControl">
                <span class="slider"></span>
            </label>
        </div>
        <div class="function">
            <label>智能排污：</label>
            <label class="switch">
                <input type="checkbox" v-model="smartDrain">
                <span class="slider"></span>
            </label>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <button class="button" @click="openAll">一键开启</button>
            <button class="button" @click="closeAll">一键关闭</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            autoFeed: false,
            waterQuality: false,
            temperatureControl: false,
            smartDrain: false
        };
    },
    methods: {
        openAll() {
            this.autoFeed = true;
            this.waterQuality = true;
            this.temperatureControl = true;
            this.smartDrain = true;
        },
        closeAll() {
            this.autoFeed = false;
            this.waterQuality = false;
            this.temperatureControl = false;
            this.smartDrain = false;
        }
    }
};
</script>