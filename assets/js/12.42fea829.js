(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{533:function(t,n,e){},547:function(t,n,e){"use strict";e.r(n);e(308);var o=e(0),s=(e(533),{name:"render-audio",props:{obj:{type:Object,required:!1}},data:function(){return{synthControl:null}},mounted:function(){var t=this;o.a.nextTick((function(){var n=e(306);t.synthControl=new n.synth.SynthController,t.synthControl.load(t.$refs.audio,null,{displayLoop:!0,displayRestart:!0,displayPlay:!0,displayProgress:!0,displayWarp:!0}),t.setTune()}))},methods:{setTune:function(){var t=this;this.obj.tune?this.synthControl.setTune(this.obj.tune.getObj(),!1):setTimeout((function(){t.setTune()}),100)}}}),i=e(43),r=Object(i.a)(s,(function(){var t=this.$createElement,n=this._self._c||t;return n("ClientOnly",[n("div",{ref:"audio",staticClass:"render-audio"})])}),[],!1,null,null,null);n.default=r.exports}}]);