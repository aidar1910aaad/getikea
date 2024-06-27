/** @type {import('next').NextConfig} */

import dotenv from 'dotenv';
dotenv.config();

export default {
  reactStrictMode: true,
  env: {
    BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
  },
};
