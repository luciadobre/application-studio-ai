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

function getPromptForTab({ tab, tabState, feedback }) {
  const promptByTabId = {
    cv: () =>
      buildCvPrompt({
        content: tabState.content,
        cvData: tabState.cvData,
        feedback,
      }),
  };

  const buildPrompt = promptByTabId[tab.id] || buildDocumentPrompt;
  return buildPrompt({ content: tabState.content, feedback });
}

function getResponseForTab({ tab, response }) {
  const responseByTabId = {
    cv: () => readCvResponse(response),
    default: () => ({ content: response }),
  };

  const readResponse = responseByTabId[tab.id] || responseByTabId.default;
  return readResponse();
}

function getAIOptionsForTab(tab) {
  const optionsByTabId = {
    cv: { json: true },
    default: {},
  };

  return optionsByTabId[tab.id] || optionsByTabId.default;
}

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
      [activeTabId]: {
        ...prev[activeTabId],
        ...updates,
      },
    }));
  };

  const handleContentChange = (content) => {
    updateActiveTab({ content });
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
      const prompt = getPromptForTab({
        tab: activeTab,
        tabState: activeTabState,
        feedback: chatInput,
      });
      const response = await callAI(prompt, getAIOptionsForTab(activeTab));
      const updates = getResponseForTab({ tab: activeTab, response });
      const nextContent = updates.content;

      updateActiveTab({
        content: nextContent,
        cvData: updates.cvData || activeTabState.cvData || emptyCvData,
        messages: [
          ...activeTabState.messages,
          { role: "user", content: chatInput },
          { role: "assistant", content: nextContent },
        ],
      });
      setChatInput("");
    } catch (err) {
      setError(
        err.message || "Failed to process your request. Please try again.",
      );
      console.error("Error:", err);
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
          onContentChange={handleContentChange}
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
