<template>
	<div :class="`
		my-chip
			flex justify-between text-sm py-0.5 ${this.closeBtn ? 'pl-2' : 'px-2'}
		${computedClass}
	`">
		<p>{{ evaluatedText }}</p>
		<span class="closebtn" v-if="closeBtn" @click="hide($event)">&times;</span>
	</div>
</template>


<script>
export default {
	props: ['text', 'close', 'rounded', 'dark'],

	computed: {
		evaluatedText() { return this.text ? this.text : 'My Chip' },
		closeBtn() {
			return typeof this.close === 'undefined' || typeof this.close !== 'boolean' ? true : this.close
		},
		computedClass() {
			return `
				${typeof this.rounded !== 'undefined' ? 'rounded' : ''}
				${typeof this.dark !== 'undefined' ? 'bg-gray-800 text-gray-100' : 'bg-gray-200 text-gray-700'}
			`
		},
	},

	methods: {
		hide(e) {
			e;
			// e.target.parentElement.style.display = 'none'
		},
	},
}
</script>


<style scoped>
.closebtn {
	@apply px-1 cursor-pointer;
}
</style>