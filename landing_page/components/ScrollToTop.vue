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
      <NuxtImg
        class="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-lg font-bold group-hover:scale-110 transition-transform duration-200"
        src="https://img.icons8.com/color/48/zalo.png"
        alt="zalo"
      />
    </button>

    <!-- Facebook Button -->
    <button
      v-show="visible"
      @click="dialogVisible = true"
      class="w-12 h-12 sm:w-14 sm:h-14 aspect-square rounded-full bg-[#1877f2] text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
    >
      <NuxtImg
        class="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-lg font-bold group-hover:scale-110 transition-transform duration-200"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFBElEQVR4nO2aaYhWVRjHX7VJx1alxcJKp0WqIQmUgmI0yBTKrazoQyKtkNECISVlVNrkl4KkhaiobCEkUlsULSdtESoQMluGMrK0nGkx17LGXzwz/1PP3Ll35p33nlvvB/8wH85z3vv/n+fec57nnOdMqbQfnQEcBcwAHgfWAJ8CPwB7gZ3Ad8By4HagrlRtAMYBbwJtlI+/gBeAY6vBgeOAZW5we4BVwF3AecBpwNFADXAwMBy4GHga2K1nWoCz/k8nGoCfNZjtQCNwZC+ePwZYqedbgROLHXEKgLF6+4bVtjZKFQDoBzwrnt/k2JzevJCKAZwA/CJxmyI1OfkGAu8l1s8O4Pp4o04XXiGxd4ADIvIeDoxWxLNAYJgdiz8pNkECtjaGFCJSateZqJBtDjUU+TXujU7eVWuOtNYWkezaFDajLUatkUuAASn2VjkzOpaeEU8T6fJopB28T4n3yZS+Beq7L6bgwyK9IyLnnYloNSHRP1n2pliaJRcix0TgGuy+xJ/a3hg+9+EcqJd9c24HHOkXIj2lgmdtvg8DJgGPKU8YdgGXA7XARtmuc88dJtvvMR2xPZHhiIz+OuA2YKmctqS5jXTsA14DRrjnr1bfZ842oAhH/hDpgQl7raaJTZEs2Bb+a+AtS3LA6Sn8trHcqt+Pkm2I2ltjOvK9SIc7W3/gXdnN0eeAK4CR9uWAQUCfXmg84fMUcKrazTEdeV+k45xtlmzfVLJ2UjRsDRlWqH2hb0eBDkGGmc62TrZJkTSOF98mtW3NGRbE4A8it4h0obOFw9GgSBphce9S+3m1r43BH0RsZ2rY6Gy2PtZEE3GcQB9gizRPiilQo7hvGBqNOFuv3k+zGISHaFE3uRBbzDmhs+7N0nomBpll1k9S8oKdE4ZFGXG29kvRFjrwssi+AqYqN4QF+EiUEWdrT7GMLq3JeYjGiGSbr3AoSbWp+NCpJgXcryw+rwz+Hn8LzNQYVudx5EWR3J3St0h9DyTsYTO4vQz+Hn9Lxy7ZsDOPI9+K5OSUvlHq+9WCgbPP0wDnlsHf42+BodJpzeNIeGMDM/o/Uv/UikV6HsMMaSzLQxJyxuCEva+qivv0175TjQ06IqYFGcP0PETrRdKQOCC9LruVa66JNfCUmnKTdNblqp+5M/r8xLxun7NWNo018ITuSLeH22AbybyEZ4vMziF9ZbMqoKEx1sBTdGdL4xUfSPKSNov0fLXPUfsn4KAoIl01P5TG+Jikds9hWJxSTemSXyLonelKsv1jVxd3+OgEnKu2zeP6aGKdE+2DMXkDuYVa9CX6Jc7WX1qYjKQTXtCeQq7jVO4PhYdZrnISjrkfAIdmnF/KujvRtZxFKMM90Z1wQuP1tvaGsKvzdSiqrQ8bS91C3arti20KF3Z3R6iT4CJXaawtzBEJzncRa4S7vdrg7hFvsMDAvwgXNoaPgauSA3X1X5tSZxTqhNuaLJHo5rCZtGnlzi04Zy/QV2t0Vcrw7NhEVLRjwWWFOxGgtfG2xH+0pOn6LlUOWJWscamQd6XLEZuU8MJX+6fe+5/BEqG7W9/dmzep9eNh03FisSPuBraJAx7VYCwIPJS8ccp4zkqoAa/aGitVA4CbXHG72ZdTM0LsG0XcesUs3IVzAyqwTbfIpjVVpyuDsG9rSTt1VgXoOKfMVd7oDmur8r+CMk51NypytSgibVFuuSgcB/aj1D3+Bn2I/EvTZgW9AAAAAElFTkSuQmCC"
        alt="man-on-phone"
      />
    </button>

    <el-dialog v-model="dialogVisible" title="Liên Hệ" width="500">
      <el-form
        ref="ruleFormRef"
        :model="data_contact"
        :rules="rules"
        label-width="auto"
        style="max-width: 500px"
      >
        <el-form-item label="Họ tên" prop="name">
          <el-input v-model="data_contact.name" />
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="data_contact.email" />
        </el-form-item>
        <el-form-item label="Chủ Đề" prop="subject">
          <el-input v-model="data_contact.subject" />
        </el-form-item>
        <el-form-item label="Nội dung" prop="message">
          <el-input v-model="data_contact.message" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="handleClose(ruleFormRef)">Đóng</el-button>
          <el-button
            type="primary"
            @click="handleSend(ruleFormRef)"
            :loading="onSend"
          >
            Gửi
          </el-button>
        </div>
      </template>
    </el-dialog>
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
      <NuxtImg
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
      <NuxtImg
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

const ruleFormRef = ref();
const rules = ref({
  name: [
    { required: true, message: "Bạn cần nhập họ tên", trigger: "change" },
    { min: 3, message: "Chiều dài ít nhất 3 kí tự", trigger: "change" },
  ],
  email: [
    { required: true, message: "Bạn cần nhập Email", trigger: "change" },
    { type: "email", message: "Email không đúng định dạng", trigger: "change" },
  ],
  message: [
    { required: true, message: "Bạn cần nhập nội dung", trigger: "change" },
  ],
  subject: [
    { required: true, message: "Bạn cần nhập chủ đề", trigger: "change" },
  ],
});

const dialogVisible = ref(false);
const handleClose = (formEl) => {
  if (!formEl) return;
  dialogVisible.value = false;
  formEl.resetFields();
};

const data_contact = ref({
  name: "",
  email: "",
  subject: "",
  message: "",
});
// { body: JSON.stringify(params) }
const { RestApi } = useApi();

const onSend = ref(false);
const handleSend = async (formEl) => {
  if (!formEl) return;
  onSend.value = true;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const { data, status, error } = await RestApi.view.send_contact({
        body: JSON.stringify(data_contact.value),
      });
      if (status.value == "success") {
        ElNotification.success({
          title: "Thành công",
          message: "Gửi thông tin liên hệ thành công",
        });
        formEl.resetFields();
        dialogVisible.value = false;
      } else {
        ElNotification.error({
          title: "Không thành công",
          message: "Gửi thông tin liên hệ không thành công",
        });
      }
      onSend.value = false;
    } else {
      onSend.value = false;
      // ElNotification.error({
      //   title: "Không thành công",
      //   message: "Gửi thông tin liên hệ không thành công",
      // });
    }
  });
};
</script>
