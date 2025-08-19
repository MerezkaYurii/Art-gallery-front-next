'use client';
import { useState } from 'react';
import LoftModalAdmin from '../components/LoftModalAdmin';

export default function AdminPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  const handlePasswordSubmit = () => {
    if (password === correctPassword) {
      setIsAuthorized(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="flex  justify-center w-md">
      <div className="flex flex-col items-center  mt-20 gap-4 p-10 w-[400px] bg-gray-100 rounded-xl shadow-lg">
        {!isAuthorized && (
          <div className="flex flex-col items-center gap-2 w-full">
            <label className="font-bold text-gray-900">Пароль/Password:</label>

            <div className="relative w-full mb-4">
              <input
                type={showPassword ? 'text' : 'password'} // переключение 👁
                placeholder="Введіть пароль / Enter password"
                className="p-2 pr-10 border rounded-md w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              onClick={handlePasswordSubmit}
              className="bg-gray-700 text-white font-bold px-4 py-2 rounded-md hover:bg-blue-700 w-full"
            >
              Продовжити/Continue
            </button>
          </div>
        )}

        {isAuthorized && (
          <>
            <button
              className="bg-gray-700 text-white font-bold p-2 rounded-xl hover:bg-blue-700 px-10"
              onClick={() => setIsOpen(true)}
            >
              Додати картину/Add painting
            </button>
            {isOpen && <LoftModalAdmin onClose={() => setIsOpen(false)} />}
          </>
        )}
      </div>
    </div>
  );
}
