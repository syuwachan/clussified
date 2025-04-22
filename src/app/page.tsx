"use client"
import Link from 'next/link';
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import MainPage from "./MainPage";
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <div>
      <div className='flex justify-around items-center p-4'>
        <p className='text-2xl font-bold'>J-Classified</p>
        <div className='flex justify-end text-decoration-none'>
          <Link href="/signup" className='ml-4 p-2 text-decoration-none'>{t('translations.signup')}</Link>
        </div>
        <div className='flex justify-end'>
          <Link href="/login" className='ml-4 p-2 text-decoration-none'>{t('translations.login')}</Link>
        </div>
        <div className="relative hover:cursor-pointer">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white shadow-sm font-size-18 hover:bg-gray-50 transition-colors hover:cursor-pointer"
          >
            {t('english')}
            <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          <div className={`absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg transition-all duration-200 ease-in-out transform ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
            <div className="py-4">
              <button
                className="block w-full px-4 py-2 text-left text-md hover:bg-gray-100 cursor-pointer pl-6"
                onClick={() => i18n.changeLanguage('ja')}
              >
                {t('japanese')}
              </button>
              <button
                className="block w-full px-4 py-2 text-left text-md hover:bg-gray-100 cursor-pointer pl-6"
                onClick={() => i18n.changeLanguage('zh')}
              >
                {t('chinese')}
              </button>
              <button className="block w-full px-4 py-2 text-left text-md hover:bg-gray-100 cursor-pointer pl-6"
                onClick={() => i18n.changeLanguage('ko')}
              >
                {t('korean')}
              </button>
            </div>
          </div>
        </div>
      </div>
      <MainPage />
    </div>


  );
}
