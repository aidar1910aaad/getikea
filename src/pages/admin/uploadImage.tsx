import { useState, useRef } from 'react';

export default function UploadImagePage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<{ url: string } | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }

    const file = inputFileRef.current.files[0];

    const response = await fetch(`/api/parcels/upload?filename=${file.name}`, {
      method: 'POST',
      body: file,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const newBlob = await response.json();
    setBlob(newBlob);
  };

  return (
    <>
      <h1>Upload Your Image</h1>
      <form onSubmit={handleSubmit}>
        <input name="file" ref={inputFileRef} type="file" required />
        <button type="submit">Upload</button>
      </form>
      {blob && (
        <div>
          <h2>Uploaded Image:</h2>
          <a href={blob.url} target="_blank" rel="noopener noreferrer">
            <img src={blob.url} alt="Uploaded" style={{ maxWidth: '100%', height: 'auto' }} />
          </a>
        </div>
      )}
    </>
  );
}
