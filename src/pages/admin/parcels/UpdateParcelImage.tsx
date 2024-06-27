import { upload } from '@vercel/blob/client';
import { useState, useRef } from 'react';

const UploadParcelImage: React.FC<{ token: string, onUploadComplete: (url: string) => void }> = ({ token, onUploadComplete }) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!inputFileRef.current?.files) {
      setError('No file selected');
      return;
    }

    try {
      const file = inputFileRef.current.files[0];
      const newBlob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/parcels/upload',
      });

      onUploadComplete(newBlob.url);
    } catch (error) {
      setError('Failed to upload image');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="file" ref={inputFileRef} type="file" required />
      <button type="submit">Upload</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default UploadParcelImage;
