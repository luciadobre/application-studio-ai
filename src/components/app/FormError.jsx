import { ui } from "../../styles/ui";

export default function FormError({ message }) {
  if (!message) return null;

  return (
    <div className={ui.errorBox}>
      <p className={ui.errorText}>{message}</p>
    </div>
  );
}
