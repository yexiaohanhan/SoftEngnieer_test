<template>
    <div class="pagination">
        <button class="prev-btn" @click="prevPage" :disabled="currentPage === 1">上一页</button>
        <span class="page-show">{{ currentPage }} / {{ totalPages }}</span>
        <button class="next-btn" @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
    </div>
</template>

<script>
export default {
    props: {
        total: {
            type: Number,
            required: true
        },
        pageSize: {
            type: Number,
            required: true
        }
    },
    computed: {
        totalPages() {
            return Math.ceil(this.total / this.pageSize);
        }
    },
    data() {
        return {
            currentPage: 1
        };
    },
    methods: {
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.$emit('pageChange', this.currentPage);
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.$emit('pageChange', this.currentPage);
            }
        }
    }
};
</script>

<style scoped>
.pagination {
    display: flex;
    text-align: center;
    justify-content: center;
}

.pagination button {
    margin: 0 5px;
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    background-color: #157cf1;
    cursor: pointer;
}

.pagination button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.pagination .prev-btn {
    margin-right: 10px;
}

.pagination .next-btn {
    margin-left: 10px;
}

.page-show {
    display: flex;
    text-align: center;
    justify-content: center;
    margin-top: 5px;
}
</style>