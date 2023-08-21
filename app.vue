<script setup lang="ts">
const filelist = ref<FileList | null>();
const formidable = ref(false);
const uploadResponse = ref('');
const loading = ref(false);

async function upload() {
  if (loading.value) return;
  if (!filelist.value) return;

  const file = filelist.value.item(0);
  if (!file) return;

  const formData = new FormData();
  formData.append('field', 'hello!');
  formData.append('file', file);

  loading.value = true;
  uploadResponse.value = '';

  const endpoint = formidable.value ? '/api/upload-formidable' : '/api/upload';

  try {
    uploadResponse.value = await $fetch(endpoint, {
      method: 'POST',
      body: formData,
      // duplex: 'half',
    });
  } catch (error) {
    if (error instanceof Error) {
      uploadResponse.value = error.message;
    } else {
      throw error;
    }
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <form @submit.prevent="upload">
    <input
      type="file"
      @change="(event) => filelist = (event.target as HTMLInputElement).files"
    />

    <label>
      <input v-model="formidable" type="checkbox" />
      <span>use Formidable</span>
    </label>

    <div style="padding-top: 1rem">
      <button>send</button>
      <span v-if="loading">loading...</span>
    </div>

    <pre>{{ uploadResponse }}</pre>
  </form>
</template>
