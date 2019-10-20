<template>
  <div>
    <h1>开通</h1>
    <van-cell-group>
      <van-field v-model="name" placeholder="请输入用户名" />
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="password" placeholder="请输入密码" />
    </van-cell-group>
    <van-radio-group v-model="radio">
      <van-radio name="1">校长</van-radio>
      <van-radio name="2">老师</van-radio>
      <van-radio name="3">学生</van-radio>
    </van-radio-group>
    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" :options="option1" />
    </van-dropdown-menu>
    <van-button type="default" v-on:click="submit">开通</van-button>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import { Button } from "vant";
import { Field } from "vant";
import { Cell, CellGroup } from "vant";
import { RadioGroup, Radio } from "vant";
import { Toast } from "vant";
import { DropdownMenu, DropdownItem } from "vant";

Vue.use(DropdownMenu).use(DropdownItem);
Vue.use(Toast);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Cell).use(CellGroup);
Vue.use(Field);
Vue.use(Button);
export default {
  name: "HelloWorld",
  data() {
    return {
      address: "http://localhost:3000/",
      name: "",
      password: "",
      radio: "1",
      teacher: "",
      value1: 0,
      option1: [{ text: "请选择老师", value: 0 }]
    };
  },
  methods: {
    findteacher: function() {
      let that = this;
      axios.post(this.address + "findteacher", {}).then(res => {
        console.log(res);
        that.teacher = res.data.length;
        axios
          .post(this.address + "addinfo", {
            name: that.name,
            password: that.password,
            level: that.radio,
            teacher: that.teacher + 1,
            class: "00"
          })
          .then(response => {
            console.log(response);
            if (response.data === "no") {
              Toast("该用户已经存在");
            }
            if (response.data === "ok") {
              Toast("开通成功");
            }
          });
      });
    },
    submit: function() {
      let that = this;
      if (this.radio == "1") {
        axios
          .post(this.address + "addinfo", {
            name: that.name,
            password: that.password,
            level: that.radio,
            teacher: "00",
            class: "00"
          })
          .then(response => {
            console.log(response);
            if (response.data === "no") {
              Toast("该用户已经存在");
            }
            if (response.data === "ok") {
              Toast("开通成功");
            }
          });
      }
      if (this.radio == "2") {
        this.findteacher();
      }
      if (this.radio == "3") {
        if (this.value1 == 0) {
          Toast("请选择老师");
        }
        if (this.value1 !== 0) {
          axios
            .post(this.address + "addinfo", {
              name: that.name,
              password: that.password,
              level: that.radio,
              teacher: "00",
              class: that.value1
            })
            .then(response => {
              console.log(response);
              if (response.data === "no") {
                Toast("该用户已经存在");
              }
              if (response.data === "ok") {
                Toast("开通成功");
              }
            });
        }
      }
    }
  },
  created() {
    let that = this;
    axios.post(this.address + "findteacher", {}).then(res => {
      res.data.forEach(element => {
        that.option1[element.teacher] = {
          text: element.name,
          value: element.teacher
        };
      });
    });
  }
};
</script>