<template>
  <HeaderComponent />
  <div class="mainbox">
    <ul class="nav1">
      <li style="width: 33%">
        <div class="box">
          <div class="tit">监控视频</div>
          <div class="boxnav"
            style="height: 280px;">
            <VideoControl />
          </div>
        </div>
        <div class="box">
          <div class="tit">附加功能</div>
          <div class="boxnav" style="height: 240px">
            <DeviceControl />
          </div>
        </div>
      </li>

      <li style="width: 34%">
        <div class="box">
          <div class="tit">水文气象</div>
          <div class="boxnav" style="height: 280px">
            <hydrometeorology />
          </div>
        </div>
        <div class="box">
          <div class="tit">定位</div>
          <div class="boxnav" style="height: 240px">
            <location />
          </div>
        </div>

      </li>

      <li style="width: 33%">
        <div class="box">
          <div class="tit">历史记录</div>
          <div class="boxnav" style="height: 280px">
            <temperaturePrecipitation />
          </div>
        </div>
        <div class="box">
          <div class="tit">设备状态</div>
          <div class="boxnav" style="height: 240px">
            <ul class="gnlb">
              <li><span>设备ID：<em>8D45FA-24DS-123</em></span></li>
              <li><span>主控温度：<em>39.64℃</em></span></li>
              <li><span>次控状态：<em>断开</em></span></li>
            </ul>
          </div>
        </div>
      </li>

    </ul>
  </div>

</template>

<script>
import HeaderComponent from '../components/HeaderComponent.vue';
import VideoControl from '@/components/VideoControl.vue';
import DeviceControl from '@/main-Infomation/DeviceControl.vue';
import hydrometeorology from '@/main-Infomation/hydrometeorology.vue';
import location from '../main-Infomation/location.vue';
import temperaturePrecipitation from '../main-Infomation/temperaturePrecipitation.vue';
import DeviceState from '@/main-Infomation/DeviceState.vue';

export default {
  components: {
    HeaderComponent,
    VideoControl,
    DeviceControl,
    hydrometeorology,
    location,
    temperaturePrecipitation,
    DeviceState,
  },
}
</script>