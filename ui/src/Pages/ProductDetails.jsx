// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { ethers } from 'ethers';
// import SustainableProductNFT from '../scdata/SustainableProductNFT.json'; // Import ABI

// const contractAddress = "0x2bFDF4E55B96E4FC5bACF166b8b2ABeAE8784135"; // Your contract address

// const ProductDetails = () => {
//   const { productId } = useParams();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       try {
//         if (!window.ethereum) {
//           alert("Please install MetaMask!");
//           return;
//         }

//         const provider = new ethers.BrowserProvider(window.ethereum);
//         const signer = await provider.getSigner();
//         const contract = new ethers.Contract(contractAddress, SustainableProductNFT.abi, signer);

//         const productData = await contract.getProductDetails(productId);
//         setProduct(productData);
//       } catch (err) {
//         console.error("Error fetching product details:", err);
//       }
//     };

//     fetchProductDetails();
//   }, [productId]);

//   if (!product) return <p>Loading...</p>;

//   return (
//     <div>
//       <h2>{product.productName}</h2>
//       <p>{product.description}</p>
//       <p>{product.sustainabilityClaims}</p>
//       <a href={`ipfs://${product.ipfsMetadataHash}`} target="_blank" rel="noopener noreferrer">View on IPFS</a>
//     </div>
//   );
// };

// export default ProductDetails;
// ``
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SustainableProductNFT from '../scdata/SustainableProductNFT.json'; // Import the ABI
import { ethers } from 'ethers';

const contractAddress = "0x2bFDF4E55B96E4FC5bACF166b8b2ABeAE8784135"; // Your contract address

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        if (!window.ethereum) {
          alert("Please install MetaMask!");
          return;
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, SustainableProductNFT.abi, provider);
        
        const productDetails = await contract.getProductDetails(productId);
        setProduct(productDetails);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h1>{product.productName}</h1>
      <p>Description: {product.description}</p>
      <p>Sustainability Claims: {product.sustainabilityClaims}</p>
      <a href={`ipfs://${product.ipfsMetadataHash}`} target="_blank" rel="noopener noreferrer">View on IPFS</a>
    </div>
  );
};

export default ProductDetails;
