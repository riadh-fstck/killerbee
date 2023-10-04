<script setup lang="ts">
import LayoutAuthenticated from '../../layout/LayoutAuthentificated.vue'
import axiosInstance from '../../utils/axiosInstance'
import {reactive} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()

const state = reactive({
  form: {
    name: '',
    description: '',
    price_per_unit: '',
    range: '',
    grammage: ''
  }
})

const init = async () => {
  await fetchModel()
}

const fetchModel = async () => {
  try {
    await axiosInstance.get('/models/' + router.currentRoute.value.params.id).then((response: any) => {
      state.form = response.data
    })
  } catch (error) {
    console.error("Error fetching models", error)
  }
}

const submit = async () => {
  try {
    await axiosInstance.put('/models/' + router.currentRoute.value.params.id, state.form).then(() => {
      router.push({name: 'models'})
    })
  } catch (error) {
    console.log("Error fetching models", error)
  }
}

init()
</script>
<template>
  <LayoutAuthenticated>
    <form @submit.prevent="submit">
      <div class="space-y-12 px-4">
        <div class="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
          <div>
            <h2 class="text-base font-semibold leading-7 text-gray-900">Update Model</h2>
            <p class="mt-1 text-sm leading-6 text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Quas cupiditate laboriosam fugiat.</p>
          </div>

          <div class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
            <div class="sm:col-span-full">
              <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
              <div class="mt-2">
                <input type="text" name="name" id="name" required v-model="state.form.name"
                       class="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"/>
              </div>
            </div>

            <div class="sm:col-span-full">
              <label for="description" class="block text-sm font-medium leading-6 text-gray-900">Description</label>
              <div class="mt-2">
                <textarea id="description" name="description" required rows="3" v-model="state.form.description"
                          class="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"/>
              </div>
            </div>

            <div class="sm:col-span-2 sm:col-start-1">
              <label for="price" class="block text-sm font-medium leading-6 text-gray-900">Price per unit</label>
              <div class="mt-2">
                <input type="text" name="price" id="price" v-model="state.form.price_per_unit"
                       class="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"/>
              </div>
            </div>

            <div class="sm:col-span-2">
              <label for="range" class="block text-sm font-medium leading-6 text-gray-900">Range</label>
              <div class="mt-2">
                <input type="text" name="range" id="range" v-model="state.form.range"
                       class="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"/>
              </div>
            </div>

            <div class="sm:col-span-2">
              <label for="grammage" class="block text-sm font-medium leading-6 text-gray-900">Grammage</label>
              <div class="mt-2">
                <input type="text" name="grammage" id="grammage" v-model="state.form.grammage"
                       class="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-end gap-x-6">
        <RouterLink to="/models" class="text-sm font-semibold leading-6 text-gray-900">Cancel</RouterLink>
        <button type="submit"
                class="rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600">
          Save
        </button>
      </div>
    </form>
  </LayoutAuthenticated>
</template>