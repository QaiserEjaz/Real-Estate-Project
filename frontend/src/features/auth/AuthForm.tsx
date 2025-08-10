"use client";
import { useState } from 'react';
import { useAppDispatch } from '../../store';
import { login, register } from './authSlice';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

export default function AuthForm() {
  const dispatch = useAppDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'tenant',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      dispatch(login({ email: form.email, password: form.password }));
    } else {
      dispatch(register(form));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        {!isLogin && (
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="tenant">Tenant</option>
            <option value="owner">Owner</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Please wait...' : isLogin ? 'Login' : 'Register'}
        </button>
        {error && <div className="text-red-600">{error}</div>}
      </form>
      <button
        className="mt-4 text-blue-600 hover:underline"
        onClick={() => setIsLogin((v) => !v)}
      >
        {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
      </button>
    </div>
  );
}
