function stripCodeFence(response) {
  return response
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "");
}

function extractJsonObject(response) {
  const stripped = stripCodeFence(response);
  const start = stripped.indexOf("{");
  const end = stripped.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    return stripped;
  }

  return stripped.slice(start, end + 1);
}

export function parseAIJson(response) {
  const jsonText = extractJsonObject(response);

  try {
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Invalid AI JSON response:", jsonText);
    throw new Error(
      "The AI returned invalid JSON. Please generate again with a shorter job posting or profile.",
      { cause: error },
    );
  }
}
