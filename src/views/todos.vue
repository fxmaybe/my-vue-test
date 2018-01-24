<template>
  <div>
    <bar-top :show-refesh-icon="false" :show-return-icon="true" :show-write-icon="false"></bar-top>
    <todo></todo>
    <bar-bottom></bar-bottom>
  </div>
</template>
<script>
import barTop from '../components/barTop.vue';
import todo from '../components/todo.vue';
import barBottom from '../components/barBottom.vue';

export default {
  components: {
    'barTop': barTop,
    'todo': todo,
    'barBottom': barBottom
  },
  methods: {

  }
}
</script>
<style>
</style>
