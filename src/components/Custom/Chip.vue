<template>
	<div :class="`
		my-chip
			flex justify-between text-sm ${this.closeBtn ? 'pl-2' : 'px-2'}
		${computedClass}
	`">
		<p>{{ evaluatedText }}</p>
		<span class="px-1" v-if="closeBtn">&times;</span>
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
				${typeof this.dark !== 'undefined' ? 'bg-gray-800 text-gray-100' : 'bg-gray-100 text-gray-700'}
			`
		},
	},
}
</script>