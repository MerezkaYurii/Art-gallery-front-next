'use client';
import { useState } from 'react';
// import LoftModalAdmin from '../components/LoftModalAdmin';

export default function AdminPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState('');

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
            <label className="font-bold text-gray-900">Password:</label>
            <input
              type="password"
              placeholder="Enter password"
              className="p-2 border rounded-md w-full mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              onClick={handlePasswordSubmit}
              className="bg-gray-700 text-white font-bold px-4 py-2 rounded-md hover:bg-blue-700 w-full"
            >
              Continue
            </button>
          </div>
        )}

        {isAuthorized && (
          <>
            <button
              className="bg-gray-700 text-white font-bold p-2 rounded-xl hover:bg-blue-700 px-20"
              onClick={() => setIsOpen(true)}
            >
              Add loft
            </button>
            {/* {isOpen && <LoftModalAdmin onClose={() => setIsOpen(false)} />} */}
          </>
        )}
      </div>
    </div>
  );
}
