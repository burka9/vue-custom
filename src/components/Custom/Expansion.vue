<template>
	<div :class="`
	my-expansion
		flex flex-col w-full relative ${!show ? 'shadow' : ''}
	`">
		<div :class="`
		header
			bg-gray-100 relative z-1
			flex p-2 py-1 md:p-4 md:py-2 cursor-pointer transition-all
			${show ? 'active' : ''}
		`" @click="toggle">
			<div class="flex md:flex-col">
				<slot name="title"></slot>
				<div class="actions ml-4 md:m-0 flex">
					<slot name="actions"></slot>
				</div>
			</div>
			<div class="spacer flex-auto"></div>
			<button class="
			expansion-toggle
				flex items-center justify-center
				w-5 outline-none
			">
				<i class="fa fa-chevron-down"></i>
			</button>
		</div>

		<div class="
		expansion-content
			bg-gray-100 mx-3 relative z-0 shadow
			overflow-hidden h-0 px-3 md:px-6 text-gray-700
		">
			<slot></slot>
		</div>
	</div>
</template>


<script>
import gsap from 'gsap'

export default {
	data: () => ({
		show: false,
		duration: 0.2,
	}),

	methods: {
		toggle(e) {
			let count = 0
			let el = e.target
			let exit = false
			let pass = el.classList.contains('header')

			while (!pass && count < 10) {
				if (el.classList.contains('actions'))
					pass = exit = true

				el = el.parentElement
				pass = el.classList.contains('header')
				count ++
			}

			if (exit) return

			// rotate the icon
			let icon = el.children[2].children[0]
			gsap.to(icon, {
				rotate: this.show ? 0 : 180,
				duration: this.duration
			})

			el = el.parentElement.children[1]

			// show the content
			gsap.to(el, {
				height: this.show ? 0 : 'auto',
				duration: this.duration
			})


			icon = icon.parentElement
			if (!this.show) {
				icon.classList.add('clicked')
				icon.classList.add('active')

				document.querySelectorAll('.my-expansion .expansion-toggle').forEach(el => {
					if (!el.classList.contains('clicked') && el.classList.contains('active')) {
						// el.classList.remove('active')
						el.click()
					}
				})
				icon.classList.remove('clicked')
			} else {
				icon.classList.remove('active')
			}

			this.show = !this.show
		},
	},
}
</script>


<style scoped>
.header.active {
	box-shadow: 0 2px 3px #1115;
}
.header .actions button {
	@apply flex
				text-xs md:text-sm text-gray-700
				outline-none md:mx-1 md:px-1 rounded
			hover:bg-gray-400 hover:bg-opacity-30 transition-all;
}
.header .actions i {
	@apply text-xs md:text-sm;
}
</style>