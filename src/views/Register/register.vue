<template>
  <div class="Register">
    <div class="regpage clearfix">
      <div class="regtitle clearfix">
        <el-avatar :size="32" :src="avturl" class="left"></el-avatar>
        <p class="left">
          <span>{{inviter}}</span>邀请你加入
        </p>
      </div>
      <div class="companyname">
        <p class="bigname">乐播新瑞（北京）文化传媒有限公司</p>
        <p class="alerinfo">申请加入使用钉钉复工复产，无接触在线办公</p>
      </div>
      <div class="writeregs">
        <el-form label-position="top" :model="Regisform" ref="Regisform" :rules="RegisRule">
          <el-form-item label="真实姓名" prop="name">
            <el-input v-model="Regisform.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="tellpone">
            <el-input v-model="Regisform.tellpone"></el-input>
          </el-form-item>
          <el-form-item prop="Vertcode">
            <el-input v-model="Regisform.Vertcode" placeholder="请输入验证码">
              <template slot="append">获取验证码</template>
            </el-input>
          </el-form-item>
          <el-form-item label="选择部门" prop="deptname">
            <el-select v-model="Regisform.deptname" placeholder="请选择部门">
              <el-option
                v-for="item in Regisform.departlist.child"
                :key="item.id"
                :label="item.depname"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="position">
            <el-input v-model="Regisform.position" placeholder="填写职位"></el-input>
          </el-form-item>
          <el-form-item label="设置密码" prop="setpassword">
            <el-input v-model="Regisform.setpassword" type="password" placeholder="输入密码"></el-input>
          </el-form-item>
          <el-form-item prop="confpassword">
            <el-input v-model="Regisform.confpassword" type="password" placeholder="确认密码"></el-input>
          </el-form-item>
        </el-form>
        <p class="alertinfo">*密码为6-18位 ，必须包含大小写字母和数字</p>
        <p class="subapply">
          <button type="button" @click="SubApply">提交申请</button>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { validpass,validTellpone} from "@/utils/validate";
import {getARegi,ARegi} from '@/api/index'
export default {
  name: "Register",
  data() {
    let Aginvalidpass=(rule, value, callback)=>{
      if (value === "") {
        callback(new Error("请输入确认密码"));
      } else if (value !== this.Regisform.setpassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      inviter: "唐璐",
      nick_id:"",
      avturl:
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      Regisform: {
        name: "",
        tellpone: "",
        Vertcode: "",
        position: "",
        setpassword: "",
        confpassword: "",
        deptname:"",
        // deptnameid:"",
        departlist:{
          // depname:"研发部",
          // id:16,
          // child:[
          //   {id: 17, depname: "后端", child: Array(0)},
          //   {id: 18, depname: "前端", child: Array(0)},
          //   {id: 19, depname: "UI", child: Array(0)},
          // ]
        },
      },
      RegisRule: {
        name:[{required:true,message:"请输入真实姓名",trigger:'blur'}],
        tellpone:[{validator:validTellpone,trigger:'blur'}],
        Vertcode:[{required:true,message:"请输入验证码",trigger:'blur'}],
        deptname:[{required:true,message:'请选择部门',trigger:'change'}],
        position:[{required:true,message:"请填写职位",trigger:'blur'}],
        setpassword: [{ validator: validpass, trigger: "blur" }],
        confpassword: [{ validator: Aginvalidpass, trigger: "blur" }]
      }
    };
  },
  mounted(){
    let params={
      Invi:this.$route.query.Invi
    }
    getARegi(params).then(res=>{
      if(res.data.code==0){
        var revicedata=res.data.data;
        this.inviter=revicedata.nickname;
        this.avturl=revicedata.img;
        this.nick_id=revicedata.nick_id;
        this.Regisform.departlist=revicedata.dep_list
      }else{
        this.$message({
          type:'warning',
          message:res.data.msg
        })
      }
    })
  },
  methods: {
    //提交注册
    SubApply() {
      this.$refs["Regisform"].validate(valid => {
        if (valid) {
          let parmars={
            nickname:this.Regisform.name,
            phone:this.Regisform.tellpone,
            position:this.Regisform.position,
            nick_id:this.nick_id,
            password:this.Regisform.setpassword,
            dep_id:this.Regisform.deptname
          }
          ARegi(parmars).then(res=>{
            if(res.data.code==0){
              this.$message({
                type:'success',
                msg:"注册成功"
              })
            }else{
              this.$message({
                type:'error',
                msg:res.data.msg
              })
            }
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss">
.Register {
  width: 100%;
  height: 100%;
  position: relative;
  .regpage {
    position: absolute;
    width: 560px;
    height: 904px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.1);
    border-radius: 30px;
    top: 50%;
    left: 50%;
    margin-left: -280px;
    margin-top: -452px;
    background: url("../../assets/images/registerban.png") no-repeat;
    padding: 20px;
    .regtitle {
      font-size: 16px;
      line-height: 32px;
      color: #ffffff;
      p {
        margin-left: 10px;
        span {
          margin-right: 10px;
        }
      }
    }
    .companyname {
      text-align: center;
      margin: 40px 0;
      p.bigname {
        color: #ffffff;
        font-weight: bold;
        font-size: 24px;
      }
      p.alerinfo {
        font-size: 16px;
        color: #eaeef7;
        margin-top: 20px;
      }
    }
    .writeregs {
      width: 100%;
      height: 682px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 12px 0px rgba(9, 109, 217, 0.1);
      border-radius: 4px;
      padding: 30px;
      .el-form--label-top .el-form-item__label {
        padding: 0;
        color: #096dd9;
        font-weight: 400;
        line-height: 28px;
        padding-left: 10px;
      }
      .el-input__inner {
        border: 0;
        border-bottom: 1px solid #eee;
        padding: 0 10px;
        border-radius: inherit;
        font-size: 16px;
        color: #333333;
        font-weight: 400;
      }
      .el-input__inner::placeholder {
        font-size: 16px;
        color: #999999;
      }
      .el-select {
        width: 100%;
        i {
          font-size: 16px;
        }
      }
      .el-input-group__append {
        background: none;
        border: 0;
        border-bottom: 1px solid #eee;
        border-radius: 0;
        color: #096dd9;
        font-weight: 400;
        cursor: pointer;
      }
      .el-form-item__error{
          left: 10px;
      }
      .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before{
          display: none;
      }
    }
    .alertinfo {
      font-weight: 400;
      font-size: 12px;
      color: #999999;
      padding-left: 10px;
    }
    .subapply {
      text-align: center;
      margin: 30px 0 10px 0;
      button {
        width: 320px;
        height: 56px;
        border: 0;
        background: rgba(9, 109, 217, 1);
        box-shadow: 0px 0px 12px 0px rgba(9, 109, 217, 0.1);
        border-radius: 4px;
        font-weight: 400;
        font-size: 16px;
        color: #ffffff;
      }
    }
  }
}
@media (max-width: 560px) {
  #app {
    height: auto;
    .Register {
      height: auto;
      position: initial;
      .regpage {
        width: 100%;
        position: initial;
        margin: 0;
        top: 0;
        left: 0;
        border-radius: 0;
        padding: 10px;
        background-size: 100%;
        .regtitle {
          font-size: 14px;
        }
        .companyname {
          margin: 30px 0;
          p.bigname {
            font-size: 20px;
          }
          p.alerinfo {
            font-size: 14px;
          }
        }
        .writeregs {
          .el-input__inner,
          .el-input__inner::placeholder {
            font-size: 14px;
          }
          .subapply {
            button {
              width: 100%;
              height: 40px;
            }
          }
        }
      }
    }
  }
}
@media (max-width: 375px) {
  .Register {
    .regpage {
      p.bigname {
        font-size: 18px !important;
      }
    }
  }
}
</style>