import Image from 'next/image';
import React from 'react';
import barcode1 from "@/assets/barcode1.jpg"
import barcode2 from "@/assets/barcode2.jpg"
import barcode3 from "@/assets/barcode3.jpg"


const PaymentPage = () => {
  // Placeholder QR code data - replace with actual QR code images or generation
  const paymentOptions = [
    {
      name: "Bank Payment",
      color: "bg-blue-500",
      qrCodePlaceholder: barcode1
    },
    {
      name: "Esewa",
      color: "bg-purple-500", 
      qrCodePlaceholder: barcode2
    },
    {
      name: "Khalti",
      color: "bg-green-500",
      qrCodePlaceholder: barcode3
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Scan to Pay</h1>
        <p className="text-gray-600 mt-2">Choose your preferred payment method</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {paymentOptions.map((option, index) => (
          <div 
            key={index} 
            className={`
              ${option.color} 
              bg-opacity-10 
              rounded-xl 
              shadow-lg 
              p-6 
              flex 
              flex-col 
              items-center 
              transform 
              transition-all 
              duration-300 
              hover:scale-105 
              hover:shadow-2xl
            `}
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {option.name}
            </h2>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <Image 
                src={option.qrCodePlaceholder} 
                alt={`${option.name} QR Code`} 
                className="w-full max-w-[250px] max-h-[200px] "
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center text-gray-600">
        <p>Scan the QR code with your mobile payment app</p>
        <p className="text-sm mt-2">Secure and instant payment</p>
      </div>
    </div>
  );
}

export default PaymentPage;