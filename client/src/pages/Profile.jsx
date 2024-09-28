import React, { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile } from "../services/userService";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    profilePicture: "", // Profile picture URL or file
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [updating, setUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // For toggling between view and edit mode

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userProfile = await getUserProfile();
        setProfile(userProfile);
      } catch (err) {
        setError("Failed to load profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setError(null);
    setUpdating(true);

    if (!profile.name || !profile.email) {
      setError("Name and Email are required fields.");
      setUpdating(false);
      return;
    }

    try {
      await updateUserProfile(profile);
      setSuccessMessage("Profile updated successfully!");
      setIsEditing(false); // Switch back to view mode after update
    } catch (err) {
      setError("Failed to update profile. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto p-8 bg-white text-black shadow-lg rounded-lg mt-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
          {isEditing ? "Edit Profile" : "Profile"}
        </h1>
        <button
          className="bg-indigo-700 hover:bg-indigo-600 text-white px-5 py-2 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-200 ease-in-out"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "View Profile" : "Edit Profile"}
        </button>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {successMessage && (
        <div className="text-green-400 mb-4">{successMessage}</div>
      )}

      {isEditing ? (
        <form onSubmit={handleProfileUpdate} className="space-y-6">
          <div className="flex justify-center mb-6">
            <label className="block text-center text-lg font-semibold">
              Profile Picture
            </label>
            <div className="relative">
              <img
                src={profile.profilePicture || "default-profile.png"}
                alt="Profile"
                className="w-32 h-32 object-cover rounded-full shadow-lg mb-4 border-4 border-white mx-auto"
              />
              <input
                type="file"
                className="absolute top-0 left-0 w-full h-full opacity-0"
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    profilePicture: URL.createObjectURL(e.target.files[0]),
                  })
                }
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col items-start">
              <label className="block text-lg font-semibold">Name</label>
              <input
                type="text"
                className="w-full p-3 rounded-lg shadow-md text-black border border-gray-300"
                value={profile.name || ""}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col items-start">
              <label className="block text-lg font-semibold">Email</label>
              <input
                type="email"
                className="w-full p-3 rounded-lg shadow-md text-black border border-gray-300"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col items-start">
              <label className="block text-lg font-semibold">Phone</label>
              <input
                type="tel"
                className="w-full p-3 rounded-lg shadow-md text-black border border-gray-300"
                value={profile.phone}
                onChange={(e) =>
                  setProfile({ ...profile, phone: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col items-start">
              <label className="block text-lg font-semibold">Bio</label>
              <textarea
                className="w-full p-3 rounded-lg shadow-md text-black border border-gray-300"
                value={profile.bio}
                onChange={(e) =>
                  setProfile({ ...profile, bio: e.target.value })
                }
              />
            </div>
          </div>

          <button
            type="submit"
            className={`w-full bg-green-500 hover:bg-green-400 text-white px-6 py-3 rounded-lg shadow-lg font-semibold transform hover:scale-[1.02] transition-transform duration-200 ease-in-out ${
              updating ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={updating}
          >
            {updating ? "Updating..." : "Save Changes"}
          </button>
        </form>
      ) : (
        <div className="flex flex-col items-center text-center">
          <img
            src={profile.profilePicture || "default-profile.png"}
            alt="Profile"
            className="w-40 h-40 object-cover rounded-full shadow-md border-4 border-white mb-6"
          />
          <p className="text-2xl font-bold mb-4">{profile.name}</p>
          <p className="text-xl mb-4">{profile.email}</p>
          <p className="text-lg mb-4">
            {profile.phone || "Phone not provided"}
          </p>
          <p className="text-lg italic mb-4">
            {profile.bio || "No bio available."}
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
