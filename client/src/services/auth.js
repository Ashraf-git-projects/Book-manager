import { apiRequest } from '../api';

export async function signup(name, email, password) {
  return apiRequest('/auth/signup', 'POST', { name, email, password });
}

export async function login(email, password) {
  return apiRequest('/auth/login', 'POST', { email, password });
}
