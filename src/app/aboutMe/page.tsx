import Image from 'next/image';
import React from 'react';

export default function AboutPage() {
  return (
    <main className="flex flex-col items-cente  ">
      {/* Фон */}
      <div className="relative  z-1 w-full max-w-7xl mt-[-1rem] aspect-[16/9] sm:aspect-[16/7] md:aspect-[16/9]">
        <Image
          src="/about-me.jpg"
          alt="about-me"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
      </div>

      {/* Фото и текст */}

      <div className="absolute  left-1/2 transform -translate-x-1/2 z-20 w-full px-4 sm:px-8 md:px-0 max-w-2xl">
        <div className="flex justify-center">
          <Image
            src="/unnamed.jpg"
            alt="my-photo"
            width={130}
            height={130}
            className="rounded-full border-2 border-gray-100 shadow-lg mt-4"
          />
        </div>

        <div className="mt-6 text-center text-white">
          <p className="text-2xl font-bold leading-6 mb-3">
            Мене звуть Світлана Точинська.
          </p>
          <p className="text-xl   font-bold leading-6 mb-3">
            Я створюю мистецтво у стилі Digital Painting — живий світ кольору,
            світла й настрою. У своїх роботах я оживляю пейзажі, тварин та
            натюрморти, передаючи ніжність природи й теплоту емоцій.
          </p>

          <p className="text-xl font-bold leading-6 mb-3">
            Кожна моя ілюстрація — це історія у кольорі, яку можна побачити як у
            цифровому форматі, так і на друкованих виробах: полотнах, постерах,
            футболках, чашках чи магнітах.
          </p>

          <p className="text-xl font-bold leading-6 mb-3">
            Моя творчість — для тих, хто любить гармонію, красу і натхнення в
            кожній деталі.
          </p>

          <div className="mt-5 text-lg font-bold text-gray-300">
            <p className="mb-1">
              Telegram:{' '}
              <a
                href="https://t.me/Yurii"
                target="_blank"
                className="underline hover:text-white"
              >
                t.me/Yurii
              </a>
            </p>
            <p className="mb-1">
              Facebook:{' '}
              <a
                href="https://www.facebook.com/kros/"
                target="_blank"
                className="underline hover:text-white"
              >
                facebook.com/kros
              </a>
            </p>
            <p className="mb-1">
              L?????????????:{' '}
              <a
                href="https://linkedin.com/in/yurii"
                target="_blank"
                className="underline hover:text-white"
              >
                linkedin.com/in/yurii
              </a>
            </p>
            <p>
              Email:{' '}
              <a
                href="mailto:tocinskaas@gmail.com"
                className="underline hover:text-white"
              >
                tocinskaas@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
