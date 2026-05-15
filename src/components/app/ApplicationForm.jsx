import FormError from "./FormError";
import GenerateButton from "./GenerateButton";
import JobDescriptionField from "./JobDescriptionField";

export default function ApplicationForm({
  jobDescription,
  loading,
  error,
  onJobDescriptionChange,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <JobDescriptionField
        value={jobDescription}
        onChange={onJobDescriptionChange}
      />
      <FormError message={error} />
      <GenerateButton loading={loading} />
    </form>
  );
}
