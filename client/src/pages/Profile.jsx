import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import { getUserProfile, updateUserProfile } from "../services/userService";
import { toast } from "react-hot-toast";
import useImageUpload from "../hooks/useImageUpload";
import { ClipLoader } from "react-spinners"; // For loading spinner
import Loader from "../components/Loader";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [loading, setLoading] = useState(false);
  const { image, imagePreview, handleImageChange } = useImageUpload();
  const [isEditing, setIsEditing] = useState(false);

  const SERVER_BASE_URL = import.meta.env.VITE_API_URL;

  // Reference to the hidden file input
  const fileInputRef = useRef(null);

  // Fetch user profile when the component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getUserProfile();
        setName(profile.name);
        setEmail(profile.email);
        setBio(profile.bio);
        if (profile.image) {
          setProfileImage(profile.image);
        }
      } catch (error) {
        toast.error("Error fetching user profile");
      }
    };

    fetchProfile();
  }, []);

  // Handle profile update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const profileData = new FormData();
    profileData.append("name", name);
    profileData.append("email", email);
    profileData.append("bio", bio);
    if (image) profileData.append("image", image);

    try {
      await updateUserProfile(profileData);
      toast.success("Profile updated successfully");
      setIsEditing(false); // Exit edit mode after successful update
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  // Trigger file input when the profile image is clicked
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <div className="flex-col justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-center mb-6">
          {isEditing ? "Edit Profile" : "Your Profile"}
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 w-full h-full">
          {loading ? (
            <Loader />
          ) : isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Picture Upload */}
              <div className="flex flex-col items-center justify-center">
                <div className="mt-4">
                  {imagePreview || profileImage ? (
                    <img
                      src={
                        imagePreview || `http://localhost:5000/${profileImage}`
                      }
                      alt="Profile Preview"
                      className="rounded-full h-40 w-40 object-top object-cover border-4 border-gray-300 shadow-lg cursor-pointer"
                      onClick={handleImageClick} // Handle image click
                    />
                  ) : (
                    <div
                      className="rounded-full h-40 w-40 bg-gray-200 flex items-center justify-center cursor-pointer"
                      onClick={handleImageClick} // Handle click on empty image
                    >
                      <p className="text-gray-500">No Image</p>
                    </div>
                  )}
                </div>
                {/* Hidden file input */}
                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef} // Attach the ref to the input
                  onChange={handleImageChange}
                />
              </div>

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:ring-secondary focus:border-secondary transition ease-in-out duration-200"
                  placeholder="Enter your name"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:ring-secondary focus:border-secondary transition ease-in-out duration-200"
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Bio */}
              <div>
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-gray-700"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:ring-secondary focus:border-secondary transition ease-in-out duration-200"
                  placeholder="Tell us something about yourself"
                  rows="4"
                />
              </div>

              {/* Save Button */}
              <button
                type="submit"
                className="w-full bg-secondary text-white font-bold py-3 rounded-md hover:bg-secondary/85 transition duration-200"
              >
                {loading ? "Saving..." : "Save Profile"}
              </button>

              {/* Switch to View Mode */}
              <button
                type="button"
                className="w-full mt-4 bg-gray-500 text-white font-bold py-3 rounded-md hover:bg-gray-600 transition duration-200"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </form>
          ) : (
            // View Profile Mode
            <div className="space-y-6">
              <div className="flex justify-center">
                <img
                  src={`${SERVER_BASE_URL}/${profileImage}`}
                  alt="Profile"
                  className="rounded-full h-40 w-40 object-top object-cover border-4 border-gray-300 shadow-lg cursor-pointer"
                  onClick={handleImageClick}
                />
              </div>

              {/* Display Name */}
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-500">
                  Name
                </p>
                <p className="text-base md:text-xl font-semibold text-gray-800">
                  {name}
                </p>
              </div>

              {/* Display Email */}
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-500">
                  Email
                </p>
                <p className="text-base md:text-xl font-semibold text-gray-800">
                  {email}
                </p>
              </div>

              {/* Display Bio */}
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-500">
                  Bio
                </p>
                <p className="text-base md:text-lg text-gray-800">
                  {bio || "No bio provided"}
                </p>
              </div>

              {/* Switch to Edit Mode */}
              <button
                type="button"
                className="w-full bg-secondary text-white font-bold py-3 rounded-md hover:bg-secondary/85 transition duration-200"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
