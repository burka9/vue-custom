<template>
	<div class="
	my-tabs
		flex w-full"
	:style="`--height: ${height ? height : '40px'}`">

		<transition name="tab-pane-scroll-btns" appear>
			<button
			class="arrows mr-2"
			:disabled="!canScrollLeft"
			@click="scrollLeft"
			v-show="scrollable">
				<f-icon :icon="left"></f-icon>
			</button>
		</transition>


		<div class="
		wrapper
			flex w-full
			overflow-x-scroll
		">
			<button :class="`tab-button ${i==selected ? 'active' : ''}`"
			v-for="(item, i) in items" :key="i"
			@click="changeActive($event, i)">
				{{ item }}
			</button>
		</div>
		

		<transition name="tab-pane-scroll-btns" appear>
			<button
			class="arrows ml-2"
			:disabled="!canScrollRight"
			@click="scrollRight"
			v-show="scrollable">
				<f-icon :icon="right"></f-icon>
			</button>
		</transition>
	</div>
</template>


<script>
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons'
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'

export default {
	props: ['model', 'items', 'height'],
	model: {
		prop: 'model',
		event: 'update',
	},
	
	data: () => ({
		selected: -1,
		wrapper: null,

		scrollable: false,
		canScrollLeft: false,
		canScrollRight: true,

		xScroll: 0,
		scrollStep: 100,
		offset: 50,
	}),

	computed: {
		left: () => (faAngleDoubleLeft),
		right: () => (faAngleDoubleRight),
	},

	mounted() {
		try {
			this.checkScrollable()
		} catch(e) { console.log('scrollable error:', e) }
	},

	created() {
		this.selected = 0
		this.$emit('update', 0)
	},

	methods: {
		checkScrollable() { this.scrollable = this.$el.children[1].scrollWidth > this.$el.children[1].clientWidth },
		changeActive(el, index) {
			if (this.scrollable)
				el.target.scrollIntoView({
					behavior: 'smooth',
					inline: 'center'
				})
			this.selected = index
			this.$emit('update', index)
		},
		setWrapper(e) {
			let pass = e.target.classList.contains('arrows')
			this.wrapper = pass ? e.target.parentElement.children[1] : e.target.parentElement.parentElement.children[1]
		},
		scrollLeft(e) {
			this.setWrapper(e)
			if (this.canScrollLeft) {
				// console.log('scrolling to left')
				this.xScroll = this.wrapper.scrollLeft
				this.xScroll -= this.scrollStep
				this.scroll()
			}
		},
		scrollRight(e) {
			this.setWrapper(e)
			if (this.canScrollRight) {
				// console.log('scrolling to right')
				this.xScroll = this.wrapper.scrollLeft
				this.xScroll += this.scrollStep
				this.scroll()
			}
		},
		scroll() {
			this.canScrollLeft = this.xScroll > 0
			this.xScroll = this.xScroll >= 0 ? this.xScroll : 0

			this.wrapper.scrollTo({
				behavior: 'smooth',
				left: this.xScroll,
			})
		},
	},

	watch: {
		xScroll(newValue, oldValue) {
			// console.log(newValue, oldValue, this.wrapper.scrollLeft)
			if (newValue > oldValue && oldValue > this.wrapper.scrollLeft) {
				this.canScrollRight = false
				this.xScroll = this.wrapper.scrollLeft
			} else {
				this.canScrollRight = true
			}
		},
		items() {
			this.checkScrollable()
		},
	},
}
</script>


<style scoped>
.my-tabs, .wrapper {
	height: var(--height);
}

button.tab-button {
	word-break: keep-all;
	min-width: 100px;
	@apply px-2 outline-none transition-all hover:bg-gray-500 hover:bg-opacity-10;
}
button.active {
	@apply border-b border-blue-600;
}

@media screen and (min-width: 768px) {
	.top-bar {
		height: 50px;
		max-height: 50px;
	}
}
@media screen and (min-width: 768px) {
	.top-bar {
		height: 25px;
		max-height: 25px;
	}
}

button.arrows {
	@apply border-gray-400 flex justify-center items-center outline-none w-8 text-gray-400 opacity-75;
}
button.arrows:not([disabled]) {
	@apply text-gray-500 hover:bg-gray-400 hover:bg-opacity-30 hover:text-gray-800 px-2;
}
::-webkit-scrollbar {
	@apply h-0 w-0;
}

::-webkit-scrollbar-track {
  @apply md:bg-transparent;
}

::-webkit-scrollbar-thumb {
	@apply md:bg-gray-700;
	/* @apply md:bg-transparent; */
}


.tab-pane-scroll-btns-enter,
.tab-pane-scroll-btns-leave-to {
	width: 0;
}
.tab-pane-scroll-btns-enter-active,
.tab-pane-scroll-btns-leave-active {
	transition: all 200ms ease;
}
</style>