export function buildApplicationPrompt({ jobDescription, userProfile }) {
  return `I will provide you with a job posting and a user's profile. Please analyze the job posting and generate tailored documents and answers in the exact JSON format specified below.

Job Posting:
${jobDescription}

User Profile:
- CV: ${userProfile.cv}
- Bio: ${userProfile.bio}
- Skills: ${userProfile.skills}

Please return a valid JSON object with EXACTLY this structure. Do not use markdown. Do not include comments. Do not include unescaped line breaks inside string values:
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

Requirements:
1. Create a CV tailored to the job description highlighting relevant skills and experience
2. For the CV document, return the structured cvData object matching the schema exactly and also include the raw content string
3. Create a cover letter that addresses the specific role and company
4. Extract any application questions from the job posting and provide answers
5. Ensure all content is professional and relevant to the position
6. Keep the CV summary under 70 words and each experience bullet under 22 words
7. Return ONLY valid JSON that can be parsed by JSON.parse`;
}

export function readJsonResponse(response) {
  return parseAIJson(response);
}

export function assertApplicationData(data) {
  const hasDocuments = Array.isArray(data.documents);
  const hasQuestions = Array.isArray(data.questions);

  if (!hasDocuments || !hasQuestions) {
    throw new Error("Invalid response structure from AI provider");
  }

  return data;
}

export function saveCurrentApplication(applicationData) {
  localStorage.setItem("currentApplication", JSON.stringify(applicationData));
}

export function readUserProfile() {
  const storedProfile = localStorage.getItem("userProfile");
  return storedProfile ? JSON.parse(storedProfile) : null;
}

export function getApplicationErrorMessage(error) {
  const messagesByStatus = {
    401: "API authentication failed. Please check your API key in .env file.",
  };

  return (
    messagesByStatus[error.status] ||
    error.message ||
    "Failed to process job posting. Please try again."
  );
}
import { parseAIJson } from "./aiJson";
