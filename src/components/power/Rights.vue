<template>
  <div>
    <!-- 面包屑区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card class="box-card">
      <!-- 权限列表区域 -->
        <el-table :data='rightsList' border stripe>
             <el-table-column type="index"></el-table-column>
             <el-table-column label="权限名称" prop="authName"> </el-table-column>
             <el-table-column label="路径" prop="path"> </el-table-column>
             <el-table-column label="权限等级" prop="pid">
                 <template slot-scope="scope">
                     <el-tag v-if="scope.row.level=='0'">一级</el-tag>
                     <el-tag type="success" v-else-if="scope.row.level=='1'">二级</el-tag>
                     <el-tag type="warning" v-else>三级</el-tag>
                 </template>
             </el-table-column>
        </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rightsList: [],
    }
  },
  created() {
    this.getRightsList()
    
  },
  methods: {
    async getRightsList() {
      const { data: res } = await this.$http.get('rights/list')
       if (res.meta.status !== 200) {
        return this.message.error('用户列表获取失败')
      }
      this.rightsList = res.data
     
    },
  },
}
</script>

<style lang="less" scoped>
</style>>

