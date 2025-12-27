import { uploadToPinata, uploadJsonToPinata } from '../lib/pinata';

/**
 * Upload file OR JSON metadata to IPFS (Pinata)
 */
export async function uploadToIPFS(fileOrJson: File | object): Promise<string> {
  const apiKey = (import.meta as any).env?.VITE_PINATA_API_KEY;
  const apiSecret = (import.meta as any).env?.VITE_PINATA_API_SECRET;

  if (!apiKey || !apiSecret) {
    throw new Error('Pinata API keys are missing');
  }

  try {
    if (fileOrJson instanceof File) {
      return await uploadToPinata(fileOrJson);
    } else {
      return await uploadJsonToPinata(fileOrJson);
    }
  } catch (error) {
    console.error('IPFS upload failed:', error);
    throw error;
  }
}

/**
 * Convert ipfs://CID to https gateway
 */
export function getIpfsUrl(ipfsPath: string): string {
  if (!ipfsPath) return '';
  if (ipfsPath.startsWith('http')) return ipfsPath;
  return `https://gateway.pinata.cloud/ipfs/${ipfsPath.replace('ipfs://', '')}`;
}