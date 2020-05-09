<template>
  <div class="organization-container">
      <div class="content">
        <div class="left">
          <div class="search">
            <span><i class="el-icon-search"></i></span>
            <input type="text" placeholder="搜索" @keyup.enter="searchEnterFun">
            <p><i class="el-icon-circle-close" style="float:right"></i></p>
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
                    <el-dropdown-item><el-button type="text" @click="openCreate()">创建部门</el-button></el-dropdown-item>
                    <el-dropdown-item><el-button type="text" @click="openEdit()">编辑部门</el-button></el-dropdown-item>
                    <el-dropdown-item><el-button type="text" @click="open">删除部门</el-button></el-dropdown-item>
                  </el-dropdown-menu>
              </el-dropdown>
            </template>
            
          </div>
        </div>
        
        <div class="right">
          <!-- <router-view></router-view> -->
          <Division :TwoList="TwoList[changeTwoListId]" :rightHeader="rightHeader" :changeTwoListId="changeTwoListId" :tableList="tableList"></Division>
          <!-- <Division :TwoList="TwoList" :id="changeTwoListId"></Division> -->
        </div>
      </div>
      <!-- //创建部门 -->
    <el-dialog :visible.sync="dialogFormVisible" width="38%" center title="创建部门">
          <el-form :model="form" :rules="rules">
            <!-- <h5>创建部门</h5> -->
            <el-form-item prop='named'>
              <span>名称</span>
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop='role'>
              <span>角色</span>
              <el-select v-model="form.region" placeholder="可搜索角色">
                <el-option v-for="(item,index) in roleArr" :label="item.rolename" :value="item.id" :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="createDepartment()">确 定</el-button>
          </div>
    </el-dialog>
    <!-- 编辑部门 -->
     <el-dialog :visible.sync="edit" width="38%" center title="编辑部门">
          <el-form :model="form">
            <!-- <h5>创建部门</h5> -->
            <el-form-item>
              <span>名称</span>
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <span>角色</span>
              <el-select v-model="form.region" placeholder="可搜索角色">
                  <el-option v-for="(item,index) in editRole" :label="item.rolename" :value="item.id" v-show="item.rolename != '全部'" :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
          </div>
    </el-dialog>
  </div>
</template>

<script>
import {AJuDeps,AJuDepC,staffList,create,ARoLi,AJuDepCDe} from '@/api/index';
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
       nickname:'',
       tableList: [],
       roleArr:[],
       editRole:[],
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
        rightHeader: "",
        dialogFormVisible: false,
        edit:false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
         rules:{
        named:[{required: true, message: '请输入名称', trigger: 'blur'}],
        role :[{required: true, message: '请选择类型', trigger: 'blur'}]
      }
        
    }
  },
    created(){
      this.getRole()
    },
    mounted(){
      this.getData()
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
      getData(){
        AJuDeps().then(res=>{
          this.FirstList=res.data.data.FirstList;
          this.TwoList=res.data.data.TwoList;
          this.changeTwoListId=res.data.data.FirstList[0].id;
          this.rightHeader = res.data.data.FirstList[0].depname
          staffList({   
            dep_id:this.changeTwoListId
          }).then(res=>{
            this.tableList = res.data.data
          })
          console.log(this.tableList)
      })
      },
      //选择添加创建、编辑、删除部门
      IsActive(index) {
        this.activeClass = index;
        this.changeTwoListId = this.FirstList[index].id
        this.rightHeader = this.FirstList[index].depname
        // this.$router.replace({
        //   name: "firstDivision", // 这里通过name来引入router
        //   path: "/firstDivision",
        //   // query: {
        //   //   status:this.changeTwoListId
        //   // }
        // });
        this.addDivision()
      },
      //创建部门
    createDepartment(){
      if(this.changeTwoListId){
        console.log('id',this.changeTwoListId)
        this.changeTwoListId = 0;
      }
      this.dialogFormVisible = false;
      create({
        dep_id: this.changeTwoListId,
        depname: this.form.name,
        role_id: this.form.region,
      }).then(res=>{
        this.getData()
        this.form = {
          name: "",
          region: "",
          date1: "",
          date2: "",
          delivery: false,
          type: [],
          resource: "",
          desc: ""
        }
      })
    },
    //编辑部门
     editDepartment(){
      if(!this.changeId){
        this.changeId = this.TwoList[0].id;
      }
      this.edit = false;
      AJuDepCUp({
        dep_id: this.changeId,
        depname: this.form.name,
        role_id: this.form.region,
      }).then(res=>{
         this.form = {
          name: "",
          region: "",
          date1: "",
          date2: "",
          delivery: false,
          type: [],
          resource: "",
          desc: ""
        }
      })
    },
    //删除部门
    deleteDepartment(){
      AJuDepCDe({
        dep_id: this.changeTwoListId
      }).then(res=>{
        this.getData()
      })
    },
    //确认是否删除部门
    open() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteDepartment()
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
    addDivision(){
      staffList({   
        dep_id:this.changeTwoListId
      }).then(res=>{
        this.tableList = res.data.data
      })
    },
     //获取创建部门角色
    openCreate(){
      this.dialogFormVisible=true;
      AJuDepC({
        dep_id:0
      }).then(res=>{
        this.roleArr=res.data.data;
      })
    },
    //获取编辑部门角色
    openEdit(){
      this.edit=true;
      AJuDepC({
        dep_id:this.parentId
      }).then(res=>{
        console.log('res',res)
        this.editRole=res.data.data;
      })
    },
      //提交
    submitForm(formName) {
      
    },
    //搜索
    searchEnterFun(e){
      var keyCode = window.event? e.keyCode:e.which;
      var val = e.target.value;
      console.log('回车搜索',keyCode,e);
      if(keyCode == 13 && val){
            staffList({
              dep_id:this.changeTwoListId,
              nickname:val
            }).then(res => {
              this.tableList = res.data.data
              console.log("www", this.tableData);
            });
      }
    },
    //角色列表
    getRole(){
      ARoLi().then(res=>{
        if(res.data.code==0){
          this.roleArr=res.data.data;
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
*{
  list-style: none;
  text-decoration: none;
}
:focus {
  outline:0;
}
.el-button--text {
  color:#606266;
}
// .el-dropdown-menu{
//   li:hover{
//     background: #ecf5ff;
//     .el-button--text{
//         color: #409EFF;
//     }
//   }
// }

.el-dropdown-menu{
  li:nth-of-type(1) button{
      color:#096DD9;
    }
  li:nth-of-type(3) button{
    color:#F56C6C;
  }
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
        p{
          position:absolute;
          right:20px;
          top:14px;
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
  //弹框表格居中
.el-form{
  width:300px;
  margin:0 auto;
  .el-input{
    width:240px;
  }
  span{
    margin-right:12px;
  }
}
.el-select{
  width:240px;
}
}

    
</style>