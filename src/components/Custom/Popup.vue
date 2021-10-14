<template>
	<transition appear name="popup">
		<div :class="className" :style="style" v-if="show">
			<h1 class="mx-1">{{ text }}</h1>
			<button
			class="
				bg-gray-200 text-gray-700
				rounded outline-none self-end text-sm p-0.5 px-2 mt-2
			"
			@click="close">
				Close
			</button>
		</div>
	</transition>
</template>


<script>
export default {
	props: ['text', 'hide', 'timeout', 'top', 'right', 'bottom', 'left', 'center', 'width', 'content-class'],
	model: {
		prop: 'hide',
		event: 'hide',
	},

	data: () => ({
	}),

	created() {
		if (!isNaN(this.timeout)) {
			setTimeout(() => this.close(), parseInt(this.timeout))
		}
	},

	computed: {
		show() { return this.hide },
		getWidth() {
			return !isNaN(this.width) ? this.width : 200
		},
		myClass() {
			return `popup
							flex flex-col
							bg-gray-700 text-white
							fixed pos-center z-10
							p-2 shadow-xl rounded `
		},
		customClass() {
			return {
				'pos-top': typeof this.top !== 'undefined',
				'pos-right': typeof this.right !== 'undefined',
				'pos-bottom': typeof this.bottom !== 'undefined',
				'pos-left': typeof this.left !== 'undefined',
				'pos-center': typeof this.center !== 'undefined',
			}
		},
		className() {
			let temp = this.myClass
			Object.entries(this.customClass).forEach(item => {
				if (item[1])
					temp += item[0] + ' '
			})
			temp += typeof this.contentClass !== 'undefined' ? this.contentClass : ''
			return temp
		},
		style() {
			return `
				--zero: 5px;
				--width: ${this.getWidth}px;
			`
		}
	}, // computed

	methods: {
		close() {
			this.$emit('hide', false)
		},
	},

	watch: {
		show() {
			if (!isNaN(this.timeout) && this.show) {
				setTimeout(() => this.close(), parseInt(this.timeout))
			}
		}
	},
}
</script>


<style scoped>
.popup {
	width: var(--width);
}
.pos-center {
	top: 45%;
	left: calc(calc(100% - var(--width)) / 2);
}
.pos-top {
	top: var(--zero);
}
.pos-right {
	left: calc(100% - var(--width) - var(--zero));
}
.pos-bottom {
	top: auto;
	bottom: var(--zero);
}
.pos-left {
	left: var(--zero);
}

.popup-enter {
	opacity: 0;
	transform: translateY(-20%);
}
.popup-leave-to {
	opacity: 0;
	transform-origin: top;
	transform: translateY(-10%);
	transform: rotateX(90deg);
}
.popup-enter-active,
.popup-leave-active {
	transition: all .4s ease;
}
</style>