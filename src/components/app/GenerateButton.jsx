import { ui } from "../../styles/ui";

export default function GenerateButton({ loading }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`w-full ${ui.primaryButton} ${loading ? "opacity-80" : ""}`}
    >
      {loading ? "Processing..." : "Generate Application"}
    </button>
  );
}
