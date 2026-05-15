import { getTabLabel } from "../../utils/workspaceData";

function tabButtonClass(isActive) {
  const activeClass = "border-app-accent text-app-text";
  const idleClass = "border-transparent text-app-muted hover:text-app-text";

  return [
    "px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition",
    isActive ? activeClass : idleClass,
  ].join(" ");
}

export default function WorkspaceTabs({ tabs, activeTabId, onSelectTab }) {
  return (
    <div className="border-b border-app-line px-8">
      <div className="flex overflow-x-auto gap-2 -mb-px">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={tabButtonClass(activeTabId === tab.id)}
          >
            {getTabLabel(tab)}
          </button>
        ))}
      </div>
    </div>
  );
}
