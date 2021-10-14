<template>
	<div class="dots flex items-center justify-center">
		<h1 class="font-bold mr-1">{{ getText }}</h1>
		<div class="flex self-end mb-1.5" v-if="_type.dots">
			<div
			:class="`dot bg-gray-200 rounded-full mx-1 ${customClass}`" v-for="i in getCount" :key="i"
			:style="`--delay: ${i}; --jump: ${getJump};`" />
		</div>
		<div :class="`circle`" v-else-if="type.circle"/>
	</div>
</template>

<script>
export default {
	props: ['text', 'count', 'custom-class', 'jump', 'type'],
	computed: {
		getJump() { return this.jump ? this.jump : '-10px' },
		getText() { return this.text ? this.text : '' },
		getCount() { return typeof this.count === 'number' ? this.count : 3 },
		_type() {
			return {
				dots: this.type === 'dots',
				circle: this.type === 'circle',
			}
		},
	},
}
</script>

<style scoped>
.dot {
	min-width: 3px;
	min-height: 3px;
	animation: loading 1s infinite;
	animation-delay: calc(var(--delay) * 125ms);
}
@keyframes loading {
	0% {
		transform: translateY(0);
	}
	20% {
		transform: translateY(var(--jump));
	}
	50% {
		transform: translateY(0);
	}
	100% {
		transform: translateY(0);
	}
}
</style>