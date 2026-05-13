import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppIntro from "../components/app/AppIntro";
import ApplicationForm from "../components/app/ApplicationForm";
import AppShell from "../components/app/AppShell";
import useRequiredUserProfile from "../hooks/useRequiredUserProfile";
import { generateApplication } from "../services/applicationGenerator";
import { getApplicationErrorMessage } from "../utils/applicationData";

export default function AppPage() {
  const navigate = useNavigate();
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const redirectToSetup = useCallback(() => navigate("/setup"), [navigate]);
  const userProfile = useRequiredUserProfile({
    onMissingProfile: redirectToSetup,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await generateApplication({ jobDescription, userProfile });
      navigate("/workspace");
    } catch (err) {
      setError(getApplicationErrorMessage(err));
      console.error("Error:", err);
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <AppIntro />
      <ApplicationForm
        jobDescription={jobDescription}
        loading={loading}
        error={error}
        onJobDescriptionChange={setJobDescription}
        onSubmit={handleSubmit}
      />
    </AppShell>
  );
}
