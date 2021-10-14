<template>
  <div id="app" class="flex flex-col p-5 border-content">
    <Fade>
      <bubble-bg v-if="show" />
    </Fade>

    <div :class="`
      fixed top-5 right-5 p-2 rounded-lg transition-all z-10
      ${show ?
        'bg-black bg-opacity-30 text-white shadow-xl hover:bg-opacity-40' :
        'hover:bg-gray-200 hover:bg-opacity-40 hover:shadow-lg'}
    `">
      <Toggle v-model="show" label="Show Bubble Background" />
    </div>

    
    <h1 class="text-3xl font-bold">Vue Custom components</h1>

    <Fade>
      <div class="flex flex-col px-5">
        <h3>Chips</h3>
        <div class="chips flex my-2">
          <Chip class="m-2" text="Chip" />
          <Chip class="m-2" text="Rounded Chip" rounded />
          <Chip class="m-2" text="Dark Chip" dark />
          <Chip class="m-2" text="Dark rounded Chip" dark rounded />
        </div>

        <h3>Buttons</h3>
        <div class="buttons flex my-2">
          <button class="material plain mr-4">Material Design</button>
          <button class="material dark bg-blue-400 hover:bg-blue-500 mr-4">Material Blue</button>
          <button class="material dark bg-red-400 hover:bg-red-500 mr-4">Material Red</button>
          <button class="material dark bg-green-400 hover:bg-green-500 mr-4">Material Green</button>
        </div>

        <h3>Input / Select</h3>
        <div class="inputs grid grid-cols-4 gap-x-6 my-2">
          <Input class="mr-4" placeholder="First Name" type="text" />
          <Input placeholder="Required" required type="text" />
          <Input class="mr-4 w-20" placeholder="Select"
            :options="[
              { name: 'One', value: 1 },
              { name: 'Two', value: 2 }
            ]" />
          <Input class="mr-4 w-36" placeholder="Required Select"
          required
            :options="[
              { name: 'Three', value: 3 },
              { name: 'Four', value: 4 }
            ]" />
        </div>

        <h3>Loading</h3>
        <div class="loadings flex my-2">
          <Loading class="mr-4" text="Please wait" type="dots" custom-class="bg-gray-800" />
          <Loading class="mr-4" text="Please wait" type="dots" :count="10" custom-class="bg-gray-800" />
          <!-- <Loading class="mr-4" text="Please wait" type="circle" custom-class="bg-gray-800" /> -->
        </div>

        <h3>Dialog</h3>
        <div class="dialogs flex my-2">
          <button class="material dark bg-green-500 hover:green-600 mr-4" @click="dialog=true">Show dialog</button>
          <Dialog v-model="dialog">
            <div class="flex flex-col">
              <h1>Custom Dialog</h1>
            </div>
            <button class="self-end mt-4 material xs dark bg-red-400 hover:bg-red-500" @click="dialog = false">Close</button>
          </Dialog>

          <button class="material dark bg-green-500 hover:green-600" @click="persistent=true">Show persistent dialog</button>
          <Dialog v-model="persistent" persistent>
            <div class="flex flex-col">
              <h1>Persistent Dialog</h1>
            </div>
            <button class="self-end mt-4 material xs dark bg-red-400 hover:bg-red-500" @click="persistent = false">Close</button>
          </Dialog>
        </div>

        <h3>Expansions</h3>
        <div class="expansions flex flex-col my-2">
          <Expansion v-for="i in 2" :key="`expansion-${i}`"
          class="my-2"
          :header-class="i==1 ? 'bg-green-600 text-white' : 'bg-gray-800 text-white'"
          :content-class="i==1 ? 'bg-green-200' : 'bg-gray-200'"
          >
            <template v-slot:title class="bg-red-500">
              <h1 class="mb-2 text-xl">Title {{ i }}</h1>
            </template>
            <template v-slot:actions>
              <button class="bg-gray-100 hover:bg-gray-200 text-gray-800">Action 1</button>
              <button class="bg-gray-100 hover:bg-gray-200 text-gray-800">Action 2</button>
            </template>
            <div class="my-3">
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur autem corporis reiciendis optio quas ipsa perspiciatis fugiat saepe quae officia iusto sequi deserunt cumque culpa voluptas, rem, dolorem neque. Quidem!</p>
            </div>
          </Expansion>
        </div>

        <h3>Popup</h3>
        <div class="popups flex my-2">
          <button class="material dark bg-blue-500 hover:bg-blue-600 mr-4" @click="center = true">Center Popup</button>
          <button class="material dark bg-blue-500 hover:bg-blue-600 mr-4" @click="top = true">Top Center Popup</button>
          <button class="material dark bg-blue-500 hover:bg-blue-600 mr-4" @click="bottom = true">Bottom Right Popup</button>
          <button class="material dark bg-blue-500 hover:bg-blue-600 mr-4" @click="timed = true">Timed Popup</button>
          <Popup
            text="This is a popup text"
            v-model="center"
          />
          <Popup
            text="This is a popup text"
            top
            v-model="top"
          />
          <Popup
            text="This is a popup text"
            bottom right
            v-model="bottom"
          />
          <Popup
            text="This is popup has timeout of 5 second"
            timeout="5000"
            right
            width="300"
            v-model="timed"
          />
        </div>

        <h3>Tab Pane</h3>
        <div class="tabs flex flex-col overflow-hidden my-2">
          <div class="flex mb-5 items-center">
            <Tabs
              :items="['Tab 1', 'Tab 2', 'Tab 3']"
              v-model="tab1"
            />
          </div>
          <div class="flex mb-5 items-center">
            <Tabs
              :items="['Tab A', 'Tab B', 'Tab C', 'Tab D', 'Tab E', 'Tab F']"
              v-model="tab2"
            />
          </div>
          <div class="flex mb-5 items-center">
            <Tabs
              :items="[1,2,3,4,5,6,7,8,9,10].map(i => `Tab ${i}`)"
              v-model="tab2"
            />
          </div>
        </div>
      </div>
    </Fade>
    
  </div>
</template>


<script src="https://pro.fontawesome.com/releases/v5.10.0/c"></script>
<script>

export default {
  name: 'App',

  data: () => ({
    dialog: false,
    persistent: false,
    top: false,
    center: false,
    bottom: false,
    timed: false,
    tab1: '',
    tab2: '',
    show: false,
  }),
}
</script>


<style src="@/assets/styles/app.css"></style>
<style>
#app {
}
h3 {
  @apply pt-5;
}
.tabs p {
  min-width: 200px;
}
.chips,
.buttons,
.dialogs,
.expansions,
.inputs,
.loadings,
.popups,
.tabs {
  @apply px-5;
}
</style>
