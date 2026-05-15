import { getTabLabel } from "../../utils/workspaceData";
import { ui } from "../../styles/ui";
import CvPreview from "./CvPreview";

export default function DocumentPanel({
  tab,
  tabState,
  onContentChange,
  onDownload,
}) {
  const label = getTabLabel(tab);
  const content = tabState.content;
  const isCv = tab.id === "cv";

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label className={ui.label}>{label}</label>
        <button onClick={onDownload} className={ui.secondaryButton}>
          Download
        </button>
      </div>

      {isCv ? (
        <CvPreview data={tabState.cvData} />
      ) : (
        <textarea
          value={content}
          onChange={(event) => onContentChange(event.target.value)}
          className={`${ui.field} h-96 font-mono`}
          placeholder="Document content..."
        />
      )}
    </div>
  );
}
