// import React from 'react';
// import QRCode from 'react-qr-code';

// const ProductCard = ({ product, account }) => {
//   const isCreator = product.creator.toLowerCase() === account.toLowerCase();

//   return (
//     <div className="border p-4">
//       <h3 className="text-lg font-bold">{product.productName}</h3>
//       {isCreator ? (
//         <>
//           <p>{product.description}</p>
//           <p>{product.sustainabilityClaims}</p>
//           <a href={`ipfs://${product.ipfsMetadataHash}`} target="_blank" rel="noopener noreferrer">View on IPFS</a>
//         </>
//       ) : (
//         <>
//           <p>Scan the QR code to see full details.</p>
//           {/* <QRCode value={`http://localhost:5173/products/${product.productId}`} /> */}
//           <QRCode
//             size={100}
//             bgcolor="white"
//             fgcolor="black"
//             value={`http://https://sustainable-products.vercel.ap/products/${product.productId}`}
//           />
//         </>
//       )}
//     </div>
//   );
// };

// export default ProductCard;
import React, { useState } from 'react';
import QRCode from 'react-qr-code';

const ProductCard = ({ product, account }) => {
  const isCreator = product.creator.toLowerCase() === account.toLowerCase();
  const [isScanned, setIsScanned] = useState(false);

  const handleQRCodeScan = () => {
    // Simulate QR code scan by setting the state to true
    setIsScanned(true);
  };

  return (
    <div className="border p-4">
      <h3 className="text-lg font-bold">{product.productName}</h3>
      {isCreator ? (
        <>
          <p>{product.description}</p>
          <p>{product.sustainabilityClaims}</p>
          <a href={`ipfs://${product.ipfsMetadataHash}`} target="_blank" rel="noopener noreferrer">View on IPFS</a>
        </>
      ) : isScanned ? (
        <>
          <p>{product.description}</p>
          <p>{product.sustainabilityClaims}</p>
        </>
      ) : (
        <>
          <p>Scan the QR code to see full details.</p>
          <QRCode
            size={100}
            bgcolor="white"
            fgcolor="black"
            value={`Product Name: ${product.productName}, Description: ${product.description}, Sustainability Claims: ${product.sustainabilityClaims}`}
            onClick={handleQRCodeScan} // Simulate scan on click
          />
        </>
      )}
    </div>
  );
};

export default ProductCard;
