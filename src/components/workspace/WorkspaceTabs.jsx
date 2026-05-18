import { getTabLabel } from "../../utils/workspaceData";

export default function WorkspaceTabs({ tabs, activeTabId, onSelectTab }) {
  return (
    <div className="border-b border-app-line px-8">
      <div className="flex overflow-x-auto gap-2 -mb-px">
        {tabs.map((tab) => {
          const isActive = activeTabId === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition ${
                isActive
                  ? "border-app-accent text-app-text"
                  : "border-transparent text-app-muted hover:text-app-text"
              }`}
            >
              {getTabLabel(tab)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
