<template>
  <HeaderComponent />

  <div class="box">
    <div class="tit">数据管理</div>
    <DataList />
  </div>

</template>

<script>
import HeaderComponent from '../components/HeaderComponent.vue';
import DataList from '../administrater/DataList.vue';

export default {
  components: {
    HeaderComponent,
    DataList,
  },
};

</script>

<style scoped>
.box{
  width: 80%;
  margin-left:10%;
}

@media (max-width: 768px){
  .box {
      margin: 0px 5px;
      width: 100%;
    }
}
</style>