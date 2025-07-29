import React, { useState } from "react";
import Footer from "./Footer";

const FeedbackPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setFormData({ name: "", email: "", feedback: "" });
  };

  return (
    <div className="mt-16 min-h-screen bg-gray-50">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-md shadow-md border border-gray-200">
        {!isSubmitted ? (
          <>
            <h1 className="text-center text-3xl font-semibold mb-8">Feedback</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="feedback" className="block mb-2 font-medium text-gray-700">
                  Feedback
                </label>
                <textarea
                  id="feedback"
                  name="feedback"
                  rows="4"
                  placeholder="Share your feedback here..."
                  value={formData.feedback}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md text-lg transition"
              >
                Submit Feedback
              </button>
            </form>
          </>
        ) : (
          <div
            className="text-center text-green-700 text-lg font-medium mt-20 p-5 border border-green-500 rounded-md bg-green-100"
            role="alert"
          >
            Thank you for your feedback! We truly appreciate your input.
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default FeedbackPage;
