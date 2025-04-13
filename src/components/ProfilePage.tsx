"use client";
import { useAuth } from "@/context/auth-context";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaEdit,
  FaEnvelope,
  FaGithub,
  FaGlobe,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
  FaSave,
  FaTwitter,
  FaUser,
} from "react-icons/fa";
import Button from "./ui/Button";

const socialFields = ["website", "twitter", "linkedin", "github"];

const schema = Joi.object({
  fullName: Joi.string().min(3).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  phone: Joi.string().allow(""),
  location: Joi.string().allow(""),
  bio: Joi.string().allow(""),
  website: Joi.string()
    .uri({ scheme: [/https?/] })
    .allow(""),
  twitter: Joi.string().allow(""),
  linkedin: Joi.string().allow(""),
  github: Joi.string().allow(""),
});

const ProfilePage = () => {
  const { user: contextUserData } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      fullName: "Not provided",
      email: "Not provided",
      phone: "Not provided",
      location: "Not provided",
      bio: "Not provided",
      website: "Not provided",
      twitter: "Not provided",
      linkedin: "Not provided",
      github: "Not provided",
    },
  });

  const user = watch();

  useEffect(() => {
    if (contextUserData) {
      reset({
        fullName: contextUserData.fullName || "",
        email: contextUserData.email || "",
      });
    }
  }, [contextUserData, reset]);

  const onSubmit = (data: unknown) => {
    console.log("Form Data:", data);
    setIsEditing(false);
    // Call API to update profile
  };

  const inputClassName =
    "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple";

  if (!contextUserData) {
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
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-white text-fuchsia-600 text-xl md:text-3xl font-bold shadow-md border-2 border-fuchsia-100">
                {user.fullName
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{user.fullName}</h1>
                <p className="text-fuchsia-100">{user?.bio}</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="mt-4 sm:mt-0 border border-fuchsia-50 flex items-center space-x-2 text-white hover:text-fuchsia-600 px-4 py-2 rounded-lg hover:bg-fuchsia-50 transition-colors"
            >
              {isEditing ? (
                <>
                  <FaSave /> <span>Save Profile</span>
                </>
              ) : (
                <>
                  <FaEdit /> <span>Edit Profile</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                  Personal Information
                </h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  {isEditing ? (
                    <>
                      <input
                        {...register("fullName")}
                        className={inputClassName}
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-sm">
                          {errors.fullName.message}
                        </p>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <FaUser className="text-gray-400" />
                      <span>{user.fullName}</span>
                    </div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  {isEditing ? (
                    <>
                      <input
                        {...register("email")}
                        className={inputClassName}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm">
                          {errors.email.message}
                        </p>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <FaEnvelope className="text-gray-400" />
                      <span>{user.email}</span>
                    </div>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  {isEditing ? (
                    <input {...register("phone")} className={inputClassName} />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <FaPhone className="text-gray-400" />
                      <span>{user.phone || "Not provided"}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  {isEditing ? (
                    <input
                      {...register("location")}
                      className={inputClassName}
                    />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <FaMapMarkerAlt className="text-gray-400" />
                      <span>{user.location || "Not provided"}</span>
                    </div>
                  )}
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
                      {...register("bio")}
                      rows={4}
                      className={inputClassName}
                    />
                  ) : (
                    <p className="text-gray-600">
                      {user.bio || "No bio provided"}
                    </p>
                  )}
                </div>

                {/* Socials */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                    Social Links
                  </h2>
                  <div className="space-y-3 mt-4">
                    {socialFields.map((field) => (
                      <div key={field}>
                        <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                          {field}
                        </label>
                        {isEditing ? (
                          <div className="flex">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                              {field === "website" ? (
                                <FaGlobe />
                              ) : field === "twitter" ? (
                                <FaTwitter />
                              ) : field === "linkedin" ? (
                                <FaLinkedin />
                              ) : (
                                <FaGithub />
                              )}
                            </span>
                            <input
                              {...register(field as keyof typeof user)}
                              className="flex-1 block w-full rounded-none rounded-r-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-purple"
                              placeholder={
                                field === "website" ? "https://" : "username"
                              }
                            />
                          </div>
                        ) : user[field] ? (
                          <a
                            href={
                              field === "website"
                                ? user[field]
                                : field === "linkedin"
                                  ? `https://linkedin.com/${user[field]}`
                                  : `https://${field}.com/${user[field]}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-fuchsia-600 hover:underline"
                          >
                            {field === "website" ? (
                              <FaGlobe />
                            ) : field === "twitter" ? (
                              <FaTwitter />
                            ) : field === "linkedin" ? (
                              <FaLinkedin />
                            ) : (
                              <FaGithub />
                            )}
                            <span>
                              {field === "twitter" || field === "github"
                                ? "@"
                                : ""}
                              {user[field]}
                            </span>
                          </a>
                        ) : (
                          <div className="flex items-center space-x-2 text-gray-500">
                            {field === "website" ? (
                              <FaGlobe />
                            ) : field === "twitter" ? (
                              <FaTwitter />
                            ) : field === "linkedin" ? (
                              <FaLinkedin />
                            ) : (
                              <FaGithub />
                            )}
                            <span>Not provided</span>
                          </div>
                        )}
                      </div>
                    ))}
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
    </div>
  );
};

export default ProfilePage;
