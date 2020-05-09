<template>
  <div class="classify">
    <div class="left-menu">
      <h5>{{rightHeader}}</h5>
      <ol>
        <li v-for="(item,i) in TwoList" :key="i">
          <p @click="toggle(item)" v-if="item.pid== 0" :class="activeClass == item.pid?'active':''">
            <span>{{item.depname}}（{{item.udep_count}}）</span>
            <span v-if="item.child.length >= 1 || item.pid == 0">
              <i class="el-icon-caret-top" v-if="item.show"></i>
              <i class="el-icon-caret-bottom" v-else></i>
            </span>
          </p>
          <p @click="toggle(item)" v-else-if="item.pid != 0 && rightListShow" :class="activeClass == item.id?'active':''">
            <span>{{item.depname}}（{{item.udep_count}}）</span>
            <span v-if="item.child.length >= 1 || item.pid == 0">
              <i class="el-icon-caret-bottom" v-if="!item.show"></i>
              <i class="el-icon-caret-top" v-else></i>
            </span>
          </p>
          <ul v-if="item.show">
            <li v-for="(items,index) in item.child" :key="index">
              <p @click="toggle(items)" :class="activeClass == items.id?'active':''">{{items.depname}}</p>
            </li>
          </ul>
        </li>
      </ol>
    </div>
    <div class="right-content">
      <div class="title">
        <p>全部</p>
        <el-dropdown trigger="click" placement="bottom" size="medium" @command="Secondary">
          <span class="el-dropdown-link">
            <i class="el-icon-s-tools"></i>
          </span>
          <el-dropdown-menu slot="dropdown" class="select">
            <el-dropdown-item><el-button type="text" @click="openCreate()">创建部门</el-button></el-dropdown-item>
            <el-dropdown-item><el-button type="text" @click="openEdit()">编辑部门</el-button></el-dropdown-item>
            <el-dropdown-item><el-button type="text" @click="open">删除部门</el-button></el-dropdown-item>
            <el-dropdown-item command="Inmembers">
              <el-button type="text">邀请成员</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="list">
        <el-button type="text" @click.stop="info=true">
          <el-table :data="tableList" :show-header="false" style="width: 100%"  @row-click="handleEdit">
            <!--  -->
            <el-table-column prop="image" label="图片" width="80">
              <template slot-scope="scope">
                <img v-if="scope.row.img" :src="scope.row.img" min-width="40" height="40" />
                <img v-else src="../assets/404_images/imgurl.png" min-width="40" height="40" />
              </template>
            </el-table-column>
            <el-table-column prop="nickname" width="100"></el-table-column>
            <el-table-column prop="depname"  width="180"></el-table-column>
            <el-table-column prop="position"  width="280"></el-table-column>
            <el-table-column prop="position"  width="100" fixed="right" >
            
              <template slot-scope="scope" >
                <div @click.stop="">
                  <el-dropdown trigger="click" placement='bottom' size="medium">
                  <!-- <el-table-column prop="ident" class="el-dropdown-link el-button--lightblue dropbutton"> -->
                          <span>{{scope.row.ident}}<i class="el-icon-arrow-down el-icon--right"></i></span>
                          <el-dropdown-menu slot="dropdown" class="select">
                            <div>
                                <el-dropdown-item v-for="(i,j) in scope.row.role" :key="j"><el-button type="text" @click="revise(scope.row.user_id,scope.row.old_role_id,i.type,i.role_id,scope.row.dep_id)">{{i.ident}}</el-button></el-dropdown-item>
                            </div>
                          </el-dropdown-menu>
                  </el-dropdown>
                </div>
                      <!-- </el-table-column> -->
              </template>
          
             </el-table-column>
          </el-table>
        </el-button>
      </div>
    </div>
    <el-dialog title="创建部门" :visible.sync="dialogFormVisible" width="38%" center>
      <el-form :model="form">
        <!-- <h5>创建部门</h5> -->
        <el-form-item>
          <span>名称</span>
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <span>角色</span>
          <el-select v-model="form.region" placeholder="可搜索角色">
            <el-option v-for="(item,index) in creadtRole" :label="item.rolename" :value="item.id" v-show="item.rolename != '全部'" :key="index"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="createDepartment()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑部门 -->
    <el-dialog title="编辑部门" :visible.sync="edit" width="38%" center>
      <el-form :model="form">
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
        <el-button type="primary" @click="editDepartment()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 邀请成员弹窗 -->
    <el-dialog title="邀请成员" :visible.sync="invite" width="800px" height="300px" :close-on-click-modal="false">
     <InviteMembers ref="InviteMember"></InviteMembers>
    </el-dialog>
    <!-- 查看个人信息弹窗 -->
    <el-dialog title="" :visible.sync="info">
      <div class="cont">
        <div class="top">
          <div class="name">
              <img :src="img" alt="" v-if="img">
              <img v-else src="../assets/404_images/imgurl.png" alt="">
              <p>
                <span>{{nickname}}</span>
                <i>{{depname}}</i>
              </p>
          </div>
          <div class="phone">
            <p><i class="el-icon-phone"></i>{{phone}}</p>
            <p><i class="el-icon-position"></i>{{email}}</p>
          </div>
        </div>
        <div class="bottom">
          <b>详细资料</b>
          <ul>
            <li>
              <span>姓名</span>
              <i>{{nickname}}</i>
            </li>
            <li>
              <span>手机</span>
              <i>{{phone}}</i>
            </li>
            <li>
              <span>邮箱</span>
              <i>{{email}}</i>
            </li>
            <li>
              <span>部门</span>
              <i>{{all_dep_name}}</i>
            </li>
            <li>
              <span>职位</span>
              <i>{{position}}</i>
            </li>
          </ul>

        </div>
      </div>

    </el-dialog>
  </div>
</template>
<script>
import InviteMembers from '@/views/organization/Invitemembers'
import { staffList,AJuDepC,create,AJuDepCDe,AJuDepCUp,AJuRolsUp } from "@/api/index";
export default {
  name: "division",
  components:{InviteMembers},
  data() {
    return {
      openeds: ["1"],
      boxshow: false,
      rightListShow: true,
      rightListChildShow: false,
      show: false,
      activeIndex: 10,
      activeClass: 0,
      currentIndex: [],
      hideIndex: [],
      rightList: [],
      dialogFormVisible: false,
      invite: false,
      edit: false,
      info:false,
      formLabelWidth: "120px",
      changeId:0,
      arr:[],
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        named: [{ required: true, message: "请输入名称", trigger: "blur" }],
        role: [{ required: true, message: "请选择类型", trigger: "blur" }]
      },
      all_dep_name:'',
      depname:'',
      email:'',
      img:'',
      nickname:'',
      phone:'',
      position:'',
      creadtRole:[],
      editRole:[],
      parentId:0,
      roleList:[]

    };
  },
  props: ["TwoList","rightHeader","changeTwoListId","tableList"],
  created() {
    this.getList();
    var path = this.$route.query.status;
    // console.log(path)
  },
  mounted() {
    this.currentIndex=this.TwoList;
    var path = this.$route.query.status;
    // console.log(path)
  },
  updated(){
    // console.log(this.TwoList);
  },
  methods: {
    //删除部门
    deleteDepartment(){
      AJuDepCDe({
        dep_id: this.changeId
      }).then(res=>{
        this.$parent.getData()
      })
    },
    //
    Secondary(command) {
      switch(command){
        case 'Inmembers':
          this.invite=true;
          //获取邀请部门的id
          let selectdepid=this.changeId;
          AUsRegs({dep_id:selectdepid}).then(res=>{
            if(res.data.code==0){
              this.$refs['InviteMember'].CopyUrl=res.data.data;
          }else{
            this.$message({
              type:'error',
              message:res.data.msg
            })
          }
        })
        break;
      }
    },
    //修改成员身份
    revise(id,OroleId,type,roleId,dep_id){
      AJuRolsUp({
        user_id:id,
        old_role_id:OroleId,
        dep_id:dep_id,
        type:type,
        role_id:roleId
      }).then(res=>{
      //   staffList({
      //     dep_id:this.changeId
      //   }).then(res => {
      //     if(res.data.code==0){
      //       this.$parent.tableList = res.data.data;
      //     }else{
      //       this.$parent.tableList=res.data.data;
      //     }
      //     // this.tableList = res.data.data
      //     // this.$emit('tableList', arr)
      //   // this.$set(this.tableList,0,res.data.data)
      // });
      })
    },
    drop(){
      
    },
    //获取创建部门角色
    openCreate(){
      this.dialogFormVisible=true;
      AJuDepC({
        dep_id:this.changeId
      }).then(res=>{
        this.creadtRole=res.data.data;
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
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    //折叠展开的箭头转换
    clickButton(i) {
      console.log("i", i);
      if (this.show == true) {
        this.show = false;
      } else {
        this.show = true;
      }
    },
    //请求人员数据
    getList() {
      // console.log(this.changeTwoListId)
      AJuDepC({
        dep_id: this.changeTwoListId
      }).then(res=>{
        console.log('res',res)
      })
      // staffList({
      //   dep_id:this.changeTwoListId
      // }).then(res => {
      //   this.tableData = res.data.data
      //   console.log("www", this.tableData);
      // });
    },
    //查看人员信息
    handleEdit(row) {
      console.log("row", row.role);
      this.all_dep_name=row.all_dep_name;
      this.depname=row.depname;
      this.email=row.email;
      this.img=row.img;
      this.nickname=row.nickname;
      this.phone=row.phone;
      this.position=row.position;
      this.roleList=row.role;
    },
    //获取右侧列
    toggle(item) {
      this.changeId=item.id;
      this.parentId=item.pid;
      console.log('parentId',item.pid)
      if (item.pid === 0) {
        this.activeClass = item.pid;
        this.rightListShow = !item.show;
        this.$set(item, 'show', !item.show);
        if(!item.show){
          this.TwoList.map((v,i)=>{
            if(i>0){
              this.$set(this.TwoList[i], 'show', false);
            }
          })
        }
        // this.rightListChildShow = !item.show;
      } else {
        this.activeClass = item.id;
        this.$set(item, 'show', !item.show);
      }
      staffList({
        dep_id:item.id
      }).then(res => {
        if(res.data.code==0){
           this.$parent.tableList = res.data.data;
        }else{
          this.$parent.tableList=res.data.data;
        }
        // this.tableList = res.data.data
        // this.$emit('tableList', arr)
        // this.$set(this.tableList,0,res.data.data)
      });
    },
    //创建部门
    createDepartment(){
      console.log('id',this.TwoList[0].id)
      if(!this.changeId){
        this.changeId = this.TwoList[0].id;
      }
      this.dialogFormVisible = false
      create({
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
      }
  }
};
</script>
<style lang="scss" scoped>
* {
  list-style: none;
}
:focus {
  outline:0;
}
.el-button--text {
  color:#606266;
}
.el-dropdown-menu{
  li:hover{
    background: #ecf5ff;
    .el-button--text{
        color: #409EFF;
    }
  }
}
.cell img{
  border-radius: 50%;
}
.list{
  overflow: auto;
  height:800px;
}
.el-dropdown-link{
  color:#3A454B!important;
}
.el-button--text{
  color:black;
}

.classify {
  width: 100%;
  height: 968px;
  height: 100%;
  display: flex;
}
.left-menu {
  width: 200px;
  height: 100%;
  border-right: solid 1px #ccc;
  h5 {
    width: 100%;
    height: 30px;
    line-height: 30px;
    margin-left: 23px;
  }
  .all {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  ol {
    padding: 0 12px;
    font-size: 14px;
    .active{
      font-weight:600;
      color:#096DD9;
      background: #F0F4F7;
    }
    >li {
      width: 100%;
      // padding:0 5px;
      :hover {
        cursor: pointer;
        // background: #F0F4F7;
      }
      >p {
        display: flex;
        justify-content: space-between;
        padding:10px 10px;
      }
    }
    ul{
      >li{
        :hover {
        cursor: pointer;
        background: #F0F4F7;
      }
      >p{
        padding:0 10px;
      }
      }
    }

  }

  .box {
    height: 200px;
    width: 200px;
    background-color: black;
  }
  .draw-enter-active,
  .draw-leave-active {
    transition: all 1s ease;
  }
  .draw-enter, .draw-leave-to /* .fade-leave-active below version 2.1.8 */ {
    height: 0;
  }
}
.left-menu /deep/ .el-submenu__icon-arrow::before {
  content: "";
}
.left-menu /deep/ .el-col {
  width: 100%;
}
.left-menu /deep/ ul > li {
  min-width: 176px;
  height: 40px;
  line-height: 40px;
}
.left-menu /deep/ .el-menu-item-group__title {
  height: 0;
}
.left-menu /deep/ .el-submenu__title {
  min-width: 176px;
  height: 40px;
  padding-left: 40px !important;
  line-height: 40px;
  span {
    color: #409eff;
  }
}
.el-menu {
  border: 0;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
//弹框表格居中
.el-form {
  width: 300px;
  margin: 0 auto;
  .el-input {
    width: 240px;
  }
  span {
    margin-right: 12px;
  }
}
.el-select {
  width: 240px;
}
.right-content {
  width: 800px;
  height: 100%;
  padding: 0 20px;
  .title {
    height: 76px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: solid 1px rgba(244, 245, 247, 1);
    font-weight: 550;
    padding: 0 10px;
    p{
      color:#3A454B;
    }
    i {
      font-weight: 550;
      font-size: 16px;
    }
    /deep/ .el-dropdown {
      width: 16px;
      height: 16px;
      span {
        width: 100%;
        height: 100%;
      }
    }
  }

}
  .cont{
    padding:20px 40px;
    .top{
      display: flex;
      justify-content: space-between;
      padding:20px 0;
      border-bottom: solid 1px #ccc;
      .name{
        display: flex;
        align-items: center;
        img{
          width:64px;
          height: 64px;
          border-radius: 50%;
        }
        p{
          display: flex;
          flex-direction: column;
          margin-left:20px;
          line-height: 1.5;
          i{
            font-style: normal;
            color:#999999;
          }
        }
      }
      .phone{
        text-align: right;
        line-height: 1.5;
        color: #999999;
      }
    }
    .bottom{
        padding-top:20px;
      ul{
        display: flex;
        flex-wrap:wrap;
        padding-top:20px;
        li{
          width:33%;
          height: 50px;
          span{
            margin-right: 10px;
            color: #999999;
          }
          i{
            font-style: normal;
          }
        }
      }
    }
  }
</style>
