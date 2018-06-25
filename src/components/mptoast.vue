<template>
  <div class="textClass" v-if="show">
    {{text}}
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        animateShow: false
      }
    },
    computed: {
      show () {
        let delay = this.$toastStore.getters.GET_TOAST_DURATION
        let show = this.$toastStore.getters.GET_TOAST_SHOW
        this.animateShow = show
        if (show) {
          setTimeout(() => {
            setTimeout(() => { this.$toastStore.commit('hideToast') }, 350)
          }, delay - 350)
        }
        return show
      },
      text () {
        return this.$toastStore.getters.GET_TOAST_TEXT
      },
      textClass () {
        let normalClass = this.$toastStore.getters.GET_TOAST_TEXT_CLASS_NAME || '__toast_text__'
        let animatClass = this.animateShow ? 'enterAni' : 'fadeAni'
        return normalClass + animatClass
      }
    }
  }
</script>

<style scoped>
  .textClass{
    min-height: 20px;
    min-width: 75px;
    max-width: 50%;
    max-height: 50%;
    border-radius: 10px;
    z-index: 9999;
    position: fixed;
    font-size: 14px;
    color: #ffffff;
    background-color: #666666;
    top:65%;
    left: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transform: translate(-50%, -50%) ;
    padding: 10px;
  }
  .enterAni {
    animation:enter 0.35s;
    animation-fill-mode: forwards;
  }
  .fadeAni {
    animation:fadeout 0.35s;
  }
  @keyframes enter
  {
    from {opacity:0;}
    to {opacity:1;}
  }
  @keyframes fadeout
  {
    from {opacity:1;}
    to {opacity:0;}
  }
</style>
