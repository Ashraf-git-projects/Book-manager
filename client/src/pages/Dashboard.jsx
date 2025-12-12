import useAuthGuard from '../hooks/useAuthGuard';
import { getToken } from '../auth';
import { useEffect, useState } from 'react';
import { apiRequest } from '../api';
import AddBookForm from '../components/AddBookForm';
import BookItem from '../components/BookItem';
import StatusFilter from '../components/StatusFilter';
import TagFilter from '../components/TagFilter';

export default function Dashboard() {
  useAuthGuard();

  const [books, setBooks] = useState([]);
  const [stats, setStats] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');

  async function loadBooks() {
    const token = getToken();
    let query = [];

    if (statusFilter) query.push(`status=${statusFilter}`);
    if (tagFilter) query.push(`tag=${tagFilter}`);

    const q = query.length ? '?' + query.join('&') : '';

    const res = await apiRequest('/books' + q, 'GET', null, token);
    if (res.ok) setBooks(res.data.books || []);
  }

  async function loadStats() {
    const token = getToken();
    const res = await apiRequest('/dashboard', 'GET', null, token);
    if (res.ok) setStats(res.data);
  }

  useEffect(() => {
    loadBooks();
    loadStats();
  }, []);

  useEffect(() => {
    loadBooks();
  }, [statusFilter, tagFilter]);

  const tags = Array.from(new Set(books.flatMap(b => b.tags || [])));

  function handleBookAdded(book) {
    setBooks(prev => [book, ...prev]);
    loadStats();
  }

  return (
    <div className="container">

      {/* Stats Section */}
      {stats && (
        <div className="row g-3 mb-4">
          <div className="col-md-3 col-sm-6">
            <div className="card shadow-sm text-center p-3">
              <h5>Total Books</h5>
              <h3>{stats.total}</h3>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="card shadow-sm text-center p-3">
              <h5>Want to Read</h5>
              <h3>{stats.wantToRead}</h3>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="card shadow-sm text-center p-3">
              <h5>Reading</h5>
              <h3>{stats.reading}</h3>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="card shadow-sm text-center p-3">
              <h5>Completed</h5>
              <h3>{stats.completed}</h3>
            </div>
          </div>
        </div>
      )}

      {/* Add Book Form */}
      <div className="mb-4">
        <AddBookForm onAdded={handleBookAdded} />
      </div>

      {/* Filters */}
      <div className="row g-3 mb-4">
  <div className="col-md-3">
    <label className="form-label">Status</label>
    <StatusFilter value={statusFilter} onChange={setStatusFilter} />
  </div>

  <div className="col-md-3">
    <label className="form-label">Tag</label>
    <TagFilter value={tagFilter} onChange={setTagFilter} tags={tags} />
  </div>
</div>


      {/* Books Grid */}
      <div className="row g-4">
        {books.length === 0 && <p>No books found.</p>}

        {books.map(book => (
          <div className="col-md-4 col-sm-6" key={book._id}>
            <BookItem
              book={book}
              onUpdated={updated =>
                setBooks(prev => prev.map(b => (b._id === updated._id ? updated : b)))
              }
              onDeleted={id => {
                setBooks(prev => prev.filter(b => b._id !== id));
                loadStats();
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
