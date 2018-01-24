<template>
  <div>
    <bar-top :show-refesh-icon="false" :show-return-icon="true" :show-write-icon="false"></bar-top>
    <todox></todox>
    <bar-bottom></bar-bottom>
  </div>
</template>
<script>
import barTop from '../components/barTop.vue';
import todox from '../components/todox.vue';
import barBottom from '../components/barBottom.vue';

export default {
  components: {
    'barTop': barTop,
    'todox': todox,
    'barBottom': barBottom
  },
  methods: {

  }
}
</script>
<style>
</style>
