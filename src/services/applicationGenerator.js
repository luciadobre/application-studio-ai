import { callAI } from "../api/ai";
import {
  assertApplicationData,
  buildApplicationPrompt,
  readJsonResponse,
  saveCurrentApplication,
} from "../utils/applicationData";

export async function generateApplication({ jobDescription, userProfile }) {
  const prompt = buildApplicationPrompt({ jobDescription, userProfile });
  const response = await callAI(prompt, { json: true });
  const applicationData = assertApplicationData(readJsonResponse(response));

  saveCurrentApplication(applicationData);
  return applicationData;
}
