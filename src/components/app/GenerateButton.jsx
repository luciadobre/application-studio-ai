import { ui } from "../../styles/ui";

function buttonClass(loading) {
  return ["w-full", ui.primaryButton, loading ? "opacity-80" : ""].join(" ");
}

export default function GenerateButton({ loading }) {
  return (
    <button type="submit" disabled={loading} className={buttonClass(loading)}>
      {loading ? "Processing..." : "Generate Application"}
    </button>
  );
}
