import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import SustainableProductNFT from '../scdata/SustainableProductNFT.json';

const contractAddress = "0x2bFDF4E55B96E4FC5bACF166b8b2ABeAE8784135";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [account, setAccount] = useState('');

  useEffect(() => {
    const connectWallet = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
      }
    };
    connectWallet();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!window.ethereum) {
          alert("Please install MetaMask!");
          return;
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, SustainableProductNFT.abi, signer);

        const productCount = await contract.getProductCount();
        const productList = [];

        for (let i = 0; i < productCount; i++) {
          const product = await contract.getProductDetails(i);
          productList.push({
            productId: i,
            productName: product.productName,
            description: product.description,
            ipfsMetadataHash: product.ipfsMetadataHash,
            sustainabilityClaims: product.sustainabilityClaims,
            creator: product.creator,
          });
        }

        setProducts(productList);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Header />
      <h2 className="text-xl p-4">Product Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {products.map((product) => (
          <ProductCard 
            key={product.productId}
            product={product}
            account={account} // Pass the current account to ProductCard
          />
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
