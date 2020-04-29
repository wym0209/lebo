<template>
    <div class="classify">
       <!-- <Division></Division> -->
        <div class="left-menu" v-for="(item,index) in getData" :key="index">
            <h5>第一事业部</h5>
            <el-row class="tac">
              <el-col :span="12">
                <el-menu
                  class="el-menu-vertical-demo"
                  :default-openeds="openeds"
                  @open="handleOpen"
                  @close="handleClose">
                  <el-submenu index="1">
                    <template slot="title">
                      <span>全部</span>
                      <i class="el-icon-caret-top"></i>
                    </template>
                    <el-menu-item-group>
                      <template slot="title"></template>
                      <el-menu-item index="1-1">总经理</el-menu-item>
                      <el-menu-item index="1-2">运营</el-menu-item>
                      <el-menu-item index="1-3">音乐合作拓展</el-menu-item>
                      <el-menu-item index="1-4">商务渠道</el-menu-item>
                    </el-menu-item-group>
                  </el-submenu>
                </el-menu>
              </el-col>
            </el-row>
        </div>
        <div class="right-content">

        </div>
    </div>
</template>
<script>
import Division from "@/components/division";
import {divisionList} from '@/api/index';
export default {
    name:'firstDivision',
    data(){
      return{
          openeds:['1'],
          getData:[],
          path:''
      }
    }, 
    components:{
      Division
    },
    created(){
       var path = this.$route.query.status;
      console.log('path',path)
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    mounted(){
       var path = this.$route.query.status;
      divisionList().then(res=>{
        console.log('res',res)
        if(this.path==2){
          this.getData=res.data.data.TwoList;
        }
        
    })
    }
}
</script>
<style lang="scss" scoped>
*{
    margin:0;
    padding:0;
    list-style: none;
}
.classify{
    width:100%;
    height: 968px;
}
.left-menu{
    width:200px;
    height: 100%;
    border-right:solid 1px #ccc;
    h5{
        width:100%;
        height:81px;
        line-height: 81px;
        margin-left:23px;
    }
}
.left-menu /deep/ .el-col{
    width:100%;
}
.left-menu /deep/ ul>li{
    min-width:176px;
    height:40px;
    line-height: 40px;
}
.left-menu /deep/ .el-menu-item-group__title{
    height:0;
}
.left-menu /deep/ .el-submenu__title{
    min-width:176px;
    height:40px;
    padding-left:40px!important;
    line-height: 40px;
    span{
        color:#409EFF;
    }
}
.el-menu{
        border:0;
}
    
</style>