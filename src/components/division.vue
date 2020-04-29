<template>
    <div class="classify">
        <div class="left-menu">
            <h5>第一事业部</h5>
            <!-- <div id="app">
              <button  >点击展开/关闭</button>
              <transition name="draw">  
                  <div class="box"  v-show="boxshow"></div>
              </transition>
            </div> -->
            <ol>
              <li v-for="(item,i) in TwoList[id]" :key="i" :index="(1-'i').toString()" @click="toggle(item.pid)">
                  <p>
                    <span>{{item.depname}}（{{item.udep_count}}）{{item[0]}}</span>
                    <span v-if="item.child.length >= 1 || item.pid == 0">
                      <i class="el-icon-caret-top"  v-if="show"></i>
                      <i class="el-icon-caret-bottom" v-else></i> 
                    </span>
                    
                  </p>
                  <ul>
                    <li v-for="(items,index) in item.child" :key="index">
                      <p>{{items.depname}}</p>
                    </li>
                  </ul>
                   <!-- <template v-if="item">
		  		         <a href="javascript:void(0)" v-on:click='toggle(i)'>
		                    <i v-bind:class='[pItem.icon]'></i>
		                     {{item.depname}}（{{item.child.length}}）
                            <i class="down-arrow" v-bind:class="{'flip':hideIndex[i]==true}" ></i>
		  		         </a>	        
			  		    <ul v-if='pItem.items' class='sub-ul' v-bind:class="{'hide':hideIndex[i]==true}" v-bind:style="{height:(pItem.items.length)*32+'px'}">
			                <li v-for="(j,cItem) in pItem.items">
			                   <a href="javascript:void(0)" v-on:click='change(i+1,j+1)' v-bind:class="{'active':activeIndex==10*(i+1)+(j+1)}">{{cItem}}</a>
			                </li> 
			  		    </ul>	  	
  		    	     </template>
  		    	     <template v-else>
		  		         <a href="javascript:void(0)" v-on:click='change(i+1)' v-bind:class="{'active':activeIndex==10*(i+1)}">
		                    <i v-bind:class='[pItem.icon]'></i>
		                    {{pItem.name}}
		  		         </a>	  		           	
  		    	     </template> -->
                  <!-- <p>
                    {{item.depname}}（{{item.child.length}}）
                    
                  </p> -->
                  
              </li>
            </ol>
            <!-- <el-row class="tac">
              <el-col :span="12">
                <el-menu
                  class="el-menu-vertical-demo"
                  :default-openeds="openeds"
                  @open="handleOpen"
                  @close="handleClose">
                  <el-submenu index="1"> -->
                    <!-- <template slot="title">
                      <div @click="clickButton()" class="all">
                        <span>全部</span>
                        <i class="el-icon-caret-top"  v-if="show"></i>
                        <i class="el-icon-caret-bottom" v-else></i> 
                      </div>
                      
                    </template> -->
                    <!-- <el-menu-item-group>
                      <template slot="title"></template> -->
                      <!-- <el-menu-item index="1-1">总经理</el-menu-item>
                      <el-menu-item index="1-2">运营</el-menu-item>
                      <el-menu-item index="1-3">音乐合作拓展</el-menu-item>
                      <el-menu-item index="1-4">商务渠道</el-menu-item> -->
                      <!-- <el-menu-item v-for="(item,i) in TwoList[id]" :key="i" :index="(1-'i').toString()">
                          {{item.depname}}（{{item.child.length}}）
                      </el-menu-item>
                    </el-menu-item-group>
                  </el-submenu>
                </el-menu>
              </el-col>
            </el-row> -->
        </div>
        <div class="right-content">
            <div class="title">
                <p>全部</p>
                <el-dropdown trigger="click" placement='bottom' size="medium">
                  <span class="el-dropdown-link">
                    <i class="el-icon-s-tools"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown" class="select">
                    <el-dropdown-item>创建部门</el-dropdown-item>
                    <el-dropdown-item>编辑部门</el-dropdown-item>
                    <el-dropdown-item>删除部门</el-dropdown-item>
                    <el-dropdown-item>邀请成员</el-dropdown-item>
                  </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="list">
                <el-table
                    :data="tableData"
                    :show-header="false"
                    style="width: 100%">
                    <el-table-column
                        prop="image"
                        width="80">
                        <template   slot-scope="scope">            
                            <img src="../assets/404_images/imgurl.png"  min-width="40" height="40" />
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        >
                    </el-table-column>
                     <el-table-column
                        prop="address"
                        width="100"
                        >
                        <template slot-scope="scope">
                           <el-dropdown trigger="click" placement='bottom' size="medium">
                              <span class="el-dropdown-link">
                                待审核
                                <i class="el-icon-arrow-down"></i>
                              </span>
                              <el-dropdown-menu slot="dropdown" class="select">
                                <el-dropdown-item>管理员</el-dropdown-item>
                                <el-dropdown-item>成员</el-dropdown-item>
                                <el-dropdown-item>停用账号</el-dropdown-item>
                                <el-dropdown-item>删除账号</el-dropdown-item>
                              </el-dropdown-menu>
                          </el-dropdown>
                          </template>
                    </el-table-column>

                </el-table>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'division',
     data(){
        return{
            openeds:['1'],
            show:true,
            boxshow:false,
            activeIndex:10,
    	      hideIndex:[],
            tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
        }
    }, 
    created(){
      var path = this.$route.query.status;
      console.log('path',path)
    },
    mounted(){
      console.log(this.TwoList,this.id)
    },
    props: ["TwoList","id"],
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      clickButton(i){
        console.log('i',i)
        if(this.show==true){
          this.show=false;
        }else{
          this.show=true
        }
        
      },

      change:function(i,j)
		{
            i=i||0;
            j=j||0;
            this.activeIndex=i*10+j;
		},
		toggle(id){
      console.log('i', id)
		  if(id==0){
        
      }
		}
    },
    
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
    display: flex;
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
    .all{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
     ol{
          padding:2px;
          font-size:14px;
          li{
            width:100%;
            // height:40px;
            // line-height: 40px;
            padding:0 10px;
            :hover{
                cursor: pointer;
            }
          }
        }


.box{
    height:200px;width: 200px;
    background-color:black;
}
.draw-enter-active, .draw-leave-active {
    transition: all 1s ease;
}
.draw-enter, .draw-leave-to /* .fade-leave-active below version 2.1.8 */ {
    height: 0;
}
}
.left-menu /deep/ .el-submenu__icon-arrow::before{
        content:"";
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
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.right-content{
   width:800px;
   height:100%;
   padding:0 20px;
   .title{
       height: 76px;
       display: flex;
       justify-content: space-between;
      align-items: center;
       border-bottom:solid 1px rgba(244,245,247,1);;
       font-weight: 550;
       padding:0 10px; 
       i{
         font-weight: 550;
         font-size:16px;  
       }  
       /deep/ .el-dropdown{
           width:16px;
           height: 16px;
           span{
               width: 100%;
               height: 100%;
           }
       }

   }
   
}
    
</style>