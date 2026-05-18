import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { callAI } from "../api/ai";
import ChatComposer from "../components/workspace/ChatComposer";
import DocumentPanel from "../components/workspace/DocumentPanel";
import ErrorBanner from "../components/workspace/ErrorBanner";
import WorkspaceHeader from "../components/workspace/WorkspaceHeader";
import {
  WorkspaceLoading,
  WorkspaceShell,
} from "../components/workspace/WorkspaceShell";
import WorkspaceTabs from "../components/workspace/WorkspaceTabs";
import {
  buildCvPrompt,
  buildDocumentPrompt,
  emptyCvData,
  getTabLabel,
  loadWorkspaceApplication,
  readCvResponse,
} from "../utils/workspaceData";

const tabConfig = {
  cv: {
    buildPrompt: ({ tabState, feedback }) =>
      buildCvPrompt({ content: tabState.content, cvData: tabState.cvData, feedback }),
    readResponse: (response) => readCvResponse(response),
    aiOptions: { json: true },
  },
};

const defaultTabConfig = {
  buildPrompt: ({ tabState, feedback }) =>
    buildDocumentPrompt({ content: tabState.content, feedback }),
  readResponse: (response) => ({ content: response }),
  aiOptions: {},
};

export default function WorkspacePage() {
  const navigate = useNavigate();
  const [initialWorkspace] = useState(() => loadWorkspaceApplication());
  const [activeTabId, setActiveTabId] = useState(initialWorkspace.activeTab);
  const [tabs] = useState(initialWorkspace.tabs);
  const [tabContents, setTabContents] = useState(initialWorkspace.tabContents);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [error, setError] = useState(initialWorkspace.error);

  useEffect(() => {
    if (!initialWorkspace.hasApplication) navigate("/app");
  }, [initialWorkspace.hasApplication, navigate]);

  if (!activeTabId) return <WorkspaceLoading />;

  const activeTab = tabs.find((tab) => tab.id === activeTabId);
  const activeTabState = tabContents[activeTabId];

  const updateActiveTab = (updates) => {
    setTabContents((prev) => ({
      ...prev,
      [activeTabId]: { ...prev[activeTabId], ...updates },
    }));
  };

  const handleDownload = () => {
    const blob = new Blob([activeTabState.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${getTabLabel(activeTab)}.txt`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    setError("");
    setChatLoading(true);

    try {
      const config = tabConfig[activeTab.id] || defaultTabConfig;
      const prompt = config.buildPrompt({ tabState: activeTabState, feedback: chatInput });
      const response = await callAI(prompt, config.aiOptions);
      const updates = config.readResponse(response);

      updateActiveTab({
        content: updates.content,
        cvData: updates.cvData || activeTabState.cvData || emptyCvData,
        messages: [
          ...activeTabState.messages,
          { role: "user", content: chatInput },
          { role: "assistant", content: updates.content },
        ],
      });
      setChatInput("");
    } catch (err) {
      setError(err.message || "Failed to process your request. Please try again.");
      console.error(err);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <WorkspaceShell>
      <WorkspaceHeader onBack={() => navigate("/app")} />
      <WorkspaceTabs
        tabs={tabs}
        activeTabId={activeTabId}
        onSelectTab={setActiveTabId}
      />
      <div className="p-8">
        <DocumentPanel
          tab={activeTab}
          tabState={activeTabState}
          onContentChange={(content) => updateActiveTab({ content })}
          onDownload={handleDownload}
        />
        <ErrorBanner message={error} />
        <ChatComposer
          value={chatInput}
          loading={chatLoading}
          onChange={setChatInput}
          onSubmit={handleSendMessage}
        />
      </div>
    </WorkspaceShell>
  );
}
