<template>
	<transition-group
	appear
	@before-enter="beforeEnter"
	@enter="enter"
	@leave="leave">
		<slot></slot>
	</transition-group>
</template>


<script>
import gsap from 'gsap'

export default {
	props: ['height', 'margin'],

	methods: {
		beforeEnter: function (el) {
			el.style.opacity = 0
			el.style.height = 0
			if (this.margin)
				el.style.margin = 0
		},
		enter: function (el, done) {
			gsap.to(el, {
				opacity: 1,
				height: this.height,
				marginTop: this.margin ? this.margin[0 % this.margin.length] : el.style.marginTop,
				marginRight: this.margin ? this.margin[1 % this.margin.length] : el.style.marginRight,
				marginBottom: this.margin ? this.margin[2 % this.margin.length] : el.style.marginBottom,
				marginLeft: this.margin ? this.margin[3 % this.margin.length] : el.style.marginLeft,
				onComplete: done,
			})
		},
		leave: function (el, done) {
			gsap.to(el, {
				opacity: 0,
				height: 0,
				marginTop: 0,
				marginRight: 0,
				marginBottom: 0,
				marginLeft: 0,
				onComplete: done,
			})
		}
	}
}
</script>