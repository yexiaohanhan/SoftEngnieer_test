<template>
    <tr class="table-row">
        <td>{{ user.account }}</td>
        <td>******</td>
        <td>{{ user.identity }}</td>
        <td class="buttons">
            <button @click="showEditDialog">修改</button>
            <button @click="showDeleteDialog">删除</button>
        </td>

        <!-- 编辑用户对话框 -->
        <el-dialog v-model="editDialogVisible" title="编辑用户" width="30%">
            <el-form :model="editForm" label-width="20%">
                <el-form-item label="用户名">
                    <el-input v-model="editForm.account" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="editForm.password" autocomplete="off" type="password"></el-input>
                </el-form-item>
                <el-form-item label="权限">
                    <el-select v-model="editForm.identity" placeholder="请选择">
                        <el-option label="User" value="User"></el-option>
                        <el-option label="Admin" value="Admin"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false" style="margin:0 20%;">取消</el-button>
                <el-button type="primary" @click="editUser" style="margin:0 20%;">确定</el-button>
            </span>
        </el-dialog>

        <!-- 删除用户对话框 -->
        <el-dialog v-model="deleteDialogVisible" title="删除用户" width="30%">
            <p style="text-align: center; padding: 20px;">是否确定删除用户 {{ user.account }}?</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteDialogVisible = false" style="margin:0 20%;">取消</el-button>
                <el-button type="danger" @click="deleteUser" style="margin:0 20%;">确定</el-button>
            </span>
        </el-dialog>
    </tr>
</template>

<script>
import UserItem from './UserItem.vue';
import Pagination from './Pagination.vue';
import axios from 'axios';
import { updateUser } from '../api/users.js';
import { deleteUser } from '../api/users.js';

export default {
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            editDialogVisible: false,
            addDialogVisible: false,
            deleteDialogVisible: false,
            editForm: {
                account: '',
                password: '',
                identity: ''
            },
        };
    },
    methods: {
        showEditDialog() {
            // 在弹窗显示前，将用户信息填入编辑表单
            this.editForm.account = this.user.account;
            this.editForm.password = ''; // 不显示密码，需要用户手动输入
            this.editForm.identity = this.user.identity;
            this.editDialogVisible = true;
        },
        showDeleteDialog() {
            this.deleteDialogVisible = true;
        },
        async editUser() {
            // // 编辑用户逻辑
            // console.log('Edited user:', this.editForm);
            // this.editDialogVisible = false;
            try {
                const response = await updateUser(this.editForm);
                console.log('User updated:', response.data);
                this.$message.success('用户信息更新成功');
                this.editDialogVisible = false;
                // 可选：重新加载用户数据或刷新页面
                window.location.reload();
            } catch (error) {
                console.error('Error updating user:', error);
                this.$message.error('更新用户信息失败');
            }
        },
       async deleteUser() {
            // // 删除用户逻辑
            // console.log('Deleted user:', this.user);
            // this.deleteDialogVisible = false;
            try {
                const response = await deleteUser(this.user.account);
                console.log('User deleted:', response.data);
                this.$message.success('用户删除成功');
                this.editDialogVisible = false;
                window.location.reload();
            } catch (error) {
                console.error('Error deleting user:', error);
                this.$message.error('删除用户失败');
            }
        }
    }
};
</script>

<style scoped>
.table-row {
    border-bottom: 1px solid rgba(7, 118, 181, .7);
}

.table-row:hover {
    background-color: #3473b2;
}

td {
    padding: 10px;
    text-align: center;
}

td button {
    padding: 5px 10px;
    background-color: #dc3545;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin: 0 10px;
}

td button:hover {
    background-color: #c82333;
}

.dialog-footer {
    display: flex;
    justify-content: center;
}

@media (max-width: 768px) {
    td button {
            padding: 2px 2px;
            background-color: #dc3545;
            color: #fff;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            margin: 0 2px;
        }
}
</style>