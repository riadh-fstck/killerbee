<script setup lang="ts">
import {ref} from 'vue'
import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import {Bars3Icon, ShoppingBagIcon, XMarkIcon, UserIcon} from '@heroicons/vue/24/outline'

const navigation = {
  categories: [
    {
      id: 'women',
      name: 'Femme',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            {name: 'Tops', href: '#'},
            {name: 'Dresses', href: '#'},
            {name: 'Pants', href: '#'},
            {name: 'Denim', href: '#'},
            {name: 'Sweaters', href: '#'},
            {name: 'T-Shirts', href: '#'},
            {name: 'Jackets', href: '#'},
            {name: 'Activewear', href: '#'},
            {name: 'Browse All', href: '#'},
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            {name: 'Watches', href: '#'},
            {name: 'Wallets', href: '#'},
            {name: 'Bags', href: '#'},
            {name: 'Sunglasses', href: '#'},
            {name: 'Hats', href: '#'},
            {name: 'Belts', href: '#'},
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            {name: 'Full Nelson', href: '#'},
            {name: 'My Way', href: '#'},
            {name: 'Re-Arranged', href: '#'},
            {name: 'Counterfeit', href: '#'},
            {name: 'Significant Other', href: '#'},
          ],
        },
      ],
    },
    {
      id: 'men',
      name: 'Homme',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
        },
        {
          name: 'Artwork Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
          imageAlt:
              'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            {name: 'Tops', href: '#'},
            {name: 'Pants', href: '#'},
            {name: 'Sweaters', href: '#'},
            {name: 'T-Shirts', href: '#'},
            {name: 'Jackets', href: '#'},
            {name: 'Activewear', href: '#'},
            {name: 'Browse All', href: '#'},
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            {name: 'Watches', href: '#'},
            {name: 'Wallets', href: '#'},
            {name: 'Bags', href: '#'},
            {name: 'Sunglasses', href: '#'},
            {name: 'Hats', href: '#'},
            {name: 'Belts', href: '#'},
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            {name: 'Re-Arranged', href: '#'},
            {name: 'Counterfeit', href: '#'},
            {name: 'Full Nelson', href: '#'},
            {name: 'My Way', href: '#'},
          ],
        },
      ],
    },
  ],
}

const open = ref(false)
</script>
<template>
  <div class="bg-white">
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-40 lg:hidden" @close="open = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
                         enter-to="opacity-100" leave="transition-opacity ease-linear duration-300"
                         leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-black bg-opacity-25"/>
        </TransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
                           enter-from="-translate-x-full" enter-to="translate-x-0"
                           leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
                           leave-to="-translate-x-full">
            <DialogPanel class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
              <div class="flex px-4 pb-2 pt-5">
                <button type="button"
                        class="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                        @click="open = false">
                  <span class="absolute -inset-0.5"/>
                  <span class="sr-only">Close menu</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true"/>
                </button>
              </div>

              <!-- Links -->
              <TabGroup as="div" class="mt-2">
                <div class="border-b border-gray-200">
                  <TabList class="-mb-px flex space-x-8 px-4">
                    <Tab as="template" v-for="category in navigation.categories" :key="category.name"
                         v-slot="{ selected }">
                      <button
                          :class="[selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900', 'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium']">
                        {{ category.name }}
                      </button>
                    </Tab>
                  </TabList>
                </div>
                <TabPanels as="template">
                  <TabPanel v-for="category in navigation.categories" :key="category.name"
                            class="space-y-10 px-4 pb-8 pt-10">
                    <div class="grid grid-cols-2 gap-x-4">
                      <div v-for="item in category.featured" :key="item.name" class="group relative text-sm">
                        <div
                            class="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                          <img :src="item.imageSrc" :alt="item.imageAlt" class="object-cover object-center"/>
                        </div>
                        <a :href="item.href" class="mt-6 block font-medium text-gray-900">
                          <span class="absolute inset-0 z-10" aria-hidden="true"/>
                          {{ item.name }}
                        </a>
                        <p aria-hidden="true" class="mt-1">Shop now</p>
                      </div>
                    </div>
                    <div v-for="section in category.sections" :key="section.name">
                      <p :id="`${category.id}-${section.id}-heading-mobile`" class="font-medium text-gray-900">
                        {{ section.name }}</p>
                      <ul role="list" :aria-labelledby="`${category.id}-${section.id}-heading-mobile`"
                          class="mt-6 flex flex-col space-y-6">
                        <li v-for="item in section.items" :key="item.name" class="flow-root">
                          <a :href="item.href" class="-m-2 block p-2 text-gray-500">{{ item.name }}</a>
                        </li>
                      </ul>
                    </div>
                  </TabPanel>
                </TabPanels>
              </TabGroup>

              <div class="space-y-6 border-t border-gray-200 px-4 py-6">
                <div class="flow-root">
                  <a href="#" class="group -m-2 flex items-center p-2">
                    <UserIcon class="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                              aria-hidden="true"/>
                    <span class="ml-2 block text-gray-500">Se connecter</span>
                  </a>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
    <header class="relative overflow-hidden">
      <!-- Top navigation -->
      <nav aria-label="Top" class="relative z-20 bg-white bg-opacity-90 backdrop-blur-xl backdrop-filter">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="flex h-16 items-center">
            <button type="button" class="relative rounded-md bg-white p-2 text-gray-400 lg:hidden" @click="open = true">
              <span class="absolute -inset-0.5"/>
              <span class="sr-only">Open menu</span>
              <Bars3Icon class="h-6 w-6" aria-hidden="true"/>
            </button>

            <!-- Logo -->
            <div class="ml-4 flex lg:ml-0">
              <a href="#">
                <span class="sr-only">Your Company</span>
                <img class="h-7 w-auto" src="/images/logo.png" alt=""/>
              </a>
            </div>

            <!-- Flyout menus -->
            <PopoverGroup class="hidden lg:ml-8 lg:block lg:self-stretch">
              <div class="flex h-full space-x-8">
                <Popover v-for="category in navigation.categories" :key="category.name" class="flex" v-slot="{ open }">
                  <div class="relative flex">
                    <PopoverButton
                        :class="[open ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-700 hover:text-gray-800', 'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out']">
                      {{ category.name }}
                    </PopoverButton>
                  </div>

                  <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0"
                              enter-to-class="opacity-100" leave-active-class="transition ease-in duration-150"
                              leave-from-class="opacity-100" leave-to-class="opacity-0">
                    <PopoverPanel class="absolute inset-x-0 top-full bg-white text-sm text-gray-500">
                      <!-- Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow -->
                      <div class="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true"/>
                      <!-- Fake border when menu is open -->
                      <div class="absolute inset-0 top-0 mx-auto h-px max-w-7xl px-8" aria-hidden="true">
                        <div
                            :class="[open ? 'bg-gray-200' : 'bg-transparent', 'h-px w-full transition-colors duration-200 ease-out']"/>
                      </div>

                      <div class="relative">
                        <div class="mx-auto max-w-7xl px-8">
                          <div class="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                            <div class="col-start-2 grid grid-cols-2 gap-x-8">
                              <div v-for="item in category.featured" :key="item.name"
                                   class="group relative text-base sm:text-sm">
                                <div
                                    class="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                  <img :src="item.imageSrc" :alt="item.imageAlt" class="object-cover object-center"/>
                                </div>
                                <a :href="item.href" class="mt-6 block font-medium text-gray-900">
                                  <span class="absolute inset-0 z-10" aria-hidden="true"/>
                                  {{ item.name }}
                                </a>
                                <p aria-hidden="true" class="mt-1">Shop now</p>
                              </div>
                            </div>
                            <div class="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                              <div v-for="section in category.sections" :key="section.name">
                                <p :id="`${section.name}-heading`" class="font-medium text-gray-900">{{
                                    section.name
                                  }}</p>
                                <ul role="list" :aria-labelledby="`${section.name}-heading`"
                                    class="mt-6 space-y-6 sm:mt-4 sm:space-y-4">
                                  <li v-for="item in section.items" :key="item.name" class="flex">
                                    <a :href="item.href" class="hover:text-gray-800">{{ item.name }}</a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </PopoverPanel>
                  </transition>
                </Popover>
              </div>
            </PopoverGroup>

            <div class="ml-auto flex items-center">
              <div class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                <a href="#" class="group -m-2 flex items-center p-2">
                  <UserIcon class="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"/>
                  <span class="sr-only">items in cart, view bag</span>
                </a>
                <span class="h-6 w-px bg-gray-200" aria-hidden="true"/>
              </div>

              <!-- Cart -->
              <div class="ml-4 flow-root lg:ml-6">
                <a href="#" class="group -m-2 flex items-center p-2">
                  <ShoppingBagIcon class="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                   aria-hidden="true"/>
                  <span class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                  <span class="sr-only">items in cart, view bag</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div class="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div class="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div class="sm:max-w-lg">
            <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Summer styles are finally here</h1>
            <p class="mt-4 text-xl text-gray-500">This year, our new summer collection will shelter you from the harsh
              elements of a world that doesn't care if you live or die.</p>
          </div>
          <div>
            <div class="mt-10">
              <!-- Decorative image grid -->
              <div aria-hidden="true"
                   class="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl">
                <div
                    class="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div class="flex items-center space-x-6 lg:space-x-8">
                    <div class="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div class="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                        <img src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg"
                             alt="" class="h-full w-full object-cover object-center"/>
                      </div>
                      <div class="h-64 w-44 overflow-hidden rounded-lg">
                        <img src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg"
                             alt="" class="h-full w-full object-cover object-center"/>
                      </div>
                    </div>
                    <div class="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div class="h-64 w-44 overflow-hidden rounded-lg">
                        <img src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg"
                             alt="" class="h-full w-full object-cover object-center"/>
                      </div>
                      <div class="h-64 w-44 overflow-hidden rounded-lg">
                        <img src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg"
                             alt="" class="h-full w-full object-cover object-center"/>
                      </div>
                      <div class="h-64 w-44 overflow-hidden rounded-lg">
                        <img src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg"
                             alt="" class="h-full w-full object-cover object-center"/>
                      </div>
                    </div>
                    <div class="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div class="h-64 w-44 overflow-hidden rounded-lg">
                        <img src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg"
                             alt="" class="h-full w-full object-cover object-center"/>
                      </div>
                      <div class="h-64 w-44 overflow-hidden rounded-lg">
                        <img src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg"
                             alt="" class="h-full w-full object-cover object-center"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <a href="#"
                 class="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700">Shop
                Collection</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>
