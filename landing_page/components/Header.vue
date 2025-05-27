<template>
  <div class="h-[70px] md:h-[80px] w-full bg-white z-[10] border-b border-gray-300 fixed">
    <div class="container mx-auto h-full flex justify-between items-center px-4">
      <!-- Logo -->
      <nuxt-link to="/" class="m-3 inline-block">
        <NuxtImg :src="settingStore.info.logo" :alt="settingStore.info.logo" placeholder="/placeholder.png" class="h-16 md:h-20 w-auto max-w-[150px] md:max-w-[200px]" width="200" height="80" sizes="sm:150px md:200px" />
      </nuxt-link>
      <!-- Mobile Menu Button -->
      <button @click="toggleMobileMenu" class="md:hidden p-2 focus:outline-none transition-all duration-300" aria-label="Menu mobile">
        <div class="w-6 h-6 relative">
          <span class="block absolute h-0.5 w-full bg-gray-800 rounded-full transition-all duration-300 ease-out" :class="{
            'rotate-45 top-1/2 -translate-y-1/2': isMobileMenuOpen,
            'top-1': !isMobileMenuOpen,
          }"></span>
          <span class="block absolute h-0.5 w-full bg-gray-800 rounded-full transition-all duration-300 ease-out" :class="{
            'opacity-0': isMobileMenuOpen,
            'top-1/2 -translate-y-1/2': !isMobileMenuOpen,
          }"></span>
          <span class="block absolute h-0.5 w-full bg-gray-800 rounded-full transition-all duration-300 ease-out" :class="{
            '-rotate-45 top-1/2 -translate-y-1/2': isMobileMenuOpen,
            'bottom-1': !isMobileMenuOpen,
          }"></span>
        </div>
      </button>

      <!-- Desktop Menu -->
      <div class="hidden md:flex flex-row justify-end items-center w-full h-full">
        <nav class="flex-1 flex justify-end items-center h-full">
          <ul class="flex h-full">
            <li v-for="(item, index) in mainMenuItems" :key="index" class="relative group h-full">
              <NuxtLink :to="item.url || '#'" class="h-full relative flex justify-center px-3 lg:px-4 hover:text-blue-600 transition-colors after:absolute after:top-0 after:left-0 after:right-0 after:h-[3px] after:bg-gradient-to-r after:from-[#437ae7] after:to-[#3dc5b6] after:transition-all after:duration-300 after:scale-x-0 after:origin-left hover:after:scale-x-100">
                <span class="flex items-center font-roboto font-bold text-sm lg:text-base">
                  {{ item.label }}
                </span>
              </NuxtLink>
              <div v-if="item.children.length > 0" class="absolute left-1/2 transform -translate-x-1/2 mt-0 w-48 bg-white shadow-lg rounded-b-md py-1 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out">
                <NuxtLink v-for="(child, childIndex) in item.children" :key="childIndex" :to="child.url || '#'" class="block px-4 py-2 text-sm text-gray-800 hover:bg-blue-50 transition-colors duration-200">
                  {{ child.label }}
                </NuxtLink>
              </div>
            </li>
          </ul>
        </nav>

        <!-- Desktop Search -->
        <div class="ml-4 relative">
          <input type="text" placeholder="Tìm kiếm..." class="pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all w-40 lg:w-48 text-sm" v-model="searchQuery" @keyup.enter="performSearch" />
          <button class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors" @click="performSearch">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 lg:h-5 lg:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
        <Translate class="mx-3" />
      </div>
    </div>
    <!-- Mobile Menu -->
    <transition enter-active-class="transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" leave-active-class="transition-all duration-300 ease-[cubic-bezier(0.7,0,0.84,0)]" enter-from-class="opacity-0 -translate-y-10" enter-to-class="opacity-100 translate-y-0" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-10">
      <div v-show="isMobileMenuOpen" class="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-[9999] overflow-hidden max-h-[80vh] overflow-y-auto">
        <!-- Mobile Search -->
        <div class="px-4 py-3 flex justify-center">
          <div class="relative w-full max-w-xs">
            <input type="text" placeholder="Tìm kiếm..." class="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm" v-model="searchQuery" @keyup.enter="performSearch" />
            <button class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors" @click="performSearch">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          <Translate class="mx-3" />
        </div>

        <ul class="py-2">
          <li v-for="(item, index) in mainMenuItems" :key="index" class="border-b border-gray-100 last:border-0">
            <div v-if="item.children.length > 0" @click="toggleMobileSubmenu(index)" class="flex justify-between items-center px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200">
              <span class="text-sm">{{ item.label }}</span>
              <svg class="w-4 h-4 transition-transform duration-300" :class="{ 'rotate-90': activeMobileSubmenu === index }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>

            <NuxtLink v-else :to="item.url || '#'" @click="isMobileMenuOpen = false" class="flex justify-between items-center px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200 text-sm">
              {{ item.label }}
            </NuxtLink>

            <!-- Submenu Transition -->
            <transition @before-enter="beforeSubmenuEnter" @enter="submenuEnter" @leave="submenuLeave" :css="false">
              <ul v-if="item.children.length > 0 && activeMobileSubmenu === index" class="bg-gray-50 pl-6 overflow-hidden">
                <li v-for="(child, childIndex) in item.children" :key="childIndex" class="border-b border-gray-100 last:border-0">
                  <NuxtLink :to="child.url || '#'" @click="isMobileMenuOpen = false" class="block px-4 py-3 hover:bg-gray-100 transition-colors duration-200 text-sm">
                    {{ child.label }}
                  </NuxtLink>
                </li>
              </ul>
            </transition>
          </li>
        </ul>

      </div>
    </transition>
  </div>
</template>

<script setup>

// import { useGoogleTranslate } from '#imports';

// const { activeLanguage, setLanguage, supportedLanguages, isLoaded } = useGoogleTranslate();
// watch(activeLanguage, async (newLanguage, oldLanguage) => { 
//   if (newLanguage == "en") {
//     window.location.reload();
//   }
// })

const isMobileMenuOpen = ref(false);
const activeMobileSubmenu = ref(null);
const searchQuery = ref("");

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  if (!isMobileMenuOpen.value) {
    activeMobileSubmenu.value = null;
  }
};

const toggleMobileSubmenu = index => {
  activeMobileSubmenu.value = activeMobileSubmenu.value === index ? null : index;
};

const performSearch = () => {
  if (searchQuery.value.trim()) {
    console.log("Searching for:", searchQuery.value);
    isMobileMenuOpen.value = false;
  }
};

// Animation functions for submenu
const beforeSubmenuEnter = el => {
  el.style.height = "0";
};

const submenuEnter = (el, done) => {
  const height = el.scrollHeight;
  el.style.transition = "height 0.5s cubic-bezier(0.16,1,0.3,1)";
  el.style.height = `${height}px`;

  el.addEventListener("transitionend", done, { once: true });
};

const submenuLeave = (el, done) => {
  el.style.transition = "height 0.3s cubic-bezier(0.7,0,0.84,0)";
  el.style.height = "0";

  el.addEventListener("transitionend", done, { once: true });
};

const convertMenu = data => {
  // const mainMenu = originalMenu
  //   .filter(item => item.idMenuCha === null)
  //   .map(item => ({
  //     id: item.id,
  //     label: item.ten,
  //     url: item.url.trim(),
  //     children: [],
  //   }))
  //   .sort((a, b) => a.thutu - b.thutu);

  // originalMenu.forEach(item => {
  //   if (item.idMenuCha !== null) {
  //     const parentMenu = mainMenu.find(menu => menu.id === item.idMenuCha);
  //     if (parentMenu) {
  //       parentMenu.children.push({
  //         label: item.ten,
  //         url: item.url.trim(),
  //       });
  //     }
  //   }
  // });

  // return mainMenu.map(menu => {
  //   const { id, ...rest } = menu;
  //   return rest;
  // });
  const map = {};
  const tree = [];

  // Bước 1: Tạo bản đồ id -> node
  data.forEach(item => {
    map[item.id] = {
      label: item.ten,
      url: item.url,
      children: []
    };
  });

  // Bước 2: Gắn node con vào cha
  data.forEach(item => {
    const parentId = item.idMenuCha;
    if (parentId === null || parentId === 0) {
      tree.push(map[item.id]); // menu gốc
    } else if (map[parentId]) {
      map[parentId].children.push(map[item.id]);
    }
  });

  return tree;
};

const mainMenuItems = ref([]);
const { RestApi } = useApi();
const { data, status, error } = await RestApi.view.menu();

if (status.value == "success") {
  mainMenuItems.value = convertMenu(data.value);
} else {
  console.log("error:", error);
}

import { useSettingStore } from "#imports";
const settingStore = useSettingStore();
</script>
