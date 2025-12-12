import { useState } from 'react';
import { apiRequest } from '../api';
import { getToken } from '../auth';

export default function BookItem({ book, onUpdated, onDeleted }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author || '');
  const [tags, setTags] = useState(book.tags?.join(', ') || '');
  const [status, setStatus] = useState(book.status);
  const [error, setError] = useState('');

  async function saveEdit() {
    const token = getToken();
    const res = await apiRequest(
      `/books/${book._id}`,
      'PUT',
      {
        title,
        author,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        status
      },
      token
    );

    if (!res.ok) {
      setError(res.data.message || 'Update failed');
      return;
    }

    onUpdated(res.data.book);
    setEditing(false);
  }

  async function deleteBook() {
    const token = getToken();
    const res = await apiRequest(`/books/${book._id}`, 'DELETE', null, token);
    if (res.ok) onDeleted(book._id);
  }

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">

        {editing ? (
          <>
            {error && <div className="alert alert-danger">{error}</div>}

            <input
              type="text"
              className="form-control mb-2"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />

            <input
              type="text"
              className="form-control mb-2"
              value={author}
              onChange={e => setAuthor(e.target.value)}
            />

            <input
              type="text"
              className="form-control mb-2"
              value={tags}
              onChange={e => setTags(e.target.value)}
            />

            <select
              className="form-select mb-3"
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              <option value="want-to-read">Want to Read</option>
              <option value="reading">Reading</option>
              <option value="completed">Completed</option>
            </select>

            <div className="d-flex justify-content-between">
              <button className="btn btn-success btn-sm" onClick={saveEdit}>
                Save
              </button>
              <button className="btn btn-secondary btn-sm" onClick={() => setEditing(false)}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h5 className="card-title">{book.title}</h5>
            <h6 className="card-subtitle text-muted mb-2">{book.author}</h6>

            <p className="mb-1">
              <strong>Status:</strong>
            </p>

            <select
              className="form-select form-select-sm mb-3"
              value={status}
              onChange={async e => {
                const newStatus = e.target.value;
                setStatus(newStatus);

                const token = getToken();
                const res = await apiRequest(
                  `/books/${book._id}`,
                  'PUT',
                  { status: newStatus },
                  token
                );

                if (res.ok) onUpdated(res.data.book);
              }}
            >
              <option value="want-to-read">Want to Read</option>
              <option value="reading">Reading</option>
              <option value="completed">Completed</option>
            </select>

            <div className="d-flex justify-content-between">
              <button className="btn btn-primary btn-sm" onClick={() => setEditing(true)}>
                Edit
              </button>
              <button className="btn btn-danger btn-sm" onClick={deleteBook}>
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
