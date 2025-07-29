import React from "react";
import Footer from "./Footer";

function Contact() {
  const ContactUrl =
    "https://www.searchenginejournal.com/wp-content/uploads/2022/08/contact-us-2-62fa2cc2edbaf-sej.png";

  return (
    <>
      <div className="w-full bg-white mt-16"> {/* margin-top ~4% */}
        <div className="m-5 p-2">
          <h2 className="text-center text-2xl font-semibold mb-4">Contact Us</h2>
          <img
            src={ContactUrl}
            alt="Contact Us"
            className="w-1/2 h-auto mx-auto my-5"
          />
          <p className="text-base mt-2 mb-4">
            We’re here to help! If you have any questions, concerns, or feedback,
            please don’t hesitate to reach out to us. Our customer service team is
            ready to assist you.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">Customer Support :</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <p>Email : <span className="font-mono">krutinmevada@gmail.com</span></p>
            </li>
            <li>
              <p>Phone : <span className="font-mono">+91 9974856157</span></p>
            </li>
            <li>
              <p>
                Live Chat : Available on our website from [hours of operation]
              </p>
            </li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-2">Business Hours :</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <p>Monday to Friday : 9 AM – 6 PM (EST)</p>
            </li>
            <li>
              <p>Saturday : 10 AM – 4 PM (EST)</p>
            </li>
            <li>
              <p>Sunday : Closed</p>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
