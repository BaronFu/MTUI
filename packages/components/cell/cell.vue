<template>
  <a :href="href" class="mtui-cell" :class="{'mtui-cell__link':setArrow}">
    <div class="mtui-cell__hd" v-if="showHead">
      <slot name="head">
        <img :src="icon" alt="图标" v-if="icon">
      </slot>
    </div>
    <div class="mtui-cell__bd">
      <slot name="body">
        <template v-if="tips">
          <p>{{title}}</p>
          <span class="mtui-cells__tips">{{tips}}</span>
        </template>
        <template v-else>
          {{title}}
        </template>
      </slot>
      <slot></slot>
    </div>
    <div class="mtui-cell__ft">
      <slot name="footer">{{value}}</slot>
    </div>
    <mt-touch-ripple v-if="to"></mt-touch-ripple>
    <transition name="fade">
      <div class="mtui-cells__loading" v-if="showLoading">
        <mt-spinner :type="loadingType" :color="loadingColor" :size="0.5"></mt-spinner>
      </div>
    </transition>
  </a>
</template>
<script>
import { on } from '../../util/domUtil';
import touchRipple from '../touchRipple';
import Spinner from '../spinner';

export default {
  name: 'mt-cell',
  components: {
    touchRipple,
    Spinner,
  },
  props: {
    title: [String, Number],
    value: [String, Number],
    to: [String, Number],
    tips: [String, Number],
    icon: String,
    loadingColor: {
      type: String,
      default: '#e6e6e6',
    },
    loadingType: {
      type: String,
      default: 'dot',
    },
    showLoading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    href() {
      if (this.to && this.$router) {
        const resolved = this.$router.match(this.to);
        if (!resolved.matched.length) return this.to;
        this.$nextTick(() => {
          on(this.$el, 'click', this.handleClick);
        });
        return resolved.fullPath || resolved.path;
      }
      return this.to;
    },
    setArrow() {
      if (this.to !== undefined && this.to !== '') {
        return true;
      }
      return false;
    },
    showHead() {
      if (!!this.$slots.head || !!this.icon) {
        return true;
      }
      return false;
    },
  },
  methods: {
    handleClick(event) {
      event.preventDefault();
      this.$router.push(this.href);
    },
  },
};
</script>
<style lang="less">
.mtui-cells__loading{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
}
</style>
