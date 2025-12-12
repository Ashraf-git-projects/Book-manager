import { useState } from 'react';
import { apiRequest } from '../api';
import { getToken } from '../auth';

export default function AddBookForm({ onAdded }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState('want-to-read');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const token = getToken();
    const res = await apiRequest(
      '/books',
      'POST',
      {
        title,
        author,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        status
      },
      token
    );

    if (!res.ok) {
      setError(res.data.message || 'Failed to create book');
      return;
    }

    setTitle('');
    setAuthor('');
    setTags('');
    setStatus('want-to-read');

    onAdded(res.data.book);
  }

  return (
    <div className="card shadow-sm p-4">
      <h4 className="mb-3">Add a New Book</h4>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="row g-3">

        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Book Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Author Name"
            value={author}
            onChange={e => setAuthor(e.target.value)}
          />
        </div>

        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={e => setTags(e.target.value)}
          />
        </div>

        <div className="col-md-6">
          <select
            className="form-select"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <option value="want-to-read">Want to Read</option>
            <option value="reading">Reading</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="col-12">
          <button className="btn btn-primary w-100">
            Add Book
          </button>
        </div>

      </form>
    </div>
  );
}
