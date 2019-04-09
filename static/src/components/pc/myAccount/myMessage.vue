<template>
  <div class="message-div" v-loading.body="loading">
    <ui-title title="站内信"></ui-title>
    <div class="message-table">
      <!--表格-->
      <el-table :data="tableList" class="home-el-table message-el-table">
        <div slot="empty" class="table-empty">
          <img src="https://aliyunsso.edspay.com/web/myAccount/null-state_03.png"/>
        </div>class="aaa"
        <el-table-column align="center" width=60>
          <template scope="scope">
            <el-checkbox-group v-model="checkedMessage" @change="handleCheckedMessageChange">
             
                <el-checkbox :label="scope.row.id" :key="scope.row.id" ></el-checkbox>
             
              
            </el-checkbox-group>
          </template>
        </el-table-column>
        <el-table-column prop="title" align="left" padding="0" label="标题" width=150>
        </el-table-column>
        <el-table-column prop="content" align="center" label="内容" width=300></el-table-column>
        <el-table-column prop="addTime" align="center" label="时间" width=150>
          <template scope="scope">
            <span class="time_color">
            {{scope.row.addTime.split(" ")[0]}}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="status" align="center" label="状态">
          <template scope="scope">
            <span v-if="scope.row.status == '1'" class="read">已读</span>
            <span v-else class="unRead">未读</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" align="center" label="操作">
          <template scope="scope">
            <span @click="isDelete = true;deleteId = scope.row.id" class="delete">删除</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="allSelect">
        <span><el-checkbox :indeterminate="isIndeterminate"  v-model="checkAll" id="checkAll" @change="handleCheckAllChange">全选</el-checkbox></span>
        <el-button class="selectBtn" @click="ifOpenDelete">删除</el-button>
        <el-button class="selectBtn" @click="markRead(1)">标记已读</el-button>
        <el-button class="selectBtn" @click="markRead(0)">标记未读</el-button>
      </div>
      <!-- 分页 -->
      <div class="fenye" v-if="tableList.length">
        <el-pagination
          layout="prev, pager, next"
          :page-count="pageSize"
          :current-page="curPage"
          @current-change="changePage">
        </el-pagination>
      </div>
    </div>
    <!--删除提示-->
    <el-dialog
      :visible.sync="isDelete"
      size="tiny"
      class="delete-dialog">
      <div class="delete-div">
        <div class="delete-icon"><i class="iconfont bang">&#xe62b;</i></div>
        <h1>确定要删除选中信息吗?</h1>
        <span slot="footer" class="dialog-footer">
          <el-button class="confirm-btn delete-btn" @click="deleteMessage()">确 定</el-button>
          <el-button class="cancel-btn delete-btn" @click="isDelete = false">取 消</el-button>
        </span>
      </div>
      <!--countDown-->
    </el-dialog>
    <!--删除成功提示框-->
    <el-dialog
      @close="clearInter"
      :visible.sync="isDeleted"
      size="tiny"
      class="deleted-dialog">
      <div class="delete-div">
        <div class="delete-icon"><i class="iconfont deleted">&#xe628;</i></div>
        <h1>删除成功</h1>
        <h2>{{closeSecond}}s后窗口自动关闭</h2>
      </div>
    </el-dialog>
  </div>
</template>
<script>
    import title from "../../public/account-title.vue"
    export default {
      data () {
        return {
          isDelete: false,
          isDeleted: false, //删除成功
          checked: true,
          closeSecond: 3,
          _close: Function, //清空定时器
          checkAll: false,
          curPage: 1,
          pageSize: 1,
          deleteId: 0,
          tableList: [],
          checkedMessage: [],
          isIndeterminate: false,
          loading: true,
        }
      },
      components: {
        'ui-title': title
      },
      created () {
        this.getInfo()
      },
      methods: {
        // 分页
        changePage (val) {
          this.curPage = val
          this.checkedMessage = []
          this.checkAll = false
          this.isIndeterminate = false
          this.getInfo()
        },
        countDown () {
          this.isDelete = false
          this.isDeleted = true
          this._close=setInterval(()=> {
            this.closeSecond --
            if (this.closeSecond ==0) {
              this.clearInter()
              return false
            }
          },1000)
        },
        clearInter () {
          clearInterval(this._close)
          this.closeSecond = 3
          this.isDeleted = false
        },
        // 全选
        handleCheckedMessageChange(value) {
          let checkedCount = value.length;
          this.checkAll = checkedCount === this.tableList.length;
          this.isIndeterminate = checkedCount > 0 && checkedCount < this.tableList.length;
        },
        handleCheckAllChange(event) {
          let messages = []
          this.tableList.forEach((item) => {
            messages.push(item.id)
          });
          this.checkedMessage = event.target.checked ? messages : [];
          this.isIndeterminate = false;
        },
        // 获取信息
        getInfo () {
          global.http.post(this,"/message/messageList",{
            pageNum: this.curPage,
            pageSize:　5,
          },data => {
            let info = data.data.resData.data
            this.tableList = info.list
            this.pageSize = info.pages
            this.loading = false
          })
        },
        // 标记已读
        markRead (val) { // 0未读 1已读
          if (this.tableList.length == 0) {
            return
          } else if (this.checkedMessage.length == 0){
            this.$message({message:'至少选择一条信息',type: 'error'});
          } else {
            let ids = ''
            this.checkedMessage.forEach((item) => {
              ids += item + ','
          });
            global.http.post(this,"/message/batchUpdateMessage",{
              messageIds: ids.slice(0,-1),
              status:　val,
            },data => {
              if (data.data.resCode == 1) {
              this.$message({message:'标记成功',type: 'success'});
              this.tableList = []
              this.checkedMessage = []
              this.checkAll = false
              this.isIndeterminate = false
              this.getInfo()
            } else {
              this.$message({message:data.data.resMsg,type: 'error'});
            }
          })
          }
        },
        // 打开删除框
        ifOpenDelete () {
          if (this.tableList.length == 0) {
            return
          } else if (this.checkedMessage.length == 0){
            this.$message({message:'至少选择一条信息',type: 'error'});
          } else {
            this.isDelete = true;
            this.deleteId = ''
          }
        },
        // 删除
        deleteMessage () {
          let ids = ''
          if (this.deleteId) {
            ids = this.deleteId
          } else {
            this.checkedMessage.forEach((item) => {
                ids += item + ','
            });
            ids = ids.slice(0,-1)
          }
          global.http.post(this,"/message/batchDelMessage",{
            messageIds: ids
          },data => {
            if (data.data.resCode == 1) {
            this.countDown ()
            this.isDeleted = true
            this.tableList = []
            this.checkedMessage = []
            this.checkAll = false
            this.isIndeterminate = false
            this.getInfo()
          } else {
            this.$message({message:data.data.resMsg,type: 'error'});
            }
          })
        }
      }
    }
</script>
<style>
.allSelect span.el-checkbox__label{
   padding-left: 20px;
   margin-right: 10px;
}
</style>

<style scoped>

 .message-div.account-route{
   padding: 40px 20px;
 }
  .message-table{
    margin-top: 27px;
  }
  .home-el-table{
    border: 1px solid #E5E5E5;
    border-bottom: none;
  }
  .time_color{
   color: #969595;
  }
  .allSelect{
    padding-top: 29px;
    padding-left: 30px;
  }
  .selectBtn{
    width: 80px;
    height: 30px;
    font-size: 14px;
    text-align: center;
    margin-left: 20px;
    border: 1px solid #e5e5e5;
  }
  .selectBtn:hover{
    border: 1px solid #FF4941;
    color:#FF4941;
  }
  .confirm-btn {
    line-height: 18px;
  }
  .cancel-btn {
    line-height: 18px;
  }
  /*表格内容*/
  .read{
    color:#7dc6fd;
  }
  .unRead{
    color:#FF5B4C ;
  }
  .delete{
    cursor: pointer;
    color: #508CEE;;
  }
  /*iconfont*/
  .bang{
    font-size: 55px;
    color: #fd8a29;
  }
  .deleted {
    font-size: 55px;
    color: #73d24f;
  }
  /*删除弹出框*/
  .delete-div{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .delete-div h1{
    font-size: 16px;
    line-height: 16px;
    color: #333333;
  }
  .deleted-dialog h1{
    font-size: 20px;
  }
  .deleted-dialog h2{
    font-size: 16px;
    line-height: 16px;
    color: #666666;
    margin-top: 12px;
  }
  .dialog-footer{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }
  .delete-icon{
    width: 50px;
    height: 50px;
    margin-bottom: 20px;
  }
  .delete-btn{
    margin-top: 0px;
  }
  .fenye{
    margin-top: 68px;
  }
</style>
<style rel="stylesheet/less">
  @import "../../../style/account.less";
</style>
