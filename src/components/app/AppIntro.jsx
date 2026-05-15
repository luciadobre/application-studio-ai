import { ui } from "../../styles/ui";

export default function AppIntro() {
  return (
    <>
      <h1 className={`${ui.title} mb-2`}>Job Application</h1>
      <p className={`${ui.copy} mb-8`}>
        Paste a job description and we'll generate tailored documents and
        answers for your application.
      </p>
    </>
  );
}
