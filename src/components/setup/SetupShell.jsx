import { ui } from "../../styles/ui";

export default function SetupShell({ children }) {
  return (
    <div className={ui.page}>
      <div className="max-w-2xl mx-auto">
        <div className={ui.panel}>{children}</div>
      </div>
    </div>
  );
}
