import { ui } from "../../styles/ui";

export default function ChatComposer({ value, loading, onChange, onSubmit }) {
  const disabled = loading || !value.trim();

  return (
    <form onSubmit={onSubmit} className="flex gap-3">
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={loading}
        className={`flex-1 ${ui.field}`}
        placeholder="Ask AI to refine or update this document..."
      />
      <button
        type="submit"
        disabled={disabled}
        className={`${ui.primaryButton} ${disabled ? "opacity-80" : ""}`}
      >
        {loading ? "..." : "Send"}
      </button>
    </form>
  );
}
