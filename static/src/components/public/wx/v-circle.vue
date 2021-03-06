<!-- 圆形进度显示组件
使用方法：见网站     https://juejin.im/entry/5720c5f4f38c84005986c20f  
 -->
<template>
<div class="v-circle" v-bind:style="circleStyle" >
  <div class="mask full" v-bind:style="[maskStyle, transitionStyle, rotateStyle]">
    <div class="fill" v-bind:style="[fillStyle, transitionStyle, rotateStyle]"></div>
  </div>
  <div class="mask half" v-bind:style="[maskStyle]">
    <div class="fill" v-bind:style="[fillStyle, transitionStyle, rotateStyle]"></div>
    <div class="fill fix" :class="{}" v-bind:style="[fillStyle, fixStyle, transitionStyle]"></div>
  </div>
  <div class="pv" v-bind:style="pvStyle">
    <span class="progress" v-bind:style="progressTextStyle">
      {{ pv || 0 }}
    </span>
  </div>
</div>
</template>

<style lang="scss" scoped>
  .v-circle {
    border-radius: 50%;
    position: relative;

    .mask, .fill {
      position: absolute;
      border-radius: 50%;
      backface-visibility: hidden;
    }

    .pv {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      z-index: 1;
      border-radius: 50%;
      text-align: center;

      .progress {
        margin: 0;
        padding: 0;
      }
    }
  }
</style>

<script>
const DEFAULT_WIDTH = 150
    , DEFAULT_BOLD = 5
    , DEFAULT_FONT_SIZE = 0.293333
    , DEFAULT_BORDER_COLOR = '#bdc3c7'
    , DEFAULT_TEXT_COLOR = '#bdc3c7'
    , DEFAULT_FILL_COLOR = '#2ecc71'
    , DEFAUTL_BG_COLOR = '#f9f9f9'
    , DEFAUTL_TEXT_BG_COLOR = 'rgba(0,0,0,0)'

export default {
  methods: {
    setClip(t, r, b, l) {
      return `rect(${t}rem, ${r}rem, ${b}rem, ${l}rem)`
    },
    setTransformStyle(pv, type) {
      let deg = Math.floor((pv / 100) * 180)
      if(type === 'fix') {
        // remove the gap between two half circles
        return `rotate(${deg * 2}deg)`
      }
      return `rotate(${deg}deg)`
    },
    setTransitionStyle(t) {
      return `transform ${t}s`
    },
    setPv(n) {
     this.pv = n
      let types = ['fix', 'rotate']

      // map styles
      types.map((type) => {
        this[type + 'Style'] = {
          transform: this.setTransformStyle(this.pv, type)
        }
      })
    }
  },

  props: [
    'color',
    'width',
    'fontSize',
    'pv',
    'textColor',
    'bold',
    'textBgColor',
    'borderColor',
    'during',
    'bgColor'
  ],

  data() {
    let transformStyleValue = this.setTransformStyle(0)   // 初始化让进度为 0
      , innerCircleWidth = ((this.width || DEFAULT_WIDTH)
                           - 2 * (this.bold || DEFAULT_BOLD))
                           + 'rem'

      , fixTransformStyleValue = this.setTransformStyle(0, 'fix') // 初始化让进度为 0
      , transitionStyleValue = this.setTransitionStyle(this.during || 0.8)

    return {
    	pvs:0,
      // 环形样式
      circleStyle: {
        width: (this.width || DEFAULT_WIDTH) + 'rem',
        height: (this.width || DEFAULT_WIDTH) + 'rem',
        backgroundColor: (this.bgColor || DEFAUTL_BG_COLOR)
      },

      // 进度文字样式
      progressTextStyle: {
        fontSize: (this.fontSize || DEFAULT_FONT_SIZE) + 'rem',
        lineHeight:this.width + 'rem',
        color: this.textColor || DEFAULT_TEXT_COLOR
      },

      fillStyle: {
        backgroundColor: this.color || DEFAULT_FILL_COLOR,
        width: (this.width || DEFAULT_WIDTH) + 'rem',
        height: (this.width || DEFAULT_WIDTH) + 'rem',
        clip: this.setClip(0, this.width / 2, this.width, 0)
      },

      rotateStyle: {
        transform: transformStyleValue,
        webkitTransform: transformStyleValue,
        msTransform: transformStyleValue,
        oTransform: transformStyleValue,
        mozTransform: transformStyleValue
      },

      transitionStyle: {
        transition: transitionStyleValue,
        webkitTransition: transitionStyleValue,
        mozTransition: transitionStyleValue,
        oTransition: transitionStyleValue,
        msTransition: transitionStyleValue
      },

      maskStyle: {
        width: (this.width || DEFAULT_WIDTH) + 'rem',
        height: (this.width || DEFAULT_WIDTH) + 'rem',
        clip: this.setClip(0, this.width, this.width, this.width / 2)
      },

      pvStyle: {
        backgroundColor: this.textBgColor || DEFAUTL_TEXT_BG_COLOR,
        width: innerCircleWidth,
        height: innerCircleWidth,
        lineHeight: innerCircleWidth
      },

      fixStyle: {
        transform: fixTransformStyleValue,
        webkitTransform: fixTransformStyleValue,
        mozTransform: fixTransformStyleValue,
        oTransform: fixTransformStyleValue,
        msTransform: fixTransformStyleValue
      }
    }
  },
  mounted:function(){
  	var _this = this
  	setTimeout(function(){
  		_this.setPv(_this.pv)
  	},100)
  }
}
</script>
