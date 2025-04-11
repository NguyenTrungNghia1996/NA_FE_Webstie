<!-- <template>
  <button
    v-show="visible"
    @click="scrollToTop"
    class="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 aspect-square rounded-full bg-blue-400 text-white shadow-xl hover:bg-blue-700 transition-all duration-300 flex items-center justify-center"
  >
    <Icon
      name="heroicons:arrow-up-solid"
      class="w-6 h-6 sm:w-8 sm:h-8 text-white drop-shadow-md font-bold"
    />
  </button>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const visible = ref(false)

const toggleVisibility = () => {
  const scrollY = window.scrollY
  const oneThird = document.documentElement.scrollHeight / 3
  visible.value = scrollY > oneThird
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', toggleVisibility)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', toggleVisibility)
})
</script> -->
<template>
  <div
    class="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col gap-3 items-end"
  >
    <!-- Zalo Button -->
    <button
      v-show="visible"
      @click="openZalo"
      class="w-12 h-12 sm:w-14 sm:h-14 aspect-square rounded-full bg-[#1877f2] text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
    >
      <!-- <Icon
        name="arcticons:zalo"
        class="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-lg font-bold group-hover:scale-110 transition-transform duration-200"
      /> -->
      <img
        class="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-lg font-bold group-hover:scale-110 transition-transform duration-200"
        src="https://img.icons8.com/color/48/zalo.png"
        alt="zalo"
      />
    </button>

    <!-- Facebook Button -->
    <button
      v-show="visible"
      @click="openFacebook"
      class="w-12 h-12 sm:w-14 sm:h-14 aspect-square rounded-full bg-[#1877f2] text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
    >
      <!-- <Icon
        name="ic:baseline-facebook"
        class="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-lg font-bold group-hover:scale-110 transition-transform duration-200"
      /> -->
      <img
        class="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-lg font-bold group-hover:scale-110 transition-transform duration-200"
        src="https://img.icons8.com/fluency/48/facebook-new.png"
        alt="facebook-new"
      />
    </button>

    <!-- Message Button -->
    <button
      v-show="visible"
      @click="openMessage"
      class="w-12 h-12 sm:w-14 sm:h-14 aspect-square rounded-full bg-[#1877f2] text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
    >
      <!-- <Icon
        name="ic:baseline-message"
        class="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-lg font-bold group-hover:scale-110 transition-transform duration-200"
      /> -->
      <img
        class="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-lg font-bold group-hover:scale-110 transition-transform duration-200"
        src="https://img.icons8.com/fluency/48/facebook-messenger--v2.png"
        alt="facebook-messenger--v2"
      />
    </button>

    <!-- Scroll to Top Button -->
    <button
      v-show="visible"
      @click="scrollToTop"
      class="w-12 h-12 sm:w-14 sm:h-14 aspect-square rounded-full bg-blue-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
    >
      <!-- <Icon
        name="heroicons:arrow-up-solid"
        class="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-lg font-bold group-hover:scale-110 transition-transform duration-200"
      /> -->
      <img
        class="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-lg font-bold group-hover:scale-110 transition-transform duration-200"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABXklEQVR4nO2Wz0pCURCHz0sk1cJdtOhRXNmqfYLQy/ka0jLFyCRq4cJFEVEtovpCGuiSeu753zXmg7t0zvebGQaNURRFURTlHwK0gHP5WmabAHaAC364BPbMFnV+xCqjxk+C1c7/prmToF6+uSFwl29eCPzlmxOCcPm/D8H3tRkTz7j4dZLOrzuVoVwVm4R0fkJ6JtknIZ1f7m0uZtkmIfJTT6FP+Xy4SR5C5GcB8mfAKfDh+du7ZCFE/jZEvlIjJMQ8OoTIz2PkI0MsgkPItVmkkI8M8QDs+8rvAvcp5SNDPAJtV/k28JRDPjLEM3BQV/gQeAmQ77vKV97qB5zYV+DIVvS6hHxkiKmt4DDX2iRcp6Gt2KBE5yMnMbAV6gBvJeU9QyzdOsYGcGwJkWRtAtfpHThxLbQuRFb5mhDu8htCFJHfEMJfvlKoK3/keqYwQE/e7pZ+W1EURVEU48gXupCLtXtzQ/IAAAAASUVORK5CYII="
        alt="collapse-arrow"
      />
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useSettingStore } from "#imports";
const settingStore = useSettingStore();
const visible = ref(false);

const toggleVisibility = () => {
  const scrollY = window.scrollY;
  const oneThird = document.documentElement.scrollHeight / 9;
  visible.value = scrollY > oneThird;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const openZalo = () => {
  // Thay bằng link Zalo Official Account của bạn hoặc link chat Zalo
  // console.log(settingStore.info.message)
  window.open("https://zalo.me/" + settingStore.info.phone, "_blank");
};

const openFacebook = () => {
  window.open(settingStore.info.facebook, "_blank");
};

const openMessage = () => {
  // console.log(settingStore.info.message)
  window.open(settingStore.info.message, "_blank");
};

onMounted(() => {
  window.addEventListener("scroll", toggleVisibility);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", toggleVisibility);
});
</script>
