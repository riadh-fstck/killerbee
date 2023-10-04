<script setup lang="ts">
import LayoutAuthenticated from '../../layout/LayoutAuthentificated.vue'
import axiosInstance from '../../utils/axiosInstance'
import {reactive} from "vue";
import {RouterLink} from "vue-router";

const state = reactive({
  models: [] as any,
  headerTable: [] as any,
  search: '',
  isLoading: false
})

const init = async () => {
  await fetchModels()
}

const fetchModels = async () => {
  try {
    await axiosInstance.get('/models').then((response: any) => {
      state.models = response.data
      state.headerTable = Object.keys(response.data[0]).splice(1, 5)
    })
  } catch (error) {
    console.log("Error fetching models", error)
  }
}

const searchModels = async () => {
  state.isLoading = true
  try {
    await axiosInstance.get(`/models/search?name=${state.search}`).then((response: any) => {
      state.models = response.data
      state.isLoading = false
    })
  } catch (error) {
    state.isLoading = false
    console.log("Error fetching models", error)
  }
}

const deleteModel = async (id: string) => {

  if (!confirm('Are you sure you want to delete this model?'))
    return

  try {
    await axiosInstance.delete(`/models/${id}`).then(() => {
      fetchModels()
    })
  } catch (error) {
    console.log("Error deleting model", error)
  }
}

init()
</script>
<template>
  <LayoutAuthenticated>
    <div class="px-3">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-base font-semibold leading-6 text-gray-900">Models</h1>
          <p class="mt-2 text-sm text-gray-700">Lists of all models</p>
        </div>
        <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex items-baseline">
          <div class="relative mt-2 flex items-center mr-4 mb">
            <form @submit.prevent="searchModels">
              <input v-model="state.search" type="text" name="search" id="search"
                     class="block w-full pl-2 rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"/>
              <div class="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                <div v-if="state.isLoading" role="status">
                  <svg aria-hidden="true"
                       class="w-5 h-5 mt-0.5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                       viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"/>
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"/>
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>
                <button v-else type="submit"
                        class="inline-flex items-center bg-cyan-600 rounded border border-gray-200 px-1 font-sans text-xs text-white">
                  <span>Search</span>
                </button>
              </div>
            </form>
          </div>
          <RouterLink to="/models/create"
                      class="block rounded-md bg-cyan-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600">
            Add Model
          </RouterLink>
        </div>
      </div>
      <div class="mt-8 flow-root" v-if="state.models">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <span v-if="state.models.length === 0" class="text-gray-500 text-sm flex flex-1">No models found <button @click="fetchModels" class="text-cyan-600 hover:text-cyan-900 ml-5">Refresh</button></span>
            <table v-else class="min-w-full divide-y divide-gray-300">
              <thead>
              <tr>
                <th v-for="header in state.headerTable" :key="header"
                    class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {{ header }}
                </th>
                <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
              <tr v-for="content in state.models" :key="content.id">
                <td class="whitespace-nowrap py-4 pl-3 text-sm font-medium text-gray-900">{{ content?.name }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ content?.description }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ content?.price_per_unit }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ content?.range }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ content?.grammage }}</td>
                <td class="relative whitespace-nowrap py-4 pl-3 text-sm font-medium space-x-4">
                  <RouterLink :to="`models/${content.id}/edit`" class="text-cyan-600 hover:text-cyan-900">Edit<span
                      class="sr-only">, </span></RouterLink>
                  <button type="button" class="text-red-600 hover:text-red-700" @click="deleteModel(content.id)">
                    Delete
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </LayoutAuthenticated>
</template>
