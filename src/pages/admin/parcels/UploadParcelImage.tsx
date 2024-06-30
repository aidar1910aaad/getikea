// src/pages/admin/parcels/UploadParcelImage.tsx
import React, { useState, useRef } from 'react';
import { PutBlobResult } from '@vercel/blob';
import styles from './UploadParcelImage.module.css'; // Import the CSS module

interface UploadParcelImageProps {
  onUpload: (url: string) => void;
}

const UploadParcelImage: React.FC<UploadParcelImageProps> = ({ onUpload }) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!inputFileRef.current?.files) {
      throw new Error('No file selected');
    }

    const file = inputFileRef.current.files[0];

    const response = await fetch(`/api/parcels/upload?filename=${file.name}`, {
      method: 'POST',
      body: file,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const newBlob = (await response.json()) as PutBlobResult;
    setBlob(newBlob);
    onUpload(newBlob.url); // Вызываем onUpload с URL загруженного изображения
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Загрузить изображение посылки</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.fileLabel}>
          <input name="file" ref={inputFileRef} type="file" className={styles.fileInput} required />
          Выбрать файл
        </label>
        <button type="submit" className={styles.button}>Загрузить изображение</button>
      </form>
    </div>
  );
};

export default UploadParcelImage;
