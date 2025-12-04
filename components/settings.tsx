import { updateProfile, UpdateProfileData } from "../lib/api/profile";
import { useState } from "react";
import { InputUrlImage, InputUrlImage2 } from "./ui/input";
import React from "react";
import { CloseButton } from "./ui/button";

interface UpdateFormProps {
  showForm: boolean;
  setShowForm: (show: boolean) => void;
}

export default function UpdateForm({ showForm, setShowForm }: UpdateFormProps) {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (avatarUrl === "" && bannerUrl === "") return;

    setSaving(true);
    setError(null);

    try {
      const token = localStorage.getItem("token")!;
      const userData = JSON.parse(localStorage.getItem("User")!);

      const profileData: UpdateProfileData = {};
      if (avatarUrl) profileData.avatar = { url: avatarUrl, alt: "" };
      if (bannerUrl) profileData.banner = { url: bannerUrl, alt: "" };

      await updateProfile(token, userData.name, profileData);
      window.location.reload();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* Form Overlay */}
      {showForm && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#036B8D] p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#F5F5F5]">
                UPDATE PROFILE IMAGES
              </h2>
              < CloseButton onClick={() => setShowForm(false)} />
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Avatar Section */}
              <div>
                <h3 className="text-lg text-[#F5F5F5]">
                  Avatar
                </h3>
                <div>
                  <InputUrlImage
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                  />
                </div>
              </div>

              {/* Banner Section */}
              <div>
                <h3 className="text-lg text-[#F5F5F5]">
                  Banner
                </h3>
                <div>
                  <InputUrlImage2
                    value={bannerUrl}
                    onChange={(e) => setBannerUrl(e.target.value)}
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  type="submit"
                  disabled={saving || (avatarUrl === "" && bannerUrl === "")}
                  className="secundary-button flex items-center gap-2 pl-3 pr-3"
                >
                  <p>Save</p>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
