
import axios from 'axios';

// Accessing environment variables with type casting for the development environment
const PINATA_API_KEY = (import.meta as any).env?.VITE_PINATA_API_KEY;
const PINATA_API_SECRET = (import.meta as any).env?.VITE_PINATA_API_SECRET;

/**
 * Uploads a file to Pinata IPFS.
 * @param file The file object to upload.
 * @returns The IPFS URI (ipfs://HASH).
 */
export async function uploadToPinata(file: File): Promise<string> {
  if (!PINATA_API_KEY || !PINATA_API_SECRET) {
    console.warn("Pinata credentials missing. Please check your environment variables.");
    // Fallback for demo purposes if keys are missing
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `ipfs://QmDemoFile${Math.random().toString(36).substring(7)}`;
  }

  const formData = new FormData();
  formData.append('file', file);

  const res = await axios.post(
    'https://api.pinata.cloud/pinning/pinFileToIPFS',
    formData,
    {
      headers: {
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_API_SECRET
      }
    }
  );

  return `ipfs://${res.data.IpfsHash}`;
}

/**
 * Uploads JSON metadata to Pinata IPFS.
 * @param metadata The object to be pinned as JSON.
 * @returns The IPFS URI (ipfs://HASH).
 */
export async function uploadJsonToPinata(metadata: object): Promise<string> {
  if (!PINATA_API_KEY || !PINATA_API_SECRET) {
    console.warn("Pinata credentials missing. Please check your environment variables.");
    // Fallback for demo purposes if keys are missing
    await new Promise(resolve => setTimeout(resolve, 800));
    return `ipfs://QmDemoJson${Math.random().toString(36).substring(7)}`;
  }

  const res = await axios.post(
    'https://api.pinata.cloud/pinning/pinJSONToIPFS',
    metadata,
    {
      headers: {
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_API_SECRET
      }
    }
  );

  return `ipfs://${res.data.IpfsHash}`;
}
