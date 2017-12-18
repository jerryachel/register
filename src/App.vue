<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style >
html,body,#app{
    width:100%;
    height:100%;
    font-family: "Microsoft YaHei"
}
.border{
    box-shadow: 0 1px 0 hsla(0,0%,86%,.3);
}
.mint-indicator-wrapper{
	z-index: 999
}
</style>
