<template>
	<button class="flex items-center justify-around transition-all">
		<i :class="`mx-1 transition-all ${icon} ${contentClass}`" aria-hidden="true"></i>
		<span :class="`hidden sm:flex mr-1 transition-all ${contentClass}`">{{ text }}</span>
	</button>
</template>


<script>
export default {
	props: ['icon', 'text', 'content-class'],
}
</script>