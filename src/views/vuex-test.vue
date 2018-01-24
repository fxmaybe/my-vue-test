<template>
  <div>
    <bar-top :show-refesh-icon="false" :show-return-icon="true" :show-write-icon="false"></bar-top>
    <vuex-test></vuex-test>
    <vuex-test></vuex-test>
    <bar-bottom></bar-bottom>
  </div>
</template>
<script>
import barTop from '../components/barTop.vue';
import vuexTest from '../components/vuex-t.vue';
import barBottom from '../components/barBottom.vue';

export default {
  components: {
    'barTop': barTop,
    'vuexTest': vuexTest,
    'barBottom': barBottom
  },
  methods: {

  }
}
</script>
<style>
</style>
