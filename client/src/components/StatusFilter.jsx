export default function StatusFilter({ value, onChange }) {
  return (
    <select
      className="form-select"
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      <option value="">All Statuses</option>
      <option value="want-to-read">Want to Read</option>
      <option value="reading">Reading</option>
      <option value="completed">Completed</option>
    </select>
  );
}
