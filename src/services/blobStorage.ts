import { createReadStream } from 'fs';
import { put } from '@vercel/blob';

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/parcels/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to get upload URL');
  }

  const { url } = await response.json();

  const uploadResponse = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type,
    },
    body: file,
  });

  if (!uploadResponse.ok) {
    throw new Error('Failed to upload image');
  }

  return uploadResponse;
};
