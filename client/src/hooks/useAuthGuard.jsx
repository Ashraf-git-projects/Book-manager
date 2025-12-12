import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../auth';

export default function useAuthGuard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!token) navigate('/login');
  }, [navigate]);
}
