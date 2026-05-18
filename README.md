# Application Studio AI

A job application generator powered by Gemini AI. Paste a job description, get a tailored CV, cover letter, and answers to application questions — then refine everything through a chat interface.

## How it works

1. **Profile setup** — paste your CV, write a short bio, and list your skills
2. **Generate** — paste a job posting and let the AI produce tailored documents
3. **Workspace** — review and edit each document, or chat with the AI to refine them
4. **Download** — export any document as a text file

## Stack

- React + Vite
- Tailwind CSS
- Gemini 2.5 Flash (via REST API)

## Setup

```bash
npm install
```

Create a `.env` file at the project root:

```
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

Get a free API key at [aistudio.google.com](https://aistudio.google.com/app/apikey).

```bash
npm run dev
```
