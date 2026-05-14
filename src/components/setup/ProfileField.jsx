import { ui } from "../../styles/ui";

const controls = {
  textarea: ({ field, value, onChange }) => (
    <textarea
      id={field.id}
      name={field.id}
      value={value}
      onChange={onChange}
      required
      rows={field.rows}
      className={ui.field}
      placeholder={field.placeholder}
    />
  ),
  input: ({ field, value, onChange }) => (
    <input
      type="text"
      id={field.id}
      name={field.id}
      value={value}
      onChange={onChange}
      required
      className={ui.field}
      placeholder={field.placeholder}
    />
  ),
};

export default function ProfileField({ field, value, onChange }) {
  const Control = controls[field.type];

  return (
    <div>
      <label htmlFor={field.id} className={ui.label}>
        {field.label}
      </label>
      <Control field={field} value={value} onChange={onChange} />
    </div>
  );
}
