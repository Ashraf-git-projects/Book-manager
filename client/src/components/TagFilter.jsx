export default function TagFilter({ value, onChange, tags }) {
  return (
    <select
      className="form-select"
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      <option value="">All Tags</option>
      {tags.map((t, i) => (
        <option key={i} value={t}>{t}</option>
      ))}
    </select>
  );
}
