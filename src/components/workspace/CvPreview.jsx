import { useLayoutEffect, useRef, useState } from "react";
import { ui } from "../../styles/ui";
import TemplateBold from "../templates/TemplateBold";
import TemplateClassic from "../templates/TemplateClassic";
import TemplateMinimal from "../templates/TemplateMinimal";

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

function thumbnailButtonClass(isActive) {
  const activeClass = "border-app-accent ring-2 ring-app-accent/20";
  const idleClass = "border-app-line hover:border-app-muted";

  return [
    "w-28 rounded-field border bg-app-surface p-2 text-left transition",
    isActive ? activeClass : idleClass,
  ].join(" ");
}

function TemplateThumbnail({ id, template, activeTemplate, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className={thumbnailButtonClass(activeTemplate === id)}
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
      setOverflowsPage(height > 1123);
    });

    return () => cancelAnimationFrame(frame);
  });

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
