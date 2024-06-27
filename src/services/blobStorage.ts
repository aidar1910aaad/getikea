// services/blobStorage.ts
const BLOB_API_BASE_URL = 'https://ymzk6kpsgva9quxi.public.blob.vercel-storage.com/'; // Замените на ваш URL блоб-хранилища
const BLOB_READ_WRITE_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${BLOB_API_BASE_URL}/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${BLOB_READ_WRITE_TOKEN}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload image');
  }

  const data = await response.json();
  return data;
};

export const getImageUrl = (imageKey: string) => {
  return `${BLOB_API_BASE_URL}/${imageKey}`;
};

export const deleteImage = async (imageKey: string) => {
  const response = await fetch(`${BLOB_API_BASE_URL}/${imageKey}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${BLOB_READ_WRITE_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete image');
  }

  return response.json();
};
