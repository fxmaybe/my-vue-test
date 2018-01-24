<template>
  <nav class="bar bar-tab easy-bottom-bar">
    <router-link class="tab-item" :class="{'easy-fa-color': currentTab == 'home'}" to="/">
      <span class="icon fa fa-weixin"></span>
      <span class="tab-label">home</span>
    </router-link>
    <router-link class="tab-item" :class="{'easy-fa-color': currentTab == 'lists'}" to="/lists">
      <span class="icon icon-pages"></span>
      <span class="tab-label">lists</span>
    </router-link>
    <router-link class="tab-item" :class="{'easy-fa-color': currentTab == 'option'}" to="/option">
      <span class="icon icon-person"></span>
      <span class="tab-label">option</span>
    </router-link>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      currentTab: "home"
    };
  },
  mounted() {
    this.$nextTick(function() {
      const uri = this.$route.path;
      switch(uri){
        case "/":
          this.currentTab = "home";
          break;
        case "/lists":
          this.currentTab = "lists";
          break;
        case "/option":
          this.currentTab = "option";
          break;
      }
      
    });
  },
  methods: {

  }
}
</script>

<style>
.easy-bottom-bar {
  background-color: #1abc9c;
  color: #fff;
  border: none;
}
.easy-bottom-bar a {
  color: #cdd !important;
}
.easy-fa-color .icon, .easy-fa-color .tab-label {
  color: #fff !important;
}
</style>
