export default function FormField({ label, error, ...input }) {
  return (
    <label className="fl">
      <span>{label}</span>
      <input {...input} />
      <em className="fe">{error}</em>
    </label>
  );
}
