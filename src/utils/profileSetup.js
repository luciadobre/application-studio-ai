export const profileSetupFields = [
  {
    id: "cv",
    label: "CV / Resume",
    type: "textarea",
    rows: 6,
    placeholder: "Paste your CV or resume text here...",
  },
  {
    id: "bio",
    label: "Bio",
    type: "textarea",
    rows: 4,
    placeholder: "Tell us about yourself...",
  },
  {
    id: "skills",
    label: "Skills",
    type: "input",
    placeholder: "e.g., React, Python, Node.js, ...",
  },
];

export const emptyProfileForm = Object.fromEntries(
  profileSetupFields.map((field) => [field.id, ""]),
);

export function createUserProfile(formData) {
  return {
    cv: formData.cv,
    bio: formData.bio,
    skills: formData.skills,
    createdAt: new Date().toISOString(),
  };
}

export function saveUserProfile(profile) {
  localStorage.setItem("userProfile", JSON.stringify(profile));
}
