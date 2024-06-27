 <template>
  <div class="head">
    <div class="administrator">
      <el-button type="primary" @click="verify">管理员界面</el-button>
    </div>
    <div class="menu menu1">
      <ul>
        <li ><router-link to="/main_information">主要信息</router-link></li>
        <li ><router-link to="/underwater_system">水下系统</router-link></li>
      </ul>
    </div>
    <h1 v-if="!isMobile">海洋牧场监测可视化系统</h1>
    <div class="menu menu2">
      <ul>
        <li><router-link to="/data_center">数据中心</router-link></li>
        <li><router-link to="/ai_center">智能中心</router-link></li>
      </ul>
    </div>
    <div class="time" id="showTime" v-if="!isMobile">{{ currentTime }}</div>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import router from '../router/router'

export default {
  data() {
    return {
      currentTime: '',
      isMobile: false,
    };
  },
  mounted() {
    this.startTime();
    this.checkIsMobile();
    window.addEventListener("resize", this.checkIsMobile);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkIsMobile);
  },
  methods: {
    startTime() {
      const updateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = ('0' + (now.getMonth() + 1)).slice(-2);
        const day = ('0' + now.getDate()).slice(-2);
        const hours = ('0' + now.getHours()).slice(-2);
        const minutes = ('0' + now.getMinutes()).slice(-2);
        const seconds = ('0' + now.getSeconds()).slice(-2);
        this.currentTime = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
        requestAnimationFrame(updateTime); // 递归调用，保证更新时机与浏览器的重绘时机同步
      };
      updateTime();
    },
    verify() {
      if (this.$store.state.globalAuthority == 'Admin') {
        ElMessage('进入了管理员界面.');
        router.push('/administrator');
      } else {
        ElMessage('权限不足.');
      }
    },
    checkIsMobile() {
      this.isMobile = window.innerWidth <= 768;
    },
  },
};
</script>

<style scoped>
.head {
    position: relative;
    margin: 15px 15px;
    padding-right: 60px;
    height: auto; /* Change height to auto to accommodate vertical layout on mobile */
    display: flex;
    flex-wrap: wrap; /* Allow wrapping of elements */
    justify-content: space-between;
    align-items: center;
    gap: 10px; /* Add gap for spacing between elements */
}

.head h1 {
    font-size: 25px;
    color: #daf9ff;
    flex: 2;
    text-align: center;
    margin: 10px 0; /* Add margin for spacing */
}

.head .menu {
    flex: 3;
    display: flex;
    justify-content: space-around;
}

.head .menu ul {
    display: flex;
    justify-content: space-around;
    padding: 0;
    list-style: none;
    margin: 0;
    width: 100%;
}

.head .menu li {
    margin: 0 10px;
}

.head .menu li a {
    font-size: 16px;
    color: #fff;
    line-height: 40px;
}

.head .administrator {
    flex: 1;
}

.head .time {
    flex: 1;
    text-align: right;
}

.head .menu li a:hover {
    color: #f4e925;
}

/* Media Query for Mobile Devices */
@media (max-width: 768px) {
    .head {
        /* flex-direction: column; */
        display: flex;
        align-items: center; /* Center elements in the column layout */
        justify-content: center;
        width: 100%;
        padding: 0px 20px;
        margin: none;
    }

    .head h1 {
        font-size: 20px;
        text-align: center; /* Keep text centered */
        flex: none;
        width: 100%;
        margin-bottom: 10px;
    }

    .head .menu {
        flex-direction: column;
        align-items: center; /* Center menu items in the column layout */
        width: 100%;
    }

    .head .menu ul {
        flex-direction: column;
        align-items: center; /* Center list items in the column layout */
        width: 100%;
    }

    .head .menu li {
        margin: 5px 0;
    }

    .head .administrator {
        text-align: center; /* Center administrator button */
        padding-bottom: 10px;
        width: 100%;
    }
}
</style>
