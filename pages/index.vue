<template>
  <div>
    <!-- <div id="container" /> -->
    <hotAirBalloon />
  </div>
</template>

<script>
import hotAirBalloon from '~/components/three/hotAirBalloon'
export default {
  components: {
    hotAirBalloon
  }
}
</script>


<style lang="scss" scoped>
#container {
  width: 100%;
  height: 413px;
  background-color: wheat;
  margin: 32px 0;
}
</style>
