import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <div className="relative z-0 w-full max-w-7xl mt-[-1rem] aspect-[16/9] sm:aspect-[16/7] md:aspect-[16/9]">
        <Image
          src="/homepage.jpg"
          alt="Homepage image"
          fill
          className="object-cover"
        />

        {/* Текстовый блок по центру */}
        <div className="absolute left-1/2 -translate-x-1/2 top-16 z-40 max-w-[90%] sm:max-w-[50%]  sm:top-9 text-center">
          <h2 className="text-white text-xl sm:text-2xl md:text-3xl font-bold leading-[1] drop-shadow-[3px_3px_3px_black] mb-4">
            Welcome to the website of artist Svitlana Tochynska
            <br />
            Ласкаво просимо на сайт художниці Світлани Точинської
          </h2>

          <p className="hidden md:block text-white text-[18px] font-bold leading-[1.2] xl:leading-relaxed drop-shadow-[3px_3px_3px_black]">
            Тут ви можете ознайомитися з творчістю одеської художниці Світлани
            Точинської. У розділі «Каталог» представлені зразки її робіт з
            назвами. Кожна картина — це відображення внутрішнього світу, емоцій
            та натхнення, втілених на полотні.
            <br />
            Here you can explore the artwork of Odesa-based artist Svitlana
            Tochynska. In the “Catalog” section, you will find samples of her
            works with their titles. Each painting is a reflection of her inner
            world, emotions, and inspiration brought to life on canvas.
          </p>
        </div>

        {/* Контейнер для иконок */}
        <div
          className="absolute left-1/2 -translate-x-1/2 z-30 flex flex-row gap-2
           justify-center
                      md:justify-between md:flex-row md:w-full max-w-7xl px-4"
        >
          {/* Левая иконка - слева от текста на десктопе */}
          <Link
            href="/pages/catalog"
            className="h-[70px] w-[100px] sm:h-[100px] sm:w-[200px] md:h-[200px] md:w-[300px] shrink-0 hover:drop-shadow-[3px_3px_3px_black]"
          >
            <svg
              className="w-full h-full"
              viewBox="0 0 100 150"
              preserveAspectRatio="xMidYMid meet"
            >
              <use href="/symbols.svg#icon-IconCatalog" />
            </svg>
          </Link>

          {/* Правая иконка - справа от текста на десктопе */}
          <Link
            href="/pages/gallery"
            className="h-[70px] w-[100px] sm:h-[100px] sm:w-[200px] md:h-[200px] md:w-[300px] shrink-0 hover:drop-shadow-[3px_3px_3px_black]"
          >
            <svg
              className="w-full h-full"
              viewBox="0 0 100 150"
              preserveAspectRatio="xMidYMid meet"
            >
              <use href="/symbols.svg#icon-IconGallery" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}
