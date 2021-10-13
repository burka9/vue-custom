<template>
	<Fade>
		<div class="
		dialog
			fixed top-0 z-10
			bg-black bg-opacity-60 h-screen w-screen
			flex justify-center items-center
		"
		:style="dialogStyle"
		v-if="show">

		<transition appear name="dialog">
			<div :class="`
			content
				bg-white p-3 rounded shadow-3xl mx-auto
				max-w-full max-h-full
				${contentClass}
			`"
			:style="style"
			>
				<slot></slot>
			</div>
		</transition>
		
		</div>
	</Fade>
</template>


<script>
import { mapGetters } from 'vuex'
export default {
	props: ['show', 'width', 'height', 'persistent', 'content-class'],
	
	computed: {
		...mapGetters([
			'sidebar'
		]),
		dialogStyle() {
			let sidebar = location.pathname.search('teacher') === 1 ? this.$store.getters['teacher/sidebar'] : this.sidebar
			return `
				--left: ${sidebar ? -250 : 0 }px;
			`
		},
		getWidth() {
			if (this.width && this.width!='') {
				if (this.width === 'full')
					return `--width: 100%`
				else
					return `--width: ${this.width};`
			}

			return `--width: auto`
		},
		getHeight() {
			if (this.height && this.height!='') {
				if (this.height === 'full')
					return `--height: 100%`
				else
					return `--height: ${this.height};`
			}

			return `--height: auto`
		},
		style() {
			return `
				${this.getWidth}
				${this.getHeight}
			`
		}
	},

	methods: {
		close() {
			if (this.persistent!==undefined && this.show) {
				document.querySelector('.dialog .content').classList.add('shake')
				setTimeout(() => {
					document.querySelector('.dialog .content').classList.remove('shake')
				}, 250)
				return
			}

			this.$emit('close')
		},
	},

	mounted() {
		document.body.addEventListener('click', e => {
			if (e.target.classList.contains('dialog')) this.close()
		})
	},
}
</script>

<style scoped>
.dialog {
	left: var(--left);
}
.content {
	width: var(--width);
	height: var(--height);
}
.dialog-enter,
.dialog-leave-to {
	transform: scaleY(0);
}
.dialog-enter-active,
.dialog-leave-active {
	transition-delay: .3s;
	transition: all 350ms ease;
}

.shake {
	animation: shake .24s;
}

@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}
</style>