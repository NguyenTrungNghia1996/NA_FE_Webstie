<template>
  <div>
    <h1>Test Page</h1>
    <p>This is a test page.</p>
    <div @click="onClickUpload()">
      <a-avatar :size="150" shape="square">
        <template #icon><UserOutlined /></template>
      </a-avatar>
    </div>
    <input class="hidden" ref="inputFileUpload" type="file" accept="image/jpeg,image/png" @change="onFilesChange" />
  </div>
</template>
<script setup>
const { RestApi } = useApi();
// const data = await RestApi.test.get();
const inputFileUpload = ref(null);
const onClickUpload = () => {
  console.log("onClickUpload");
  inputFileUpload.value.click();
};
const onFilesChange = async e => {
  const files = e.target.files[0] || [];
  const file_type = files.type;
  if (file_type === "image/png" || file_type === "image/jpeg" || file_type === "image/jpg") {
    const url_img = await RestApi.upload_s3(files.name, files, { acl: "public-read", encoding: "blob", content_type: files.type ,bucket: "website"});
    console.log("onClickUpload",url_img);
    // modelAccount.value.avatar = url_img;
  } else {
    // _message.error = t("the-uploaded-file-is-not-in-the-correct-format");
  }
};
</script>
