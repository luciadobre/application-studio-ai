import { useLayoutEffect, useRef, useState } from "react";
import { ui } from "../../styles/ui";
import TemplateBold from "../templates/TemplateBold";
import TemplateClassic from "../templates/TemplateClassic";
import TemplateMinimal from "../templates/TemplateMinimal";

// A4 at 96 dpi
const A4_HEIGHT_PX = 1123;

const cvTemplates = {
  minimal: {
    label: "Minimal",
    Component: TemplateMinimal,
    thumbnailClass: "bg-app-panel border-app-line",
    accentClass: "bg-app-accent",
  },
  classic: {
    label: "Classic",
    Component: TemplateClassic,
    thumbnailClass: "bg-app-panel border-app-line",
    accentClass: "bg-app-violet",
  },
  bold: {
    label: "Bold",
    Component: TemplateBold,
    thumbnailClass: "bg-app-surface border-app-line",
    accentClass: "bg-app-text",
  },
};

function TemplateThumbnail({ id, template, activeTemplate, onSelect }) {
  const isActive = activeTemplate === id;
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className={`w-28 rounded-field border bg-app-surface p-2 text-left transition ${
        isActive
          ? "border-app-accent ring-2 ring-app-accent/20"
          : "border-app-line hover:border-app-muted"
      }`}
    >
      <div className={`h-32 rounded-sm border ${template.thumbnailClass}`}>
        <div className={`mx-3 mt-3 h-3 rounded-sm ${template.accentClass}`} />
        <div className="mx-3 mt-4 space-y-2">
          <div className="h-1.5 rounded bg-app-line" />
          <div className="h-1.5 w-4/5 rounded bg-app-surface2" />
          <div className="h-1.5 w-3/5 rounded bg-app-surface2" />
        </div>
        <div className="mx-3 mt-5 space-y-1.5">
          <div className="h-1 rounded bg-app-line" />
          <div className="h-1 rounded bg-app-surface2" />
          <div className="h-1 w-2/3 rounded bg-app-surface2" />
        </div>
      </div>
      <span className="mt-2 block text-xs font-semibold text-app-muted">
        {template.label}
      </span>
    </button>
  );
}

export default function CvPreview({ data }) {
  const [activeTemplate, setActiveTemplate] = useState("minimal");
  const [overflowsPage, setOverflowsPage] = useState(false);
  const contentRef = useRef(null);
  const ActiveTemplate = cvTemplates[activeTemplate].Component;

  useLayoutEffect(() => {
    const frame = requestAnimationFrame(() => {
      const height = contentRef.current?.getBoundingClientRect().height || 0;
      setOverflowsPage(height > A4_HEIGHT_PX);
    });
    return () => cancelAnimationFrame(frame);
  }, [data, activeTemplate]);

  return (
    <div className="space-y-5">
      <div className="flex gap-3">
        {Object.entries(cvTemplates).map(([id, template]) => (
          <TemplateThumbnail
            key={id}
            id={id}
            template={template}
            activeTemplate={activeTemplate}
            onSelect={setActiveTemplate}
          />
        ))}
      </div>

      <div className="overflow-x-auto rounded-panel bg-app-surface p-6">
        <div ref={contentRef} className="inline-block">
          <ActiveTemplate data={data} />
        </div>
      </div>

      {overflowsPage && (
        <div className={ui.errorBox}>
          <p className={ui.errorText}>
            Warning: this CV content overflows one A4 page.
          </p>
        </div>
      )}
    </div>
  );
}
