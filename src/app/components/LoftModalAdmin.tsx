'use client';
import { useState } from 'react';

//!!!!!!
import { dump, insert, ImageIFD } from 'piexifjs';

const set72DPI = (jpegBase64: string): string => {
  const zeroth: Record<number, number[]> = {};
  zeroth[ImageIFD.XResolution] = [72, 1];
  zeroth[ImageIFD.YResolution] = [72, 1];
  zeroth[ImageIFD.ResolutionUnit] = [2, 1];

  const exifObj = { '0th': zeroth };

  const exifBytes = dump(exifObj);
  return insert(exifBytes, jpegBase64);
};
//!!!!!!

export default function LoftModalAdmin({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState<{
    title: string;
    description?: string;
    file: File | null;
  }>({
    title: '',
    description: '',
    file: null,
  });

  // 🖼️ Генеруємо прев’ю через canvas
  const createThumbnail = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = () => {
        if (!reader.result) return reject('No result from FileReader');
        img.src = reader.result as string;
      };

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject('No canvas context');

        const MAX_WIDTH = 300;
        const scale = MAX_WIDTH / img.width;
        const width = MAX_WIDTH;
        const height = img.height * scale;

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        const base64data = canvas.toDataURL('image/jpeg', 0.7);
        const base64WithDPI = set72DPI(base64data);
        const base64ToBlob = (base64: string): Blob => {
          const byteString = atob(base64.split(',')[1]);
          const mime = base64.match(/:(.*?);/)![1];
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          return new Blob([ab], { type: mime });
        };
        resolve(base64ToBlob(base64WithDPI));
      };

      reader.readAsDataURL(file);
    });
  };

  //-----------------

  // ☁️ Завантаження прев’ю в Cloudinary
  const uploadToCloudinary = async (blob: Blob): Promise<string> => {
    const data = new FormData();
    data.append('file', blob);
    data.append('upload_preset', 'preview_upload'); // ← заміни на свій
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dwrfm4vpz/image/upload',
      {
        method: 'POST',
        body: data,
      },
    );
    const result = await res.json();
    return result.secure_url;
  };

  //-----------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.file) {
      alert('Будь ласка, надайте файл/Please provide either a file. ');
      return;
    }

    try {
      // 1. Створити прев’ю
      const thumbnailBlob = await createThumbnail(formData.file);

      // 2. Завантажити прев’ю в Cloudinary
      const thumbnailUrl = await uploadToCloudinary(thumbnailBlob);

      const API_URL =
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:4000'
          : process.env.NEXT_PUBLIC_BACKEND_API_URL;

      const payload = {
        title: formData.title,
        description: formData.description || '',
        thumbnail: thumbnailUrl,
      };

      //????????????????????????????????????????????????????
      const response = await fetch(`${API_URL}/catalog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('Дані успішно збережено!/Data saved successfully!');
        setFormData({
          title: '',
          description: '',
          file: null,
        });

        onClose();
      } else {
        alert('❌ Помилка збереження даних/Error saving data');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Сталася помилка під час збереження/There was an error saving');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-8 shadow-md space-y-4 w-full max-w-md rounded-xl"
      >
        <label className="text-gray-900 font-bold ">
          Назва картини/Name picture
          <input
            className=" border border-gray-500 p-2 rounded-md mb-4 w-full"
            type="text"
            placeholder="Назва/Name"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
        </label>
        <label className="text-gray-900 font-bold">
          Опис картини/Picture description:
          <textarea
            className="w-full border border-gray-500 p-2 rounded-md mb-4"
            placeholder="Опис/Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </label>

        <div className="flex items-center gap-4 flex-col">
          <label className="bg-gray-700 w-full text-center text-white font-bold px-10 py-2 rounded-md cursor-pointer hover:bg-blue-800 mb-4">
            Вибери файл/Select file
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const selectedFile = e.target.files?.[0] || null;
                console.log('📦 Selected file:', selectedFile);
                setFormData({ ...formData, file: selectedFile });
              }}
              className="hidden"
            />
          </label>
          <div>
            <span className="text-base font-bold text-blue-800  ml-5 ">
              {formData.file
                ? formData.file.name
                : 'Файл не вибрано/File not selected'}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <button
            type="submit"
            className="bg-blue-800 text-white font-bold px-12 py-2 rounded-xl hover:bg-gray-700"
          >
            Зберегти/Save
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-700 px-10 text-white font-bold py-2 rounded-xl hover:bg-blue-800"
          >
            Скасувати/Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
