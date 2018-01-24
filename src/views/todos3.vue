<template>
  <div>
    <bar-top :show-refesh-icon="false" :show-return-icon="true" :show-write-icon="false"></bar-top>
    <todo3></todo3>
    <bar-bottom></bar-bottom>
  </div>
</template>
<script>
import barTop from '../components/barTop.vue';
import todo3 from '../components/todo3.vue';
import barBottom from '../components/barBottom.vue';

export default {
  components: {
    'barTop': barTop,
    'todo3': todo3,
    'barBottom': barBottom
  },
  methods: {

  }
}
</script>
<style>
</style>
