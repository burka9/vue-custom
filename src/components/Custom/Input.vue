<template>
	<div class="
	my-input
		relative mb-4
	">
		<div class="input flex relative" v-if="input">
			<p :class="`text-gray-600 absolute left-1 z-0 ${textColor}`" v-if="hasPlaceholder">{{ placeholder }}</p>
			<input
				:class="`${bgColor} ${textColor} pl-1 z-10`"
				:type="type"
				:min="min ? min : 'auto'"
				:max="min ? max : 'auto'"
				:disabled="disable"
				@keyup="checkValidity"
				@blur="checkValidity"
				v-model="data"
			/>
		</div>

		<div class="select flex relative h-full" v-else>
			<p :class="`text-gray-600 absolute left-1 z-0 ${textColor}`" v-if="hasPlaceholder">{{ placeholder }}</p>
			<select
				:class="`${bgColor} z-10 pl-1 h-full`"
				:disabled="disable"
				@change="checkValidity"
				@blur="checkValidity"
				v-model="data">
					<option
					v-for="(opt, i) in opts" :key="i"
					:value="opt.value">{{ opt.name }}</option>
					<slot></slot>
			</select>
		</div>

		<transition appear name="message">
			<p :class="`
			message
				absolute left-1 text-xs ${textColor}
			`"
			v-if="this.validity!==null">{{ message }}</p>
		</transition>

	</div>
</template>


<script>
import gsap from 'gsap'

export default {
	props: ['type', 'min', 'max', 'error', 'options', 'placeholder', 'rules', 'required', 'formName', 'disabled'],
	model: {
		prop: 'model',
		event: 'blur'
	},

	data: () => ({
		selector: '',
		data: '',
		validity: null,
		disable: false,
		require: val => val.length !== 0 || 'Required Field!',
	}),

	created() {
		this.data = this.$attrs.model ? this.$attrs.model : ''
		this.selector = this.placeholder ? this.placeholder : `A${parseInt(Math.random()*100000)}`
		if (this.formName)
			this.formName[this.selector] = null

		// disabled
		this.disable = typeof this.disabled !== 'undefined' ? this.disabled : false

		// console.log(this.$listeners.keyup)
	},

	computed: {
		hasPlaceholder() { return typeof this.placeholder !== 'undefined' },
		input() { return typeof this.type !== 'undefined' },
		select() { return typeof this.options !== 'undefined' },
		opts() { return this.options ? this.options : [] },
		hasError() { return typeof this.error === 'string' && this.error !== '' },
		message() {
			// eslint-disable-next-line vue/no-side-effects-in-computed-properties
			this.validity = this.hasError ? this.error : this.validity
			if (!this.hasError) this.checkValidity()
			return this.validity===null ? '' : typeof this.validity === 'boolean' && !this.hasError ? 'Looks Good!' : this.validity
		},
		defaultColor() { return 'border-gray-300 hover:border-gray-500' },
		successColor() { return 'border-green-700' },
		errorColor() { return 'border-red-700' },
		defaultText() { return 'text-black' },
		successText() { return 'text-green-700' },
		errorText() { return 'text-red-700' },
		defaultPlaceholder() { return 'placeholder-gray-400' },
		successPlaceholder() { return 'placeholder-green-400' },
		errorPlaceholder() { return 'placeholder-red-400' },
		bgColor() {
			return this.validityCondition(this.defaultColor, this.successColor, this.errorColor)
		},
		textColor() {
			return this.validityCondition(this.defaultText, this.successText, this.errorText)
		},
		placeholderColor() {
			return this.validityCondition(this.defaultPlaceholder, this.successPlaceholder, this.errorPlaceholder)
		},
	},

	methods: {
		validityCondition(a, b, c) {
			return this.validity===null ? a : typeof this.validity === 'boolean' ? b : c
		},
		checkValidity(e) {
			// check placeholder font-size
			if (e)
				if (e.target.parentElement.children.length > 1) {
					if (this.data === '')
						gsap.to(e.target.parentElement.children[0], {
							fontSize: '1rem',
							top: 0,
							duration: .15
						})
					else
						gsap.to(e.target.parentElement.children[0], {
							fontSize: '.75rem',
							top: -14,
							duration: .15
						})
				}
			
			
			let hasRules = false
			let pass = false

			if (this.rules) { // has rule prop
				this.rules.every(rule => {
					pass = rule(this.data)
					return typeof pass === 'boolean'
				})

				this.validity = pass
				hasRules = this.rules.length > 0
			}
			
			if (typeof this.required !== 'undefined' && this.required !== false) { // has required prop
				this.validity = this.require(this.data)
				hasRules = true
			}

			if (this.formName)
				this.formName[this.selector] = !hasRules ? true : typeof this.validity==='boolean'

			if (!hasRules)
				this.$emit('blur', this.data)
			if (typeof this.validity === 'boolean')
				this.$emit('blur', this.data)
		}
	},
}
</script>


<style scoped>
input {
	@apply bg-transparent border-0 border-b
				w-full transition-all outline-none;
}
select {
	@apply bg-transparent border-0 border-b
				w-full h-full transition-all outline-none;
}

.message-enter,
.message-leave-to {
	transform: rotateX(-90deg);
	transform-origin: top;
}
.message-enter-active,
.message-leave-active {
	transition: all .4s ease;
}
</style>