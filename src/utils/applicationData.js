import { parseAIJson } from "./aiJson";

export function buildApplicationPrompt({ jobDescription, userProfile }) {
  return `I will provide you with a job posting and a user's profile. Generate tailored documents and answers in the exact JSON format specified below.

Job Posting:
${jobDescription}

User Profile:
- CV: ${userProfile.cv}
- Bio: ${userProfile.bio}
- Skills: ${userProfile.skills}

Return a valid JSON object with EXACTLY this structure. Do not use markdown, comments, or unescaped line breaks inside string values:
{
  "documents": [
    {
      "id": "cv",
      "title": "Tailored CV",
      "content": "A readable plain-text version of the tailored CV",
      "cvData": {
        "name": "Candidate name",
        "summary": "Professional summary",
        "experience": [
          {
            "title": "Role title",
            "company": "Company name",
            "dates": "Date range",
            "bullets": ["Achievement or responsibility"]
          }
        ],
        "skills": ["Skill"],
        "education": [
          {
            "degree": "Degree or certification",
            "school": "School or institution",
            "dates": "Date range"
          }
        ]
      }
    },
    { "id": "cover_letter", "title": "Cover Letter", "content": "..." }
  ],
  "questions": [
    { "id": "q1", "question": "Question text?", "answer": "..." }
  ]
}

Keep the CV summary under 70 words and each experience bullet under 22 words. Extract any application questions from the job posting and answer them. Return ONLY valid JSON.`;
}

export function readJsonResponse(response) {
  return parseAIJson(response);
}

export function assertApplicationData(data) {
  if (!Array.isArray(data.documents) || !Array.isArray(data.questions)) {
    throw new Error("Invalid response structure from AI provider");
  }
  return data;
}

export function saveCurrentApplication(applicationData) {
  localStorage.setItem("currentApplication", JSON.stringify(applicationData));
}

export function readUserProfile() {
  const stored = localStorage.getItem("userProfile");
  return stored ? JSON.parse(stored) : null;
}

export function getApplicationErrorMessage(error) {
  if (error.status === 401) {
    return "API authentication failed. Please check your API key in .env file.";
  }
  return error.message || "Failed to process job posting. Please try again.";
}
