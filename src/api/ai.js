const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

function getGeminiText(data) {
  const text = data.candidates?.[0]?.content?.parts
    ?.map((part) => part.text)
    .filter(Boolean)
    .join("");

  if (!text) {
    throw new Error("Gemini returned an empty response");
  }

  return text;
}

function getGeminiErrorMessage(data, response) {
  return (
    data.error?.message ||
    `Gemini API request failed with status ${response.status}`
  );
}

export async function callAI(prompt, options = {}) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const generationConfig = {
    temperature: 0.2,
    maxOutputTokens: options.json ? 8192 : 4096,
    ...(options.json ? { responseMimeType: "application/json" } : {}),
  };

  if (!apiKey) {
    throw new Error("Missing VITE_GEMINI_API_KEY in .env");
  }

  const response = await fetch(GEMINI_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
      generationConfig,
    }),
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(getGeminiErrorMessage(data, response));
  }

  return getGeminiText(data);
}
