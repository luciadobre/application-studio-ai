import { ui } from "../../styles/ui";

export function WorkspaceShell({ children }) {
  return (
    <div className={ui.workspacePage}>
      <div className="max-w-6xl mx-auto">
        <div className={ui.workspacePanel}>{children}</div>
      </div>
    </div>
  );
}

export function WorkspaceLoading() {
  return (
    <div className={ui.page}>
      <div className="max-w-2xl mx-auto">
        <div className={ui.panel}>
          <p className={ui.copy}>Loading workspace...</p>
        </div>
      </div>
    </div>
  );
}
