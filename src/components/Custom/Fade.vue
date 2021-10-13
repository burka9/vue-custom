<template>
	<transition appear name="fade" mode="out-in">
		<slot></slot>
	</transition>
</template>


<style scoped>
.fade-enter,
.fade-leave-to {
	opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
	transition: all .35s ease;
}
</style>