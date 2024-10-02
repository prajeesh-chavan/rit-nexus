import React, { useState } from "react";
import { toast } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Lottie from "lottie-react";
import contactAnimation from "../assets/lotties/contact.json";

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true while processing
    setError(""); // Reset any previous error

    const formData = new FormData(event.target);
    formData.append("access_key", "005ffe6f-0d62-43de-9965-4fa901fc17e0");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        event.target.reset();
        toast.success("Message sent successfully!");
      } else {
        setError(data.message || "Something went wrong, please try again.");
        setResult("Submission failed");
        toast.error("Failed to send message.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
      toast.error("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[80vh] min-w-full flex flex-col justify-center items-center px-4">
        <h1 className="text-5xl font-bold text-center mb-12">Contact Us</h1>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <div className="flex flex-col justify-center gap-6 p-6 w-auto md:flex-row">

          <div className="md:w-1/3 rounded-lg md:mt-0">
            <Lottie animationData={contactAnimation} />
          </div>
          <div className="md:w-1/3 bg-white rounded-lg">
            <form onSubmit={onSubmit} className="space-y-4">
              <input
                type="hidden"
                name="subject"
                value="New Submission from RIT Nexus"
              />
              <input type="hidden" name="from_name" value="RIT Nexus"></input>
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  placeholder="Your email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Message</label>
                <textarea
                  name="message"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  placeholder="Your message"
                  rows="4"
                  required
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className={`w-full bg-[#4C4CE2] text-white font-bold py-2 rounded-md hover:bg-[#4C4CE2]/85 transition duration-200 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default ContactUs;
