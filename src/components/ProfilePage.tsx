"use client";
import { useState, useEffect, useRef } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaEdit,
  FaSave,
  FaLock,
  FaGlobe,
  FaTwitter,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import { User } from "@/types/user";
import Button from "./ui/Button";
import { authService, userService } from "@/app/services";
import toast from "react-hot-toast";
import { useAuth } from "@/context/auth-context";
import ChangePasswordForm from "./forms/ChangePasswordForm";

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fuchsia-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-6 pb-10 px-4 md:px-8">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-fuchsia-600 to-purple p-6 text-white">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="flex items-center space-x-4 ">
              <div>
                <div className="flex items-center justify-center w-16 h-16 sm:w-[4.5rem] sm:h-[4.5rem] md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-24 xl:h-24 rounded-full bg-white text-fuchsia-600 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold shadow-md border-2 border-fuchsia-100">
                  {user?.fullName
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold">{user?.fullName}</h1>
                <p className="text-fuchsia-100">{user?.bio}</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="mt-4 sm:mt-0 border border-fuchsia-50 flex items-center space-x-2 text-white  hover:text-fuchsia-600 px-4 py-2 rounded-lg hover:bg-fuchsia-50 transition-colors"
            >
              {isEditing ? (
                <>
                  <FaSave className="inline" /> <span>Save Profile</span>
                </>
              ) : (
                <>
                  <FaEdit className="inline" /> <span>Edit Profile</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="p-6">
          <form >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                  Personal Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple"
                      />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <FaUser className="text-gray-400" />
                        <span>{user?.fullName}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple"
                      />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <FaEnvelope className="text-gray-400" />
                        <span>{user?.email}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple"
                      />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <FaPhone className="text-gray-400" />
                        <span>{user?.phone || "Not provided"}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple"
                      />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <FaMapMarkerAlt className="text-gray-400" />
                        <span>{user?.location || "Not provided"}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                    About
                  </h2>
                  <label className="block text-sm font-medium text-gray-700 mb-1 mt-4">
                    Bio
                  </label>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple"
                    />
                  ) : (
                    <p className="text-gray-600">
                      {user?.bio || "No bio provided"}
                    </p>
                  )}
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                    Social Links
                  </h2>
                  <div className="space-y-3 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Website
                      </label>
                      {isEditing ? (
                        <div className="flex">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                            <FaGlobe />
                          </span>
                          <input
                            type="url"
                            name="website"
                            value={formData.website}
                            onChange={handleInputChange}
                            className="flex-1 block w-full rounded-none rounded-r-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-purple"
                            placeholder="https://"
                          />
                        </div>
                      ) : user?.website ? (
                        <a
                          href={user?.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-fuchsia-600 hover:underline"
                        >
                          <FaGlobe className="text-gray-400" />
                          <span>{user?.website}</span>
                        </a>
                      ) : (
                        <div className="flex items-center space-x-2 text-gray-500">
                          <FaGlobe className="text-gray-400" />
                          <span>Not provided</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Twitter
                      </label>
                      {isEditing ? (
                        <div className="flex">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                            <FaTwitter />
                          </span>
                          <input
                            type="text"
                            name="twitter"
                            value={formData.twitter}
                            onChange={handleInputChange}
                            className="flex-1 block w-full rounded-none rounded-r-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-purple"
                            placeholder="username"
                          />
                        </div>
                      ) : user?.twitter ? (
                        <a
                          href={`https://twitter.com/${user?.twitter}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-fuchsia-600 hover:underline"
                        >
                          <FaTwitter className="text-gray-400" />
                          <span>@{user?.twitter}</span>
                        </a>
                      ) : (
                        <div className="flex items-center space-x-2 text-gray-500">
                          <FaTwitter className="text-gray-400" />
                          <span>Not provided</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        LinkedIn
                      </label>
                      {isEditing ? (
                        <div className="flex">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                            <FaLinkedin />
                          </span>
                          <input
                            type="text"
                            name="linkedin"
                            value={formData.linkedin}
                            onChange={handleInputChange}
                            className="flex-1 block w-full rounded-none rounded-r-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-purple"
                            placeholder="in/username"
                          />
                        </div>
                      ) : user?.linkedin ? (
                        <a
                          href={`https://linkedin.com/${user?.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-fuchsia-600 hover:underline"
                        >
                          <FaLinkedin className="text-gray-400" />
                          <span>{user?.linkedin}</span>
                        </a>
                      ) : (
                        <div className="flex items-center space-x-2 text-gray-500">
                          <FaLinkedin className="text-gray-400" />
                          <span>Not provided</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        GitHub
                      </label>
                      {isEditing ? (
                        <div className="flex">
                          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                            <FaGithub />
                          </span>
                          <input
                            type="text"
                            name="github"
                            value={formData.github}
                            onChange={handleInputChange}
                            className="flex-1 block w-full rounded-none rounded-r-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-purple"
                            placeholder="username"
                          />
                        </div>
                      ) : user?.github ? (
                        <a
                          href={`https://github.com/${user.github}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-fuchsia-600 hover:underline"
                        >
                          <FaGithub className="text-gray-400" />
                          <span>@{user?.github}</span>
                        </a>
                      ) : (
                        <div className="flex items-center space-x-2 text-gray-500">
                          <FaGithub className="text-gray-400" />
                          <span>Not provided</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="mt-6 flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="primary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Save Changes
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>

      <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
            Change Password
          </h2>
          {/* <form className="mt-4 space-y-4" ref={passwordRef} onSubmit={handlePasswordSubmit}>
            <div>
              <label
                htmlFor="currentpassword"
                className="block text-sm font-medium text-gray-700"
              >
                Current Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  required
                  className="focus:ring-purple focus:border-purple focus:border-1  block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Current password"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="new-password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>

                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  required
                  className="focus:ring-purple focus:border-purple focus:border-1 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                  placeholder="New password"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm New Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="focus:ring-purple focus:border-purple focus:border-1 block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" variant="primary">
                Update Password
              </Button>
            </div>
          </form> */}

          <ChangePasswordForm/>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
