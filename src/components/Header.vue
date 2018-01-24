<template>
    <div class="header">
      <mt-header fixed title="标题过长会隐藏后面的内容啊哈哈哈哈">
        <router-link to="/" slot="left">
          <mt-button icon="back">返回</mt-button>
        </router-link>
        <mt-button icon="more" slot="right"></mt-button>
      </mt-header>
    </div>
</template>
<style scoped>
  .header {
    padding:10px;
    border-bottom: 1px solid #ddd;
  }
  .header h1{ 
    height: 28px;
  }
    .logo {
      vertical-align: middle;
        width:28px;
    }
</style>
