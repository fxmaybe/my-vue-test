<template>
  <div>
    <bar-top
    :show-refesh-icon="false"
    :show-return-icon="true"
    :show-write-icon="false"></bar-top>
    <text-content></text-content>
  </div>
</template>

<script>
import barTop from '../components/barTop.vue';
import text from '../components/text.vue';

export default {
  components: {
    'barTop': barTop,
    'textContent': text
  },
  methods:{

  }
}
</script>

<style>

</style>
