import React from "react";
import Footer from "./Footer";

function Return() {
  const ReturnUrl =
    "https://www.comalytics.com/wp-content/uploads/2019/07/returns-policy-featured-image.jpg";

  return (
    <>
      <div className="w-full mt-16 bg-white">
        <div className="mx-5 md:mx-20 p-4">
          <h2 className="text-center text-2xl font-semibold mb-6">Return Policy</h2>
          <img
            src={ReturnUrl}
            alt="Return Policy"
            className="mx-auto mt-2 mb-6 max-w-[60%] object-contain"
          />
          <p className="text-base mt-5">
            Thank you for shopping with us! We strive to provide high-quality
            electronics, but we understand that sometimes things don’t work out.
            Below are our return guidelines to ensure a smooth process.
          </p>

          <div className="mt-5">
            <span className="text-base font-semibold">Return Period: </span>
            <p className="text-base mt-1 ml-4">
              You have 30 days from the date of delivery to return your
              electronic item(s) for a full refund or exchange.
            </p>
          </div>

          <h3 className="text-xl font-semibold mt-8 mb-4">Eligibility for Returns:</h3>
          <ul className="list-disc list-inside space-y-2 text-base ml-4">
            <li>Be unused and in the same condition that you received it.</li>
            <li>
              Be in the original packaging, including all accessories, manuals,
              and documentation.
            </li>
            <li>Include any included warranty cards (if applicable).</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-4">Non-Returnable Items:</h3>
          <ul className="list-disc list-inside space-y-2 text-base ml-4">
            <li>Opened software and downloadable content.</li>
            <li>Personal audio devices (e.g., headphones, earbuds) if opened.</li>
            <li>Items marked as final sale.</li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Return;
