<template>
    <div class="header">
        <div class="serchBlock" style="width: 210px;">
            <input type="text" placeholder="搜索用户" v-model="searchQuery" style="margin-left: 10px;">
            <button @click="startSearch()" style="margin-left: 2px;">搜索</button>
        </div>
        <div style="width: 250px;">
            <button @click="showAddDialog = true">添加用户</button>
            <button @click="showImportDialog = true">导入数据</button>
            <button @click="showExportDialog = true">导出数据</button>
        </div>
    </div>

    <table class="user-table">
        <thead>
            <th style="width: 25%;">账号</th>
            <th style="width: 25%;">密码</th>
            <th style="width: 25%;">权限</th>
            <th style="width: 25%;">操作</th>
        </thead>
        <tbody>
            <UserItem v-for="user in displayedUsers" :key="user.id" :user="user" />
        </tbody>
    </table>

    <Pagination :total="totalUsers" :pageSize="pageSize" @pageChange="handlePageChange" class="pagination " />

    <!-- 增加用户对话框 -->
    <el-dialog v-model="showAddDialog" title="增加用户" width="350px">
        <el-form :model="addForm" label-width="20%">
            <el-form-item label="用户名">
                <el-input v-model="addForm.account" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="addForm.password" autocomplete="off" type="password"></el-input>
            </el-form-item>
            <el-form-item label="权限">
                <el-select v-model="addForm.identity" placeholder="请选择">
                    <el-option label="User" value="User"></el-option>
                    <el-option label="Admin" value="Admin"></el-option>
                </el-select>
            </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button @click="showAddDialog = false" style="margin:0 20%;">取消</el-button>
            <el-button type="primary" @click="addUser" style="margin:0 20%;">确定</el-button>
        </span>
    </el-dialog>

    <el-dialog title="导入数据" v-model="showImportDialog" width="350px">
        <el-form :model="importForm">
            <el-form-item label="数据类型">
                <el-select v-model="importForm.importDataType" placeholder="请选择数据类型">
                    <el-option label="用户数据" value="type1"></el-option>
                    <el-option label="鱼类数据" value="type2"></el-option>
                    <el-option label="水文数据" value="type3"></el-option>
                    <el-option label="鱼类数量" value="type4"></el-option>
                    <el-option label="气象数据" value="type5"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择文件">
                <input type="file" @change="handleFileChange" />
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="showImportDialog = false">取消</el-button>
            <el-button type="primary" @click="submitImport">确定</el-button>
        </span>
    </el-dialog>

    <!-- 导出数据对话框 -->
    <el-dialog title="导出数据" v-model="showExportDialog" width="350px">
        <el-form :model="exportForm">
            <el-form-item label="数据类型">
                <el-select v-model="exportForm.exportDataType" placeholder="请选择数据类型">
                    <el-option label="用户数据" value="type1"></el-option>
                    <el-option label="鱼类数据" value="type2"></el-option>
                    <el-option label="水文数据" value="type3"></el-option>
                    <el-option label="鱼类数量" value="type4"></el-option>
                    <el-option label="气象数据" value="type5"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文件名称">
                <el-input v-model="exportForm.exportFileName" placeholder="输入文件名称"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="showExportDialog = false">取消</el-button>
            <el-button type="primary" @click="handleExport">导出</el-button>
        </div>
    </el-dialog>
</template>

<script>
import UserItem from './UserItem.vue';
import Pagination from './Pagination.vue';
import { getUsers } from '../api/users.js';
import { addUser } from '../api/users.js';
import { uploadfile } from '../api/datas.js';
import { downloadfile } from '../api/datas.js';
import { searchusers } from '../api/users.js';

export default {
    components: {
        UserItem,
        Pagination
    },
    data() {
        return {
            users: [],
            currentPage: 1,
            pageSize: 8,
            showAddDialog: false,
            showExportDialog: false,
            showImportDialog: false,
            addForm: {
                account: '',
                password: '',
                identity: ''
            },
            importForm: {
                importDataType: '',
                file: null
            },
            exportForm: {
                exportDataType: '',
                exportFileName: '',
            },
            searchQuery: ''
        };
    },
    computed: {
        totalUsers() {
            return this.users.length;
        },
        displayedUsers() {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.users.slice(startIndex, endIndex);
        }
    },
    methods: {
        handlePageChange(page) {
            this.currentPage = page;
        },
        async addUser() {
            try {
                // 发送POST请求添加用户
                const response = await addUser(this.addForm);
                console.log('User added:', response.data);
                this.$message.success('用户添加成功');
                this.showAddDialog = false;
                this.fetchUsers();
            } catch (error) {
                console.error('Error adding user:', error);
                this.$message.error('添加用户失败');
            }
        },

        handleFileChange(event) {
            this.importForm.file = event.target.files[0];
        },
        async submitImport() {
            if (!this.importForm.importDataType || !this.importForm.file) {
                this.$message.error('请选择数据类型并选择文件');
                return;
            }

            const formData = new FormData();
            formData.append('file', this.importForm.file);
            formData.append('type', this.importForm.importDataType);

            try {
                const response = await uploadfile(formData);
                this.$message.success('文件上传成功');
                this.showImportDialog = false;
            } catch (error) {
                this.$message.error('文件上传失败');
            }
        },

        async handleExport() {
            if (!this.exportForm.exportDataType || !this.exportForm.exportFileName) {
                this.$message.error('请选择数据类型并输入文件名称');
                return;
            }

            try {
                const response = await downloadfile(this.exportForm);
                this.$message.success('文件导出成功');
                this.showImportDialog = false;
            } catch (error) {
                this.$message.error('文件导出失败');
            }
        },
        
        async fetchUsers() {
            try {
                const response = await getUsers();
                this.users = response.data;
            } catch (error) {
                this.$message.error('无法获取用户数据');
                console.error('Error fetching users:', error);
            }
        },

        async startSearch() {
            try {
                this.currentPage = 1; // 搜索时重置到第一页
                if(this.searchQuery){
                    // 发送POST请求添加用户
                    const response = await searchusers(this.searchQuery);
                    this.users = response.data;
                }else{
                    const response = await getUsers();
                    this.users = response.data;
                }
            } catch (error) {
                console.error('Error searching user:', error);
                this.$message.error('搜索用户失败');
            }
        }
    },
    mounted() {
        this.fetchUsers();
    }
};
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0px;
}

.header button {
    padding: 10px 10px;
    margin-right: 2px;
    background-color: #157cf1;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.header button:hover {
    background-color: #1a8bc2;
}

input[type="text"] {
    padding: 10px;
    width: 140px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    transition: border-color 0.3s ease;
}

input[type="text"]:focus {
    border-color: #007bff;
}

.user-table {
    width: 100%;
    border-collapse: collapse;
}

.user-table th {
    padding: 10px;
    border-bottom: 1px solid rgba(7, 118, 181, .7);
    text-align: center;
    background-color: #157cf1;
    color: #fff;
}

.pagination {
    text-align: center;
    margin-top: 20px;
}

.pagination button {
    margin: 0 5px;
    padding: 5px 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #fff;
    cursor: pointer;
}

.pagination button:hover {
    background-color: #f2f2f2;
}

.pagination button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.dialog-footer {
    display: flex;
    justify-content: center;
}

.pagination {
    display: flex;
    text-align: center;
    justify-content: center;
    margin: 10px 0;
}

@media (max-width: 768px) {
    .pagination button {
        margin: 0 5px;
        padding: 5px 0px;
        border: 1px solid #ddd;
        border-radius: 4px;
        background-color: #fff;
        cursor: pointer;
    }

    input[type="text"] {
        width: 100px;
    }
}
</style>