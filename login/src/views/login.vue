<!--
 * @FileDescription: 登录页面
 -->

<template>
    <div id="backcont">
        <div class="meituan-content">
            <div class="login-cont">
                <div class="meituan-title">海洋牧场可视化系统登录</div>

                <el-form size="large"  class="login-content-form" :model="ruleForm" :rules="rules">
                        <el-form-item class="meituan-user" prop="userName" >
                            <td><p>账号：</p></td>
                            <td><el-input type="text" placeholder="请输入账号" v-model="ruleForm.userName" style="width: 300px;"></el-input></td>
                        </el-form-item>

                        <el-form-item class="meituan-user" prop="password">
                            <td><p>密码:</p></td>
                            <td><el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" style="width: 300px;" shpw-password></el-input></td>
                        </el-form-item>

                        <el-form-item class="meituan-user">
                            <td><p>验证码:</p></td>
                            <el-form-item class="yanzheng" prop="code">
                                <td><el-input 	type="text" maxlength="4" placeholder="请输入验证码" v-model="ruleForm.code" style="width: 170px;"></el-input></td>
                                <SIdentify  class="tuxing" :identifyCode="identifyCode" @click="refreshCode" style="width: 100px; height: 40px; margin-left: 10px;"></SIdentify>
                            </el-form-item>
                        </el-form-item>

                        <el-form-item style="margin-top: 40px;">
                            <el-button class="meituan-btn" type="primary" round @click="login" :load="ruleForm.load">登录</el-button>
                            <el-button class="meituan-btn" type="primary" round @click="register" :load="ruleForm.load">注册</el-button>
                        </el-form-item>
                </el-form>

            </div>
        </div>
    </div>
</template>

<script>
    import{reactive, ref,onMounted}from 'vue'
    import { ElMessage } from 'element-plus'
    import router from '../router/router'
    // import {postlogin} from '../utils/index'                                        //可以删除
    import SIdentify from '../components/SIdentify.vue'

    import {
        loginPost
    } from '../api/login.js'

    export default{
        components: {
            SIdentify: SIdentify,
        },
        data(){
            return{
                ruleForm:{
                    userName: '',
                    password: '',
                    code: '',
                    load:false
                },
                // 自定义表单验证
                rules:{
                    userName: [
                                { required: true, message: '请输入账号', trigger: 'blur' },
                                { min: 6, max: 12, message: '账号长度 在 6 到 12 长度之间', trigger: 'blur' },
                            ],
                    password: [
                                { required: true, message: '请输入密码', trigger: 'blur' },
                                { min: 6, max: 12, message: '密码长度 在 6 到 12 长度之间', trigger: 'blur' },
                            ],
                    code: [
                                { required: true, message: '请输入验证码', trigger: 'blur' },
                                { trigger: 'change' },
                        ],
                },
                identifyCode:'4444',
                identifyCodes:'0123456789abcdefghijklnmopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
            }
        },
        methods:{
            // 验证验证码
            checkCode(rule, value, callback){
                console.log(value,"value")
            },
            async login(){
                this.ruleForm.load=true
                const logindata={
                    account:'',
                    password:''
                }
                logindata.account=this.ruleForm.userName
                logindata.password=this.ruleForm.password

                //验证码正确
                if(this.identifyCode==this.ruleForm.code){

                    // router.push('/S1')

                    // 将菜单栏的选中项ID存储到本地存储中，ID为1。
                    // localStorage.setItem('menuid',JSON.stringify('1'))

                    // // 将Token信息存储到会话存储中，表示登录成功。
                    // sessionStorage.setItem('Token',"success")

                    //此行向上删除，解封下方代码
                    
                    const res = await loginPost(logindata)

                    if(res.data.status == 0){
                        //存储token和account
                        sessionStorage.setItem('Token',res)
                        sessionStorage.setItem('account',logindata.account)

                        //设置身份
                        // 管理员 养殖户 用户
                        this.$store.state.globalAuthority = res.data.result.identity
                    
                        this.ruleForm.load=false
                        router.push('/main_information')

                        //登录菜单栏主页选项高亮
                        localStorage.setItem('menuid',JSON.stringify('1'))
                    }
                    //账号密码不存在
                    else{
                        this.ruleForm.password=''
                        this.ruleForm.code=''
                        this.ruleForm.load=false
                        this.refreshCode()
                        ElMessage('账号或密码错误.')
                        // else{
                        //     console.log(res)
                        //     let faildata=res.split("_")
                                
                        //     ElMessage(`您已连续尝试${faildata[2]}次均出现账号或密码错误，
                        //     目前您的账户处于锁定状态，账号锁定期间登录服务不予受理，
                        //     请于${faildata[3]}之后再次尝试`)
                        // }
                    }

                }
                //验证码错误
                else{
                    this.ruleForm.code=''
                    this.ruleForm.load=false
                    ElMessage('验证码错误.')
                    this.refreshCode()
                }
            },
            register(){
                this.ruleForm.load=true
                router.push('/register')
            },

            //生成图形验证码

            randomNum(min, max){
                return Math.floor(Math.random() * (max - min) + min);
            },
            refreshCode(){
                this.identifyCode = "";
                this.makeCode(this.identifyCodes, 4);
            },
            makeCode(o, l){
                for (let i = 0; i < l; i++) {
                    this.identifyCode +=
                    this.identifyCodes[this.randomNum(0, this.identifyCodes.length)];
                }
            }
        },
    }

</script>