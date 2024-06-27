<template>
    <div class="device-status">
      <div class="device-info">
        <div class="device-id">设备ID: {{ deviceId }}</div>
        <div class="device-version">版本: {{ version }}</div>
        <div class="device-temperature">温度: {{ temperature }}°C</div>
      </div>
      <div class="device-status">
        <div class="main-controller-status">
          <h2>主控</h2>
          <div class="time-calibration">时间校准</div>
          <div class="channel">通道</div>
          <div class="alarm">告警</div>
        </div>
        <div class="sub-controller-status">
          <h2>次控</h2>
          <div class="connection">连接: {{ connectionStatus }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      deviceId: String,
      version: String,
      temperature: Number,
      connectionStatus: String
    }
  }
  </script>
  
  <style scoped>
  .device-status {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 500px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .device-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .device-id,
  .device-version,
  .device-temperature {
    font-size: 16px;
    margin-bottom: 5px;
  }
  
  .device-status {
    display: flex;
    justify-content: space-between;
  }
  
  .main-controller-status,
  .sub-controller-status {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  h2 {
    font-size: 20px;
    margin-bottom: 10px;
  }
  
  .time-calibration,
  .channel,
  .alarm,
  .connection {
    font-size: 14px;
    margin-bottom: 5px;
  }
  </style>
  