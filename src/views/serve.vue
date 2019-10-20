<template>
  <div>
    <van-cell-group>
      <van-field v-model="sms" center clearable label="输入银行" placeholder="请输入银行">
        <van-button slot="button" size="small" type="primary" v-on:click="add">添加</van-button>
      </van-field>
    </van-cell-group>从：
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
    <van-button square type="primary" text="查询" v-on:click="search" />
    <div v-if="arr.length == 0">未查询到相关信息</div>
    <div v-for="(ar, i) in arr" v-bind:key="ar.id" style="border: 1px solid black; margin-top:2px;">
      <van-row>
        <van-col span="10">
          <div>姓名:{{ar.name}}</div>
          <div>手机号:{{ar.number}}</div>
          <div>车牌号:{{ar.card}}</div>
          <div>银行:{{ar.ls}}</div>
          <div>状态:{{ar.state}}</div>
          <div v-if="ar.state=='未通过'">原因:{{ar.res}}</div>
        </van-col>
        <van-col span="8">
          <div v-for="a in ar.base" :key="a.base">
            截图：
            <img :src="address+a" alt style="height:100px; width:100px;" v-on:click="look(i)" />
          </div>
        </van-col>
        <van-col span="6">
          <van-button square type="primary" text="通过" v-on:click="pass(ar._id)" />
          <van-button square type="danger" text="不过" @click="show = true" v-on:click="id(ar._id)" />
        </van-col>
      </van-row>
    </div>

    <van-dialog
      v-model="show"
      title="填写原因"
      show-cancel-button
      v-on:confirm="nopass"
      :beforeClose="close"
    >
      <van-cell-group>
        <van-field required v-model="res" placeholder="请填写原因" :error="errres" />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

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
      sms: "",
      _id: "",
      res: "",
      errres: false,
      base: [],
      fileList: [], //图片文件预览
      arr: [],
      activeNames: [],
      show: false,
      nclose: false,
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
      state: "审核中"
    };
  },
  methods: {
    add() {
      console.log(this.sms);
      axios.post(this.address + "add", { name: this.sms }).then(res => {
        console.log(res);
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
        images: path,
        closeOnPopstate: true
      });
    },
    pass(a) {
      console.log(1);
      axios
        .post(this.address + "pass", {
          _id: a
        })
        .then(res => {
          if (res.data !== "no") {
            Toast("通过成功～");
          }
          if (ers.data == "no") {
            Toast("请不要重复通过～");
          }
        });
    },
    id(a) {
      console.log(a);
      this._id = a;
    },
    close(a, b) {
      console.log(1);
      if (this.res !== "") {
        b();
      }
      if (this.res == "") {
        b(false);
      }
    },
    nopass() {
      let that = this;
      console.log(this._id);
      if (this.res == "") {
        this.errres = true;
        // this.nclose = true;\
      } else {
        axios
          .post(this.address + "res", { _id: this._id, res: this.res })
          .then(res => {
            console.log(res);
            if (res.data !== "no") {
              Toast("成功～");
            }
            if (ers.data == "no") {
              Toast("此信息已经未通过，请勿重复操作～");
            }
          });
      }
    },
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
    serchL(a) {
      console.log(this.option4[a - 47].text);
      this.ls = this.option4[a - 47].text;
    },
    serchS(a) {
      this.state = this.option8[a].text;
      console.log(this.state);
    },
    search() {
      let date = this.syear + "-" + this.smounth + "-" + this.sday;
      let date1 = this.syear1 + "-" + this.smounth1 + "-" + this.sday1;
      axios
        .post(this.address + "searchadmin", {
          date: date,
          date1: date1,
          ls: this.ls,
          state: this.state
        })
        .then(res => {
          console.log(res);
          this.arr = res.data;
        });
    }
  },

  mounted() {
    let that = this;
    axios.post(this.address + "sall").then(res => {
      console.log(res);
      this.arr = res.data;
      this.base = res.data;
    });
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