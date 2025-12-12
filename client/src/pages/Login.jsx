import { useState } from 'react';
import { login } from '../services/auth';
import { saveToken } from '../auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const res = await login(email, password);
    if (!res.ok) {
      setError(res.data.message || 'Login failed');
      return;
    }

    saveToken(res.data.token);
    window.location.href = '/dashboard';
  }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        
        <h3 className="text-center mb-4">Welcome Back</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} className="d-grid gap-3">

          <input
            type="email"
            className="form-control"
            placeholder="Email Address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <button className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          New here? <a href="/signup">Create an account</a>
        </p>
      </div>
    </div>
  );
}
