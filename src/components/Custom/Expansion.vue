<template>
	<div :class="`
	my-expansion
		flex flex-col w-full relative ${!show ? 'shadow' : ''}
	`">
		<div :class="`
		header
			relative z-1
			flex p-2 py-1 md:p-4 md:py-2 cursor-pointer transition-all
			${headerClass ? headerClass : ''}
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
				<f-icon :icon="icon"></f-icon>
			</button>
		</div>

		<div :class="`
		expansion-content
			mx-3 relative z-0 shadow
			overflow-hidden h-0 px-3 md:px-6 text-gray-700
			${contentClass ? contentClass : ''}
		`">
			<slot></slot>
		</div>
	</div>
</template>


<script>
import gsap from 'gsap'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

export default {
	props: ['header-class', 'content-class'],
	
	data: () => ({
		show: false,
		duration: 0.2,
	}),

	computed: {
		icon: () => (faChevronDown),
	},

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
	@apply shadow-md rounded transition-all outline-none
				mx-2 px-2 text-sm;
}
.header .actions i {
	@apply text-xs md:text-sm;
}
</style>