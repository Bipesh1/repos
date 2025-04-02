// pages/verified.js

import Head from 'next/head';

const VerifiedPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Head>
        <title>Email Verified</title>
      </Head>
      
      <div className="text-center p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-semibold text-primary mb-4">Your Email Has Been Verified!</h1>
        <p className="text-xl text-secondary mb-6">
          Yours account will be activated by the admin after the successful payment. Thank you for verifying your email!
        </p>
      </div>
    </div>
  );
};

export default VerifiedPage;
