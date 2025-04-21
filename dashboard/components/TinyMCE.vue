<script setup>
const { RestApi } = useApi();
const props = defineProps({
  modelValue: { type: String, default: "" },
  id: { type: String, default: "tinymce-editor" },
  height: { type: Number, default: 200 },
  menubar: { type: Boolean, default: false },
  plugins: {
    type: Array,
    default: () => ["advlist", "autolink", "lists", "link", "image", "charmap", "preview", "anchor", "searchreplace", "visualblocks", "code", "fullscreen", "insertdatetime", "media", "table", "code", "help", "wordcount"],
  },
  toolbar: {
    type: String,
    default: "undo redo | blocks | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | code",
  },
});

const emit = defineEmits(["update:modelValue"]);

let editorInstance = null;
async function imagesUploadHandler(blobInfo, success, failure) {
  // try {
  //   const uploadedUrl = await RestApi.upload_s3(blobInfo.filename(), blobInfo.blob(), {
  //     acl: "public-read",
  //     encoding: "blob",
  //     content_type: blobInfo.blob().type,
  //     bucket: "website",
  //   });

  //   console.log("Uploaded:", uploadedUrl);

  //   // TinyMCE chỉ cần một URL
  //   success({
  //     src: uploadedUrl,
  //     alt: blobInfo.filename(),
  //   });
  // } catch (err) {
  //   console.error("Upload error:", err);
  //   failure("Không thể tải ảnh lên. Vui lòng thử lại.");
  // }
}

// Mở chọn ảnh từ máy tính → upload dưới dạng base64
function filePickerCallback(callback, value, meta) {
  if (meta.filetype === "image") {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    input.onchange = async function () {
      const file = this.files[0];
      if (!file) return;

      try {
        // Gọi API upload ảnh lên S3
        const uploadedUrl = await RestApi.upload_s3(file.name, file, {
          acl: "public-read",
          encoding: "blob",
          content_type: file.type,
          bucket: "website",
        });

        // Gọi callback đúng định dạng
        callback(uploadedUrl, { alt: file.name });
      } catch (error) {
        console.error("S3 upload error:", error);
        alert("Upload ảnh thất bại. Vui lòng thử lại.");
      }
    };

    input.click();
  }
}

onMounted(() => {
  const script = document.createElement("script");
  script.src = "/tinymce/tinymce.min.js";
  script.referrerPolicy = "origin";

  script.onload = () => {
    tinymce.init({
      license_key: "gpl",
      branding: false,
      selector: `#${props.id}`,
      height: props.height,
      menubar: props.menubar,
      plugins: props.plugins,
      toolbar: props.toolbar,
      skin_url: "/tinymce/skins/ui/oxide",
      content_css: "/tinymce/skins/content/default/content.min.css",
      file_picker_types: "image",
      // images_upload_handler: imagesUploadHandler,
      // images_upload_url: false,
      // file_picker_types: "image",
      file_picker_callback: filePickerCallback,
      setup(editor) {
        editorInstance = editor;
        editor.on("init", () => {
          editor.setContent(props.modelValue || "");
        });
        editor.on("Change KeyUp Undo Redo", () => {
          emit("update:modelValue", editor.getContent());
        });
      },
    });
  };

  document.head.appendChild(script);
});

onBeforeUnmount(() => {
  if (editorInstance) {
    editorInstance.destroy();
    editorInstance = null;
  }
});

watch(
  () => props.modelValue,
  newValue => {
    if (editorInstance && editorInstance.getContent() !== newValue) {
      editorInstance.setContent(newValue || "");
    }
  },
);
</script>

<template>
  <textarea :id="id" />
</template>
