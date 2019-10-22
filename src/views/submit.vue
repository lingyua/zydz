<template>
  <div>
    <div v-if="level==3">
      <van-row>
        <van-col
          span="8"
          style="background-color:rgb(247,247,248);width:23vw; height:100vh; padding-top:20vh;"
        >
          <van-sidebar v-model="activeKey" v-on:change="change">
            <van-sidebar-item title="提交信息" />
            <van-sidebar-item title="数据查询" />
            <van-sidebar-item title="修改密码" @click="fshow = true" />
          </van-sidebar>
        </van-col>
        <van-col span="15" style="width:75vw ">
          <div v-if="activeKey === 0">
            <van-row>
              <van-col span="24">
                <h1>录入</h1>
                <van-cell-group>
                  <van-field required v-model="name" placeholder="请输入姓名" :error="errname" />
                </van-cell-group>
                <van-cell-group>
                  <van-field
                    required
                    v-model="number"
                    placeholder="请输入手机号"
                    :error-message="numerr"
                  />
                </van-cell-group>
                <van-cell-group>
                  <van-field required v-model="card" placeholder="请输入车牌号" v-on:input="toUpperCase" />
                </van-cell-group>
                <van-dropdown-menu>
                  <van-dropdown-item v-on:change="serchL" v-model="value4" :options="option4" />
                </van-dropdown-menu>
                <van-uploader
                  v-model="fileList"
                  multiple
                  :after-read="afterRead"
                  :before-delete="drop"
                  :max-count="5"
                  name="param"
                />
              </van-col>
              <van-col span="24">
                <van-button type="primary" v-on:click="submit">提交</van-button>
              </van-col>
            </van-row>
          </div>
          <div v-if="activeKey === 1">
            <h1>查询</h1>
            <van-row>
              <van-col span="20">
                <van-dropdown-menu>
                  <van-dropdown-item v-on:change="serchY" v-model="value1" :options="option1" />
                  <van-dropdown-item v-on:change="serchM" v-model="value2" :options="option2" />
                  <van-dropdown-item v-on:change="serchD" v-model="value3" :options="option3" />
                </van-dropdown-menu>
              </van-col>
              <van-col span="4">
                <van-button square type="primary" text="查询" v-on:click="search" />
              </van-col>
            </van-row>
            <div v-if="arr.length == 0">未查询到相关信息</div>
            <van-swipe-cell v-for="(ar,i) in arr" v-bind:key="ar.id">
              <van-collapse v-model="activeNames">
                <van-collapse-item
                  :title="'提交时间:'+ar.date.slice(0,10)"
                  :value="ar.state"
                  :name="ar.num"
                  title-class="a"
                >
                  <div>姓名:{{ar.name}}</div>
                  <div>手机号:{{ar.number}}</div>
                  <div>车牌号:{{ar.card}}</div>
                  <div>银行:{{ar.ls}}</div>
                  <div v-if="ar.state=='未通过'">原因:{{ar.res}}</div>
                  <div style="display:flex;">
                    <div v-for="a in ar.base" :key="a.base" style="width:15vw;">
                      <img
                        :src="address+a"
                        alt
                        style="height:50px; width:50px;"
                        v-on:click="look(i)"
                      />
                    </div>
                  </div>
                </van-collapse-item>
              </van-collapse>
              <template slot="right">
                <van-button
                  v-if="ar.state !== '已通过'"
                  square
                  type="primary"
                  text="修改"
                  @click="show = true"
                  v-on:click="fix(ar._id)"
                />
                <van-button
                  v-if="ar.state !== '已通过'"
                  square
                  type="danger"
                  text="删除"
                  v-on:click="del(ar._id)"
                />
              </template>
            </van-swipe-cell>

            <van-dialog v-model="show" title="修改" show-cancel-button v-on:confirm="sure">
              <van-cell-group>
                <van-field required v-model="fixname" placeholder="请输入姓名" :error="errfixname" />
              </van-cell-group>
              <van-cell-group>
                <van-field
                  required
                  v-model="fixnumber"
                  placeholder="请输入手机号"
                  :error-message="fixnumerr"
                />
              </van-cell-group>
              <van-cell-group>
                <van-field
                  required
                  v-model="fixcard"
                  placeholder="请输入车牌号"
                  v-on:input="toUpperCase"
                />
              </van-cell-group>
              <van-uploader
                v-model="fixfileList"
                multiple
                :after-read="afterRead1"
                :before-delete="drop1"
                :max-count="5"
              />
            </van-dialog>
          </div>
        </van-col>
      </van-row>
      <van-dialog
        v-model="fshow"
        title="修改密码"
        show-cancel-button
        v-on:confirm="fixpwd"
        :before-close="dclose"
      >
        <van-cell-group>
          <van-field required v-model="fuser" placeholder="请输入用户名" :error="errfuser" />
        </van-cell-group>
        <van-cell-group>
          <van-field required v-model="fpwd" placeholder="请输入原密码" :error-message="errfpwd" />
        </van-cell-group>
        <van-cell-group>
          <van-field required v-model="npwd" placeholder="请输入新密码" :error-message="errnpwd" />
        </van-cell-group>
      </van-dialog>
    </div>

    <div v-if="level==2">
      <div @click="fshow = true" style="color:blue; text-decoration:underline;">修改密码</div>
      <van-dialog
        v-model="fshow"
        title="修改密码"
        show-cancel-button
        v-on:confirm="fixpwd"
        :before-close="dclose"
      >
        <van-cell-group>
          <van-field required v-model="fuser" placeholder="请输入用户名" :error="errfuser" />
        </van-cell-group>
        <van-cell-group>
          <van-field required v-model="fpwd" placeholder="请输入原密码" :error-message="errfpwd" />
        </van-cell-group>
        <van-cell-group>
          <van-field required v-model="npwd" placeholder="请输入新密码" :error-message="errnpwd" />
        </van-cell-group>
      </van-dialog>
      <van-row>
        <van-col span="24">
          从：
          <van-dropdown-menu>
            <van-dropdown-item v-on:change="serchY" v-model="value1" :options="option1" />
            <van-dropdown-item v-on:change="serchM" v-model="value2" :options="option2" />
            <van-dropdown-item v-on:change="serchD" v-model="value3" :options="option3" />
          </van-dropdown-menu>至：
          <van-dropdown-menu>
            <van-dropdown-item v-on:change="serchY1" v-model="value5" :options="option5" />
            <van-dropdown-item v-on:change="serchM1" v-model="value6" :options="option6" />
            <van-dropdown-item v-on:change="serchD1" v-model="value7" :options="option7" />
          </van-dropdown-menu>
          <van-dropdown-menu>
            <van-dropdown-item v-on:change="serchL" v-model="value4" :options="option4" />
            <van-dropdown-item v-on:change="serchS" v-model="value8" :options="option8" />
          </van-dropdown-menu>
        </van-col>
        <van-col span="24">
          <van-button square type="primary" text="查询" v-on:click="tsearch" />
        </van-col>
      </van-row>

      <div v-if="tarr.length == 0">未查询到相关信息</div>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div v-for="item in tarr" :key="item._id" style="font-size:70%">
          姓名:{{item.name}} 电话:{{item.number}} 车牌号:{{item.card}} 提交时间:{{item.date.slice(10)}} 审核状态:{{item.state}}
          <div v-if="item.state == '未通过'">{{item.res}}</div>
        </div>
      </van-list>
    </div>

    <div v-if="level==1">
      <div @click="fshow = true">修改密码</div>
      <van-dialog
        v-model="fshow"
        title="修改密码"
        show-cancel-button
        v-on:confirm="fixpwd"
        :before-close="dclose"
      >
        <van-cell-group>
          <van-field required v-model="fuser" placeholder="请输入用户名" :error="errfuser" />
        </van-cell-group>
        <van-cell-group>
          <van-field required v-model="fpwd" placeholder="请输入原密码" :error-message="errfpwd" />
        </van-cell-group>
        <van-cell-group>
          <van-field required v-model="npwd" placeholder="请输入新密码" :error-message="errnpwd" />
        </van-cell-group>
      </van-dialog>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div
          v-for="item in list"
          :key="item._id"
        >姓名:{{item.name}} 信息数量:{{item.num}} 审核中:{{item.state0}} 已通过:{{item.state1}} 未通过:{{item.state2}}</div>
      </van-list>
    </div>
  </div>
</template>

<style>
.a {
  font-size: 70%;
}
</style>

<script>
import Vue from "vue";
import axios from "axios";
import { Button } from "vant";
import { Field } from "vant";
import { Cell, CellGroup } from "vant";
import { Uploader } from "vant";
import { Toast } from "vant";
import { Sidebar, SidebarItem } from "vant";
import { SwipeCell } from "vant";
import { Collapse, CollapseItem } from "vant";
import { ImagePreview } from "vant";
import { Dialog } from "vant";
import { DropdownMenu, DropdownItem } from "vant";
import { List } from "vant";
import { Row, Col } from "vant";

Vue.use(Row).use(Col);
Vue.use(List);
Vue.use(DropdownMenu).use(DropdownItem);
Vue.use(Dialog);
Vue.use(ImagePreview);
Vue.use(Collapse).use(CollapseItem);
Vue.use(SwipeCell);
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(Toast);
Vue.use(Uploader);
Vue.use(Cell).use(CellGroup);
Vue.use(Field);
Vue.use(Button);
export default {
  name: "HelloWorld",
  data() {
    return {
      address: "http://localhost:3000/",
      level: 0,
      activeKey: 0,
      name: "",
      errname: false,
      number: "",
      numerr: "",
      card: "",
      base: [],
      fileList: [], //图片文件预览
      arr: [],
      activeNames: [],
      show: false,
      fshow: false, //修改密码
      nclose: false,
      fuser: "",
      errfuser: false,
      fpwd: "",
      errfpwd: "",
      npwd: "",
      errnpwd: "",
      fixid: "",
      fixname: "",
      errfixname: false,
      fixnumber: "",
      fixnumerr: "",
      fixcard: "",
      fixbase: [],
      fixfileList: [],
      value1: 2019,
      value2: 12,
      value3: 15,
      value4: 47,
      option1: [
        { text: "2017年", value: 2017 },
        { text: "2018年", value: 2018 },
        { text: "2019年", value: 2019 }
      ],
      option2: [
        { text: "一月", value: 3 },
        { text: "二月", value: 4 },
        { text: "三月", value: 5 },
        { text: "四月", value: 6 },
        { text: "五月", value: 7 },
        { text: "六月", value: 8 },
        { text: "七月", value: 9 },
        { text: "八月", value: 10 },
        { text: "九月", value: 11 },
        { text: "十月", value: 12 },
        { text: "十一月", value: 13 },
        { text: "十二月", value: 14 }
      ],
      option3: [
        { text: "1号", value: 15 },
        { text: "2号", value: 16 },
        { text: "3号", value: 17 },
        { text: "4号", value: 18 },
        { text: "5号", value: 20 },
        { text: "6号", value: 21 },
        { text: "7号", value: 22 },
        { text: "8号", value: 23 },
        { text: "9号", value: 24 },
        { text: "10号", value: 25 },
        { text: "11号", value: 26 },
        { text: "12号", value: 27 },
        { text: "13号", value: 28 },
        { text: "14号", value: 28 },
        { text: "15号", value: 30 },
        { text: "16号", value: 31 },
        { text: "17号", value: 32 },
        { text: "18号", value: 33 },
        { text: "19号", value: 34 },
        { text: "20号", value: 35 },
        { text: "21号", value: 36 },
        { text: "22号", value: 37 },
        { text: "23号", value: 38 },
        { text: "24号", value: 39 },
        { text: "25号", value: 40 },
        { text: "26号", value: 41 },
        { text: "27号", value: 42 },
        { text: "28号", value: 43 },
        { text: "29号", value: 44 },
        { text: "30号", value: 45 },
        { text: "31号", value: 46 }
      ],
      option4: [{ text: "请选择银行", value: 47 }],
      ls: "",
      syear: "2019",
      smounth: "10",
      sday: "01",

      //level = 2
      tarr: [],
      ls: "",
      syear: "2019",
      smounth: "10",
      sday: "01",
      value5: 2020,
      value6: 12,
      value7: 15,
      option5: [
        { text: "2017年", value: 2017 },
        { text: "2018年", value: 2018 },
        { text: "2019年", value: 2019 },
        { text: "2020年", value: 2020 }
      ],
      option6: [
        { text: "一月", value: 3 },
        { text: "二月", value: 4 },
        { text: "三月", value: 5 },
        { text: "四月", value: 6 },
        { text: "五月", value: 7 },
        { text: "六月", value: 8 },
        { text: "七月", value: 9 },
        { text: "八月", value: 10 },
        { text: "九月", value: 11 },
        { text: "十月", value: 12 },
        { text: "十一月", value: 13 },
        { text: "十二月", value: 14 }
      ],
      option7: [
        { text: "1号", value: 15 },
        { text: "2号", value: 16 },
        { text: "3号", value: 17 },
        { text: "4号", value: 18 },
        { text: "5号", value: 20 },
        { text: "6号", value: 21 },
        { text: "7号", value: 22 },
        { text: "8号", value: 23 },
        { text: "9号", value: 24 },
        { text: "10号", value: 25 },
        { text: "11号", value: 26 },
        { text: "12号", value: 27 },
        { text: "13号", value: 28 },
        { text: "14号", value: 28 },
        { text: "15号", value: 30 },
        { text: "16号", value: 31 },
        { text: "17号", value: 32 },
        { text: "18号", value: 33 },
        { text: "19号", value: 34 },
        { text: "20号", value: 35 },
        { text: "21号", value: 36 },
        { text: "22号", value: 37 },
        { text: "23号", value: 38 },
        { text: "24号", value: 39 },
        { text: "25号", value: 40 },
        { text: "26号", value: 41 },
        { text: "27号", value: 42 },
        { text: "28号", value: 43 },
        { text: "29号", value: 44 },
        { text: "30号", value: 45 },
        { text: "31号", value: 46 }
      ],
      syear1: "2020",
      smounth1: "10",
      sday1: "01",
      value8: 0,
      option8: [
        { text: "审核中", value: 0 },
        { text: "已通过", value: 1 },
        { text: "未通过", value: 2 }
      ],
      state: "审核中",
      //level = 1
      list: [],
      loading: false,
      finished: false,
      teacherinfo: []
    };
  },
  methods: {
    //自动大写转换
    toUpperCase: function(a) {
      console.log(a);
      this.card = this.card.toUpperCase();
    },

    //解析图片获取base64编码
    afterRead(file, a) {
      console.log(a);
      console.log(file);
      this.base.push(file.file);
    },
    drop(file, detail) {
      console.log(detail);
      this.base.splice(detail.index, 1);
      console.log(this.base);
      return true;
    },

    //获取时间格式
    getTime() {
      let flag = 17;
      var date = new Date(); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      console.log(date);
      var Y = date.getFullYear();
      var M =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var D = date.getDate();
      var h = date.getHours();
      var m = date.getMinutes();
      if (m - 10 < 0) {
        m = "0" + m;
      }
      if (h > flag) {
        if (
          M == 1 ||
          M == 3 ||
          M == 5 ||
          M == 7 ||
          M == 8 ||
          M == 10 ||
          M == 12
        ) {
          if (M !== 12) {
            if (D == 31) {
              M = M + 1;
              D = "01";
            } else {
              D = D + 1;
            }
          } else {
            if (D == 31) {
              Y = Y + 1;
              M = "01";
              D = "01";
            } else {
              D++;
            }
          }
        } else {
          if (D == 30) {
            M = M + 1;
            D = "01";
          } else {
            D = D + 1;
          }
        }
      }
      var a = Y + "-" + M + "-" + D + " " + h + "时" + m + "分";
      console.log(a);
      this.date = a;
    },

    serchL(a) {
      this.ls = this.option4[a - 47].text;
    },
    lostBlur(a) {
      var regplateNumber = /(^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$)/;
      if (a === "") {
        Toast("请输入车牌号码");
        return;
      } else if (!regplateNumber.test(a)) {
        Toast("请输入正确的车牌号码");
        return;
      }
    },
    submit: function() {
      //验证姓名是否为空;
      if (this.name == "") {
        this.errname = true;
        return;
      }
      //检验手机号位数;
      if (Math.floor(+this.number / 10000000000) !== 1) {
        this.numerr = "请输入正确的手机号";
        return;
      }
      this.lostBlur(this.card);
      if (this.ls == "") {
        Toast("请选择银行~");
        return;
      }
      let that = this;
      this.getTime();
      let file = this.base;
      let param = new FormData(); //创建form对象
      this.base.forEach(element => {
        param.append("file", element); //通过append向form对象添加数据
        // console.log(param.get("file")); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
      });
      param.append("user", that.$route.query.user);
      param.append("name", that.name);
      param.append("number", that.number);
      param.append("card", that.card);
      param.append("date", that.date);
      param.append("state", "审核中");
      param.append("time", new Date().getTime());
      param.append("class", that.$route.query.class);
      param.append("ls", that.ls);
      let config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      };
      Dialog.confirm({
        title: "提示",
        message: "是否确认提交？"
      })
        .then(() => {
          // on confirm
          axios.post(this.address + "submit", param).then(res => {
            console.log(res);
            if (res.data == "no") {
              Toast("该车牌号已经提交，请勿重复操作～");
            } else {
              Toast("提交成功～");
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },

    look(a) {
      let that = this;
      let path = [];
      let i = -1;
      that.arr[a].base.forEach(element => {
        i++;
        path[i] = that.address + element;
      });
      ImagePreview({
        images: path
      });
    },

    //查询此用户提交的信息
    change: function(index) {
      if (index == 1) {
        axios
          .post(this.address + "findmes", {
            user: this.$route.query.user
          })
          .then(res => {
            let i = 0;
            res.data.forEach(element => {
              i++;
              element.num = i;
            });
            this.arr = res.data;
          });
      }
    },
    //修改
    dclose(a, b) {
      if (a == "confirm") {
        if (this.fuser == "" || this.fpwd == "" || this.npwd == "") {
          b(false);
        } else {
          b();
        }
      }
      if (a == "cancel") {
        this.activeKey = 0;
        b();
      }
    },
    fixpwd() {
      let that = this;
      if (this.fuser == "") {
        this.errfuser = true;
        return;
      }
      if (this.fpwd == "") {
        this.errfpwd = "密码不能为空～";
        return;
      }
      if (this.npwd == "") {
        this.errnpwd = "请输入新密码～";
        return;
      }
      axios
        .post(this.address + "fixpwd", {
          fuser: this.fuser,
          fpwd: this.fpwd,
          npwd: this.npwd
        })
        .then(res => {
          console.log(res);
          if (res.data == "no") {
            Toast("用户名或密码有误，修改失败，请重试～");
          }
          if (res.data == "ok") {
            Toast("修改密码成功～");
          }
        });
    },
    fix(a) {
      let that = this;
      this.fixid = a;
      axios.post(this.address + "fix", { _id: a }).then(res => {
        this.fixname = res.data[0].name;
        this.fixnumber = res.data[0].number;
        this.fixcard = res.data[0].card;
      });
    },
    afterRead1(file) {
      this.fixbase.push(file.file);
    },
    drop1(file, detail) {
      console.log(detail);
      this.fixbase.splice(detail.index, 1);
      console.log(this.fixbase);
      return true;
    },
    sure() {
      let that = this;
      //验证姓名是否为空
      if (this.fixname == "") {
        this.errfixname = true;
        return;
      }
      //检验手机号位数
      if (Math.floor(+this.number / 10000000000) !== 1) {
        this.fixnumerr = "请输入正确的手机号";
        return;
      }
      this.lostBlur(this.fixcard);
      this.getTime();
      let file = this.fixbase;
      console.log(this.fixbase);
      let param = new FormData(); //创建form对象
      this.fixbase.forEach(element => {
        param.append("file", element); //通过append向form对象添加数据
        // console.log(param.get("file")); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
      });
      param.append("_id", that.fixid);
      param.append("user", that.$route.query.user);
      param.append("name", that.fixname);
      param.append("number", that.fixnumber);
      param.append("card", that.fixcard);
      param.append("date", that.fixdate);
      param.append("state", "审核中");
      param.append("time", new Date().getTime());
      let config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      };
      axios.post(this.address + "surefix", param).then(res => {
        console.log(res);
        Toast("修改成功，请刷新页面查看～");
      });
    },

    //删除
    del(a) {
      console.log(a);
      Dialog.confirm({
        title: "提示",
        message: "是否确认删除？"
      })
        .then(() => {
          // on confirm
          console.log(1);
          axios.post(this.address + "del", { _id: a }).then(res => {
            console.log(res);
            Toast("删除成功，请刷新页面查看～");
          });
        })
        .catch(() => {
          // on cancel
        });
    },

    //查
    serchY(a) {
      console.log(this.option1[a - 2017].value);
      this.syear = this.option1[a - 2017].value;
    },
    serchM(a) {
      console.log(this.option2[a - 3].value - 2);
      this.smounth = this.option2[a - 3].value - 2;
    },
    serchD(a) {
      console.log(this.option3[a - 15].value - 16);
      this.sday = this.option3[a - 15].value - 16;
    },
    search() {
      let date = this.syear + "-" + this.smounth + "-" + this.sday;
      axios
        .post(this.address + "search", {
          date: date,
          user: this.$route.query.user
        })
        .then(res => {
          console.log(res);
          this.arr = res.data;
        });
    },

    //level = 2
    //查
    serchY1(a) {
      console.log(this.option1[a - 2017].value);
      this.syear1 = this.option1[a - 2017].value;
    },
    serchM1(a) {
      console.log(this.option2[a - 3].value - 2);
      this.smounth1 = this.option2[a - 3].value - 2;
    },
    serchD1(a) {
      console.log(this.option3[a - 15].value - 16);
      this.sday1 = this.option3[a - 15].value - 16;
    },
    serchS(a) {
      this.state = this.option8[a].text;
      console.log(this.state);
    },
    tsearchall() {
      let date = this.syear + "-" + this.smounth + "-" + this.sday;
      axios
        .post(this.address + "tsearchall", {
          class: this.$route.query.teacher
        })
        .then(res => {
          console.log(res);
          this.tarr = res.data;
        });
    },
    tsearch() {
      let date = this.syear + "-" + this.smounth + "-" + this.sday;
      let date1 = this.syear1 + "-" + this.smounth1 + "-" + this.sday1;
      axios
        .post(this.address + "tsearch", {
          date: date,
          class: this.$route.query.teacher,
          date1: date1,
          ls: this.ls,
          state: this.state
        })
        .then(res => {
          console.log(res);
          this.tarr = res.data;
        });
    },
    //level = 1
    onLoad() {
      setTimeout(() => {
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= this.teacherinfo.length) {
          this.finished = true;
        }
      }, 500);
      console.log(this.list);
    }
  },

  created() {
    if (
      this.$route.query.user == undefined ||
      this.$route.query.level == undefined ||
      this.$route.query.teacher == undefined ||
      this.$route.query.class == undefined
    ) {
      this.$router.push({ path: "login" });
    }
    this.level = this.$route.query.level;
  },
  mounted() {
    let that = this;
    if (this.$route.query.level == 1) {
      axios.post(this.address + "findinfo").then(res => {
        console.log(res);
        that.list = res.data;
      });
    }
    if (this.$route.query.level == 2) {
      this.tsearchall();
    }
    let i = 0;
    axios.post(this.address + "getls").then(res => {
      console.log(res);
      res.data.forEach(element => {
        i++;
        that.option4.push({
          text: element.name,
          value: that.option4[i - 1].value + 1
        });
      });
      console.log(that.option4);
    });
  }
};
</script>