import { ui } from "../../styles/ui";

export default function WorkspaceHeader({ onBack }) {
  return (
    <div className="border-b border-app-line px-8 py-6">
      <div className="flex justify-between items-center">
        <h1 className={ui.title}>Workspace</h1>
        <button onClick={onBack} className={ui.secondaryButton}>
          Back
        </button>
      </div>
    </div>
  );
}
