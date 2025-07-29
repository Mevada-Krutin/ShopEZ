import React from "react";
import Footer from "./Footer";

function About() {
  const AboutUrl =
    "https://media.licdn.com/dms/image/v2/D4E12AQF15pWXXaISjg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1690527479981?e=2147483647&v=beta&t=m8Q1eAjZE1su8ndDJKuKcmnJedxw4zpu7kDGVxYZY0E";

  return (
    <>
      <div className="w-full bg-white">
        <div className="m-4 p-5">
          <h2 className="text-center text-2xl font-semibold mt-5">About Us</h2>
          <img
            src={AboutUrl}
            alt="About Us"
            className="w-1/2 h-auto mx-auto my-4"
          />
          <p className="text-base mt-2">
            At{" "}
            <span className="font-semibold text-lg">[Digital Shop]</span>, we are
            passionate about technology and dedicated to providing our customers
            with the latest and greatest in electronic products. Founded in
            [2024], we set out to create a platform where tech enthusiasts and
            everyday users alike can find high-quality electronics at
            competitive prices.
          </p>

          <h3 className="text-xl font-semibold mt-6">Our Mission</h3>
          <p className="text-base mt-2">
            <span className="font-semibold">Our mission is simple:</span> to
            make technology accessible to everyone. We believe that the right
            gadgets can enhance your life, whether you’re looking for
            cutting-edge devices, reliable accessories, or innovative solutions
            for your home and office.
          </p>

          <h3 className="text-xl font-semibold mt-6">What We Offer</h3>
          <p className="text-base mt-2">We offer a wide range of products, including :</p>

          <ul className="list-disc list-inside mt-2 space-y-2">
            <li>
              <span className="font-semibold">Smartphones & Tablets:</span>{" "}
              <p className="inline">Stay connected with the latest mobile technology.</p>
            </li>
            <li>
              <span className="font-semibold">Computers & Laptops :</span>{" "}
              <p className="inline">
                From powerful workstations to portable devices, we have something
                for everyone.
              </p>
            </li>
            <li>
              <span className="font-semibold">Home Electronics :</span>
              <p>
                Upgrade your living space with smart home devices, TVs, and audio
                systems.
              </p>
            </li>
            <li>
              <span className="font-semibold">Accessories :</span>
              <p>
                Enhance your devices with our selection of chargers, cases, and
                peripherals.
              </p>
            </li>
          </ul>

          <h3 className="text-xl font-semibold mt-6">Quality & Trust</h3>
          <p className="text-base mt-2">
            Quality is at the heart of what we do. We carefully curate our product
            selection from reputable manufacturers, ensuring that you receive only
            the best. Our knowledgeable team is always on hand to provide expert
            advice and support, helping you make informed decisions.
          </p>

          <h3 className="text-xl font-semibold mt-6">Customer-Centric Approach</h3>
          <p className="text-base mt-2">
            <span className="font-semibold">[Digital Shop]</span>, our customers
            come first. We strive to deliver an exceptional shopping experience,
            from user-friendly navigation on our website to fast and reliable
            shipping. Your satisfaction is our priority, and we’re here to assist
            you every step of the way.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;
