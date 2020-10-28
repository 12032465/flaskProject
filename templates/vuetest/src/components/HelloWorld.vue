<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <span>overview</span>
      </el-header>

      <el-main>

      </el-main>
    </el-container>
    <OverviewRightSide></OverviewRightSide>

  </el-container>
</template>

<script>
import OverviewRightSide from "../components/OverviewRightSide.vue";
export default {
  components: {OverviewRightSide},
  data() {
    return {
      form: {
        name: '',
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("//unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css");

.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
  text-align: left;
}
</style>
