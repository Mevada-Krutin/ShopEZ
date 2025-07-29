import React from "react";
import Footer from "./Footer";

function Exchange() {
  const ExchangeUrl =
    "https://6920750.fs1.hubspotusercontent-na1.net/hub/6920750/hubfs/featured%20images/Updated%20blog%20banner%20images%20Mar%2022/ecommerce-exchange-policy.png?width=695&name=ecommerce-exchange-policy.png";

  return (
    <>
      <div className="w-full bg-white mt-16"> {/* ~4% margin-top */}
        <div className="m-5 p-3">
          <h2 className="text-center text-2xl font-semibold mb-4">Exchange Policy</h2>
          <img
            src={ExchangeUrl}
            alt="Exchange Policy"
            className="w-1/2 h-auto mx-auto my-5"
          />
          <p className="text-base mt-2 mb-4">
            Thank you for shopping with us! We want you to be completely satisfied
            with your purchase. If you need to exchange an item, we’ve made the
            process simple and straightforward.
          </p>
          <p className="text-base mt-2 mb-4">
            <span className="font-semibold text-base">Exchange Period :</span> You have 30 days from the date of delivery to request
            an exchange for your electronic item(s).
          </p>
          <h2 className="text-xl font-semibold mt-6 mb-2">Eligibility for Exchanges:</h2>
          <p className="text-base mb-3">To be eligible for an exchange, your item must:</p>
          <ul className="list-disc list-inside space-y-2 mb-6">
            <li>Be unused and in the same condition that you received it.</li>
            <li>
              Be in the original packaging, including all accessories, manuals, and documentation.
            </li>
            <li>Not be a non-returnable item (see below).</li>
          </ul>
          <h2 className="text-xl font-semibold mt-6 mb-2">Non-Exchangeable Items:</h2>
          <p className="text-base mb-3">The following items cannot be exchanged:</p>
          <ul className="list-disc list-inside space-y-2 mb-6">
            <li>Opened software and downloadable content</li>
            <li>Personal audio devices (e.g., headphones, earbuds) if opened</li>
            <li>Items marked as final sale</li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Exchange;
