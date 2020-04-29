<template>
  <div class="organization-container">
      <div class="content">
        <div class="left">
          <div class="search">
            <span><i class="el-icon-search"></i></span>
            <input type="text" placeholder="搜索">
          </div>
          <div class="menu">
            <el-row class="tac">
              <el-col :span="12">
                <el-menu
                  :default-active="activeIndex" router
                  :default-openeds="openeds"
                  class="el-menu-vertical-demo"
                  @open="handleOpen"
                  @close="handleClose">
                  <el-submenu index="1">
                    <template slot="title" >
                      <div class="title">
                          <span @click="clickButton()" class="company">乐播新瑞(北京)文化传媒有限公司</span>
                          <i class="el-icon-caret-top"  v-if="show"></i>
                          <i class="el-icon-caret-bottom" v-else></i> 
                      </div>
                    </template>
                    <ul>
                      <li v-for="(item,index) in FirstList" :key="index" :class="activeClass == index?'active':''" @click="IsActive(index)">
                          <span>{{item.depname}}</span>
                      </li>
                    </ul>
                  </el-submenu>
                </el-menu>
              </el-col>
            </el-row>
            <template>
              <el-dropdown trigger="click" placement='bottom' size="medium">
                  <span class="el-dropdown-link">
                    <i class="el-icon-s-tools"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown" class="select">
                    <el-dropdown-item>黄金糕</el-dropdown-item>
                    <el-dropdown-item>狮子头</el-dropdown-item>
                    <el-dropdown-item>螺蛳粉</el-dropdown-item>
                  </el-dropdown-menu>
              </el-dropdown>
            </template>
            
          </div>
        </div>
        
        <div class="right">
          <!-- <router-view></router-view> -->
          <Division :TwoList="TwoList" :id="changeTwoListId"></Division>
        </div>

      </div>
    
  </div>
</template>

<script>
import {divisionList} from '@/api/index';
import Division from "@/components/division";
export default {
  name: 'navigation',
  components:{
    Division
},
  data(){
    return{
       tabPosition: 'left',
       show:true,
       openeds:['1'],
       activeIndex:'/firstDivision',
       activeClass: 0,
       active:'active',
       status:'0',
       options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        FirstList:[],
        TwoList:[],
        changeTwoListId: 0,
    }
  },
   methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      clickButton(){
        if(this.show==true){
          this.show=false;
        }else{
          this.show=true
        }
        
      },
      //选择添加创建、编辑、删除部门
      select(){

      },
      IsActive(index) {
        this.activeClass = index;
        this.changeTwoListId = this.FirstList[index].id
        console.log(this.changeTwoListId)
        this.$router.replace({
          name: "firstDivision", // 这里通过name来引入router
          path: "/firstDivision",
          // query: {
          //   status:index+1
          // }
        });
      }
    },
  mounted(){
    divisionList().then(res=>{
        this.FirstList=res.data.data.FirstList;
        this.TwoList=res.data.data.TwoList;
        this.changeTwoListId=res.data.data.FirstList[0].id;
    })
  }
}
</script>
<style lang="scss" scoped>
*{
  margin:0;
  padding:0;
  list-style: none;
  text-decoration: none;
}
.organization-container{
  width:100%;
  height: 100%;
  background: #EAEEF7;
  overflow: hidden;
  .content{
    width:1320px;
    height:968px;
    margin:20px auto;
    // display: flex;
    .left{
      width:300px;
      height: 100%;
      margin-right:20px;
      float: left;
      background: #fff;
      .search{
        margin-top:12px;
        width: 100%;
        position:relative;
        span{
          display: inline-block;
          position:absolute;
          top:12px;
          left:20px;
        }
        input{
          width:276px;
          height: 40px;
          display:block;
          margin:0 auto;
          font-size:12px;
          outline: none;
          padding-left:30px;
          border:1px solid #E5E5E5;
        }

      }
      .menu{
        position: relative;
        ul{
          padding:2px;
          font-size:14px;
          li{
            width:100%;
            height:40px;
            line-height: 40px;
            padding:0 10px;
            :hover{
                cursor: pointer;
            }
          }
        }
      }
      .menu /deep/ .el-submenu__title{
        height:40px;
        line-height: 40px;
        font-weight: 550;
        padding-left:12px!important;
      }
      .menu .el-col{
        width:100%;
      }
      .el-menu{
        border:0;
        padding:0 10px;
      }
      .el-menu-item{
        height:40px;
        line-height: 40px;
      }
      .menu /deep/ .el-submenu__icon-arrow::before{
        content:"";
      }
      .menu /deep/ .el-dropdown{
        position: absolute;
        top:16px;
        right: 10px;
        i{
          font-size:16px;
          font-weight: 550;
          color: #3A454B;
        }
      }
      
      
    }
    .right{
      background: #fff;
      width:1000px;
      height: 100%;
      float: right;
    }
    .active{
      font-weight:600;
      color:#096DD9;
      background: #F0F4F7;
    }
    
    
  }
}

    
</style>