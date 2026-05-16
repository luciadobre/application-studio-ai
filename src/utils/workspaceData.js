import { parseAIJson } from "./aiJson";

export const emptyCvData = {
  name: "",
  summary: "",
  experience: [],
  skills: [],
  education: [],
};

export function getTabLabel(tab) {
  return tab.title || tab.question || tab.id;
}

export function normalizeCvData(data) {
  if (!data || typeof data !== "object") return emptyCvData;

  const experience = Array.isArray(data.experience) ? data.experience : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];
  const education = Array.isArray(data.education) ? data.education : [];

  return {
    name: data.name || "",
    summary: data.summary || "",
    experience: experience.map((item) => ({
      title: item?.title || "",
      company: item?.company || "",
      dates: item?.dates || "",
      bullets: Array.isArray(item?.bullets) ? item.bullets : [],
    })),
    skills,
    education: education.map((item) => ({
      degree: item?.degree || "",
      school: item?.school || "",
      dates: item?.dates || "",
    })),
  };
}

export function formatCvDataAsText(data) {
  const cv = normalizeCvData(data);
  const lines = [
    cv.name,
    "",
    cv.summary,
    "",
    "Experience",
    ...cv.experience.flatMap((item) => [
      `${item.title}${item.company ? `, ${item.company}` : ""}`,
      item.dates,
      ...item.bullets.map((bullet) => `- ${bullet}`),
      "",
    ]),
    "Skills",
    cv.skills.join(", "),
    "",
    "Education",
    ...cv.education.flatMap((item) => [
      item.degree,
      item.school,
      item.dates,
      "",
    ]),
  ];

  return lines.filter((line, index) => line || lines[index - 1]).join("\n");
}

export function loadWorkspaceApplication() {
  const application = localStorage.getItem("currentApplication");

  if (!application) {
    return {
      hasApplication: false,
      tabs: [],
      tabContents: {},
      activeTab: null,
      error: "",
    };
  }

  try {
    const data = JSON.parse(application);
    const allTabs = [...(data.documents || []), ...(data.questions || [])];
    const tabContents = Object.fromEntries(
      allTabs.map((tab) => [
        tab.id,
        {
          content: tab.content || tab.answer || "",
          cvData: tab.id === "cv" ? normalizeCvData(tab.cvData) : null,
          messages: [],
        },
      ]),
    );

    return {
      hasApplication: true,
      tabs: allTabs,
      tabContents,
      activeTab: allTabs[0]?.id || null,
      error: "",
    };
  } catch (err) {
    console.error("Error loading application:", err);
    return {
      hasApplication: true,
      tabs: [],
      tabContents: {},
      activeTab: null,
      error: "Failed to load application data",
    };
  }
}

export function buildDocumentPrompt({ content, feedback }) {
  return `I have the following document:

---
${content}
---

The user has provided this feedback or request:
${feedback}

Please update and improve the document based on this feedback. Return ONLY the updated document content, nothing else.`;
}

export function buildCvPrompt({ content, cvData, feedback }) {
  return `I have the following CV content and structured CV JSON.

Plain-text CV:
---
${content}
---

Structured CV JSON:
${JSON.stringify(cvData || emptyCvData, null, 2)}

The user has provided this feedback or request:
${feedback}

Please update and improve the CV based on this feedback.

Return ONLY valid JSON with this exact structure. Do not use markdown. Do not include unescaped line breaks inside string values:
{
  "content": "A readable plain-text version of the updated CV",
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
}

Keep the summary under 70 words and each experience bullet under 22 words.`;
}

export function readCvResponse(response) {
  const updatedCv = parseAIJson(response);
  const cvData = normalizeCvData(updatedCv.cvData);

  return {
    content: updatedCv.content || formatCvDataAsText(cvData),
    cvData,
  };
}
