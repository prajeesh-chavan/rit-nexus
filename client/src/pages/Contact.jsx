import React, { useState } from "react";
import { toast } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Lottie from "lottie-react";
import contactAnimation from "../assets/lotties/contact.json";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate form fields
    if (!name || !email || !message) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    // Simulate form submission
    try {
      // Here you would typically send the form data to your backend
      console.log("Form submitted", { name, email, message });
      toast.success("Your message has been sent!");
      clearForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("There was an error sending your message.");
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[80vh] min-w-full flex flex-col justify-center items-center px-4">
        <h1 className="text-5xl font-bold text-center mb-12">Contact Us</h1>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <div className="flex flex-col justify-center md:flex-row md:space-x-8">
          {/* Contact Form */}
          <div className="md:w-1/3 bg-white shadow-md rounded-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  placeholder="Your email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  placeholder="Your message"
                  rows="4"
                  required
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className={`w-full bg-secondary text-white font-bold py-2 rounded-md hover:bg-secondary/85 transition duration-200 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="md:w-1/3 rounded-lg p-6 mt-6 md:mt-0">
            <Lottie animationData={contactAnimation} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
