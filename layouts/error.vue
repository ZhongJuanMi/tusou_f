<template>
  <div class="error">
    <img
      src="@/assets/images/not_found.png"
      alt=""
    >
    <p> 好可怕吖，莫名闯进了小黑屋</p>
    <p>
      <nuxt-link to="/">怕怕，我要去首页避难</nuxt-link>
      <span>刺激，我就要在这待着</span>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.error {
  text-align: center;
  img {
    margin: 40px;
  }
  p {
    font-size: 30px;
    color: $black;
    > * {
      font-size: 16px;
      margin: 0 20px;
    }
    a {
      color: $blue;
      text-decoration: underline;
    }
  }
}
</style>
