'use client';
import { useState } from 'react';

export default function LoftModalAdmin({ onClose }: { onClose: () => void }) {
  const [collection, setCollection] = useState('');
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    thumbnail: string;
    type: string;
    file: File | null;
  }>({
    title: '',
    description: '',
    thumbnail: '',
    type: '',
    file: null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formPayload = new FormData();
      if (formData.file) {
        formPayload.append('file', formData.file);
      }
      formPayload.append('title', formData.title);
      formPayload.append('description', formData.description);
      formPayload.append('type', formData.type);
      formPayload.append('category', collection);
      formPayload.append('thumbnail', formData.thumbnail);

      if (!formData.file && !formData.thumbnail) {
        alert(
          'Please provide either a file or a link. Пожалуйста, предоставьте файл или ссылку',
        );
        return;
      }

      const API_URL =
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:4000'
          : process.env.NEXT_PUBLIC_BACKEND_API_URL;

      // console.log('✅ file in FormData:', formData.file);
      // console.log('📤 FormData preview:');
      formPayload.forEach((val, key) => console.log(' -', key, val));

      const response = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        body: formPayload,
      });

      if (response.ok) {
        alert('Data saved successfully!');
        setFormData({
          title: '',
          description: '',
          thumbnail: '',
          type: '',
          file: null,
        });
        setCollection('');
        onClose();
      } else {
        alert('Error saving data');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error saving');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-8 shadow-md space-y-4 w-full max-w-md rounded-xl"
      >
        <label className="text-gray-900 font-bold ">
          Name photo/video:
          <input
            className=" border border-gray-500 p-2 rounded-md mb-4 w-full"
            type="text"
            placeholder="Name"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
        </label>
        <label className="text-gray-900 font-bold">
          Photo/Video description:
          <textarea
            className="w-full border border-gray-500 p-2 rounded-md mb-4"
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </label>
        <label className="text-gray-900 font-bold ">
          Link to Photo/Video:
          <input
            className="w-full border border-gray-500 p-2 rounded-md mb-4"
            type="text"
            placeholder="Link "
            value={formData.thumbnail}
            onChange={(e) =>
              setFormData({ ...formData, thumbnail: e.target.value })
            }
          />
        </label>

        <div className="flex items-center gap-4 ">
          <label className="bg-gray-700 text-white font-bold px-10 py-2 rounded-md cursor-pointer hover:bg-blue-800 mb-4">
            Select file
            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => {
                const selectedFile = e.target.files?.[0] || null;
                console.log('📦 Selected file:', selectedFile);
                setFormData({ ...formData, file: selectedFile });
              }}
              className="hidden"
            />
          </label>
          <span className="text-sm text-blue-800  ml-5">
            {formData.file ? formData.file.name : 'File not selected'}
          </span>
        </div>

        <label className="text-gray-900 font-bold ">
          Select Image or Video
          <select
            className="w-full border border-gray-500 p-2 rounded-md text-gray-700 mb-4"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <option value="">Select Photo/Video </option>
            <option value="photo">Photo</option>
            <option value="video">Video</option>
          </select>
        </label>
        <label className="text-gray-900 font-bold ">
          Select category
          <select
            value={collection}
            onChange={(e) => setCollection(e.target.value)}
            className="w-full border border-gray-500 p-2 rounded-md text-gray-700 mb-4"
          >
            <option value="">Select category</option>
            <option value="my-photos">My Photo</option>
            <option value="internet-photos">Photo from the Internet</option>
            <option value="my-videos">My Video</option>
            <option value="internet-videos">Video from the Internet</option>
            <option value="my-equipment">My equipment</option>
            <option value="how-to">How to do it correctly</option>
          </select>
        </label>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-700 px-10 text-white font-bold py-2 rounded-xl hover:bg-blue-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-800 text-white font-bold px-12 py-2 rounded-xl hover:bg-gray-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
