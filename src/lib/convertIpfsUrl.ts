export const convertIpfsUrl = (ipfsUrl) => {
  const prefix = "lens.infura-ipfs.io/";
  if (ipfsUrl.startsWith(prefix)) {
    return ipfsUrl;
  } else {
    const hash = ipfsUrl.replace("ipfs://", "");
    const convertedUrl = `https://lens.infura-ipfs.io/ipfs/${hash}`;
    return convertedUrl;
  }
};
