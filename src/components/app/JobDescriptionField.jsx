import { ui } from "../../styles/ui";

export default function JobDescriptionField({ value, onChange }) {
  return (
    <div>
      <label htmlFor="jobDescription" className={ui.label}>
        Job Posting
      </label>
      <textarea
        id="jobDescription"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required
        rows={12}
        className={ui.field}
        placeholder="Paste the complete job description here..."
      />
    </div>
  );
}
