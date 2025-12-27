import axios from 'axios';

// Accessing environment variables via Vite-style import.meta.env
const PINATA_API_KEY = (import.meta as any).env?.VITE_PINATA_API_KEY;
const PINATA_SECRET = (import.meta as any).env?.VITE_PINATA_API_SECRET;

export async function uploadFileToIPFS(file: File): Promise<string> {
  if (!PINATA_API_KEY || !PINATA_SECRET) {
    console.warn("Pinata credentials missing. Falling back to mock.");
    await new Promise(resolve => setTimeout(resolve, 1500));
    return `ipfs://Qm${Math.random().toString(36).substring(2, 48)}`;
  }

  const formData = new FormData();
  formData.append('file', file);

  const res = await axios.post(
    'https://api.pinata.cloud/pinning/pinFileToIPFS',
    formData,
    {
      headers: {
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET
      }
    }
  );

  return `ipfs://${res.data.IpfsHash}`;
}

export async function uploadJsonToIPFS(data: object): Promise<string> {
  if (!PINATA_API_KEY || !PINATA_SECRET) {
    console.warn("Pinata credentials missing. Falling back to mock.");
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `ipfs://Qm${Math.random().toString(36).substring(2, 48)}`;
  }

  const res = await axios.post(
    'https://api.pinata.cloud/pinning/pinJSONToIPFS',
    data,
    {
      headers: {
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET
      }
    }
  );

  return `ipfs://${res.data.IpfsHash}`;
}
