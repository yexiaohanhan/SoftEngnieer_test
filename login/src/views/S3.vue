<template>
  <HeaderComponent />

  <div class="mainbox">

    <ul class="nav1">
      <li style="width: 25%">
        <div class="box">
          <div class="tit">计算机设备信息</div>
          <div class="boxnav" style="height: 560px">
            <device />
          </div>
        </div>


      </li>



      <li style="width: 50%">

        <div class="box">
          <div class="tit">数据中心分布</div>
          <div class="boxnav" style="height: 560px;">

            <ChinaMap />


          </div>
        </div>
      </li>



      <li style="width: 25%">

        <div class="box">
          <div class="tit">传感器信息</div>
          <div class="boxnav" style="height: 220px;">
            <sensor />
          </div>
        </div>

        <div class="box">
          <div class="tit">数据库交互统计</div>
          <div class="boxnav" style="height: 280px;">
            <ul class="gnlb">
              <li><span>数据库：<em>Mysql</em></span></li>
              <li><span>查询次数：<em>1919810</em></span></li>
              <li><span>成功次数：<em>1919810</em></span></li>
              <li><span>查询时间：<em>0.721s</em></span></li>
            </ul>
          </div>

        </div>



      </li>
    </ul>
  </div>
</template>

<script>
import HeaderComponent from '../components/HeaderComponent.vue'; // 假设组件存放在components目录下
import device from '../data-center/device.vue';
import ChinaMap from '../data-center/ChinaMap.vue';
import sensor from '../data-center/sensor.vue';

export default {
  components: {
    HeaderComponent,
    device,
    ChinaMap,
    sensor,
  },
  // 其他页面的代码继续
};

</script>