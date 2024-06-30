import { put } from '@vercel/blob';
import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const chunks: Uint8Array[] = [];
  req.on('data', (chunk) => {
    chunks.push(chunk);
  });

  req.on('end', async () => {
    const buffer = Buffer.concat(chunks);
    const { searchParams } = new URL(req.url || '', 'http://localhost:3000');
    const filename = searchParams.get('filename');

    if (!filename) {
      return res.status(400).json({ error: 'Filename is required' });
    }

    try {
      const blob = await put(filename, buffer, {
        access: 'public',
      });
      return res.status(200).json(blob);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to upload image' });
    }
  });

  req.on('error', (err) => {
    return res.status(500).json({ error: 'Error processing file' });
  });
}
