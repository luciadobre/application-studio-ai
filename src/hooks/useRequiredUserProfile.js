import { useEffect, useState } from "react";
import { readUserProfile } from "../utils/applicationData";

export default function useRequiredUserProfile({ onMissingProfile }) {
  const [userProfile] = useState(() => readUserProfile());

  useEffect(() => {
    if (!userProfile) onMissingProfile();
  }, [onMissingProfile, userProfile]);

  return userProfile;
}
