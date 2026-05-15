import { ui } from "../../styles/ui";

export default function ErrorBanner({ message }) {
  if (!message) return null;

  return (
    <div className={`${ui.errorBox} mb-4`}>
      <p className={ui.errorText}>{message}</p>
    </div>
  );
}
