import { profileSetupFields } from "../../utils/profileSetup";
import { ui } from "../../styles/ui";
import ProfileField from "./ProfileField";

export default function ProfileSetupForm({ formData, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {profileSetupFields.map((field) => (
        <ProfileField
          key={field.id}
          field={field}
          value={formData[field.id]}
          onChange={onChange}
        />
      ))}

      <button
        type="submit"
        className={`w-full ${ui.primaryButton}`}
      >
        Save Profile
      </button>
    </form>
  );
}
