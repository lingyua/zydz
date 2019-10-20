<template>
  <div>
    <h1>后台登陆</h1>
    <van-cell-group>
      <van-field v-model="name" placeholder="请输入用户名" />
    </van-cell-group>
    <van-cell-group>
      <van-field type="password" v-model="password" placeholder="请输入密码" />
    </van-cell-group>
    <van-button type="default" v-on:click="check">登陆</van-button>
  </div>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import { Button } from "vant";
import { Field } from "vant";
import { Cell, CellGroup } from "vant";
import { Toast } from "vant";

Vue.use(Toast);
Vue.use(Cell).use(CellGroup);
Vue.use(Field);
Vue.use(Button);
export default {
  name: "HelloWorld",
  data() {
    return {
      address: "http://localhost:3000/",
      name: "",
      password: ""
    };
  },
  methods: {
    check: function() {
      axios
        .post(this.address + "logadmin", {
          name: this.name,
          password: this.password
        })
        .then(response => {
          console.log(response);
          if (response.data !== "no") {
            this.$router.push({
              path: "serve"
            });
          } else {
            Toast("用户名或密码有误～");
          }
        });
    }
  }
};
</script>