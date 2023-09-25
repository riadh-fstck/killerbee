<script setup lang="ts">
import LayoutComponent from "../layout/LayoutComponent.vue";
import HeroSection from "../sections/home/HeroSection.vue";
import CategorySection from "../sections/home/CategorySection.vue";
import FeaturedSection from "../sections/home/FeaturedSection.vue";
import FavoriteSection from "../sections/home/FavoriteSection.vue";
import CtaSection from "../sections/home/CtaSection.vue";

const favorites = [
  {
    id: 1,
    name: 'Black Basic Tee',
    price: '$32',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-01.jpg',
    imageAlt: "Model wearing women's black cotton crewneck tee.",
  },
  {
    id: 2,
    name: 'Off-White Basic Tee',
    price: '$32',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-02.jpg',
    imageAlt: "Model wearing women's off-white cotton crewneck tee.",
  },
  {
    id: 3,
    name: 'Mountains Artwork Tee',
    price: '$36',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-03.jpg',
    imageAlt:
        "Model wearing women's burgundy red crewneck artwork tee with small white triangle overlapping larger black triangle.",
  },
]
</script>

<template>
  <LayoutComponent>
    <main>
      <CategorySection/>
      <FeaturedSection/>
      <FavoriteSection :favorites="favorites"/>
      <CtaSection/>
    </main>
  </LayoutComponent>
</template>
