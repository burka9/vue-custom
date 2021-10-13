<template>
	<transition-group appear name="group-fade">
		<slot></slot>
	</transition-group>
</template>


<style scoped>
.group-fade-enter,
.group-fade-leave-to {
	opacity: 0;
}

.group-fade-enter-active,
.group-fade-leave-active {
	transition: all .35s ease;
}
</style>