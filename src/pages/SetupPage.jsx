import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileSetupForm from "../components/setup/ProfileSetupForm";
import SetupShell from "../components/setup/SetupShell";
import { ui } from "../styles/ui";
import {
  createUserProfile,
  emptyProfileForm,
  saveUserProfile,
} from "../utils/profileSetup";

export default function SetupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(emptyProfileForm);

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();
    saveUserProfile(createUserProfile(formData));
    navigate("/app");
  };

  return (
    <SetupShell>
      <h1 className={`${ui.title} mb-8`}>Profile Setup</h1>
      <ProfileSetupForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSave}
      />
    </SetupShell>
  );
}
