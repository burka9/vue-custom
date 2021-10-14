<template>
	<div class="bubble-bg">

		<svg :width="'100%'" :height="'100%'">

			<circle
			v-for="(bubble, index) in bubbles" :key="index"
			:class="{ animate: bubble.animate }"
			:cx="`${bubble.xPos}%`"
			:cy="`${bubble.yPos}%`"
			:r="bubble.radius"
			/>
			
		</svg>
		
	</div>
</template>


<script>
export default {
	data() {
		return {
			boxWidth: 0,
			boxHeight: 0,
			bubbleCount: 15,
			radi: [25, 40, 65, 80, 65, 35, 25],
		}
	},

	mounted() {
		this.setBoxSize()
		window.onresize = () => {
			this.setBoxSize()
		}
	},

	methods: {
		randomItem(array) {
			let index = Math.floor(Math.random()*100%array.length)
			return array[index]
		},
		setBoxSize() {
			let box = document.querySelector('.bubble-bg')
			this.boxHeight = box.clientHeight
			this.boxWidth = box.clientWidth
			this.setBubbleCount()
		},
		setBubbleCount() {
			if (this.boxWidth < 576) {
				this.bubbleCount = 8
			} else if (this.boxWidth < 768) {
				this.bubbleCount = 10
			} else if (this.boxWidth < 992) {
				this.bubbleCount = 15
			} else if (this.boxWidth < 1200) {
				this.bubbleCount = 20
			} else {
				this.bubbleCount = 25
			}
		}
	},

	computed: {
		bubbles() {
			let temp = []
			let counter = 0
			let skip = false

			while(counter < this.bubbleCount) {
				let selector = Math.floor((counter*1.618)%this.radi.length)
				let radius = this.radi[selector]

				let xPos = Math.floor(Math.random()*11) * 10
				let yPos = Math.floor(Math.random()*11) * 10
				let animate = xPos === yPos

				temp.every(item => {
					skip = item.xPos==xPos && item.yPos==yPos
					return !skip
				})
				if (skip)
					continue

				temp.push({ xPos, yPos, radius, animate })

				counter++
			}
			
			return this.boxWidth!==0 && this.boxHeight!==0 ? temp : []
		}
	},
}
</script>


<style scoped>
.bubble-bg {
	@apply fixed top-0 left-0 w-full h-full;
	z-index: -2;

	background: linear-gradient(60deg, blue, rgb(200, 50, 50));
}

circle {
	fill: #ccc2;
}
</style>