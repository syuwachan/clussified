"use client"
import Image from 'next/image';
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import MainPage from "./MainPage";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className='flex justify-around items-center p-4'>
      <Image
        src="/logo.png"
        alt="J-Classified Logo"
        width={300}
        height={100}
        priority
      />
      <div className="relative hover:cursor-pointer">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-white shadow-sm font-size-18 hover:bg-gray-50 transition-colors hover:cursor-pointer"
        >
          English
          <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        <div className={`absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg transition-all duration-200 ease-in-out transform ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
          <div className="py-4">
            <button className="block w-full px-4 py-2 text-left text-md hover:bg-gray-100 cursor-pointer pl-6">
              日本語
            </button>
            <button className="block w-full px-4 py-2 text-left text-md hover:bg-gray-100 cursor-pointer pl-6">
              中文
            </button>
            <button className="block w-full px-4 py-2 text-left text-md hover:bg-gray-100 cursor-pointer pl-6">
              한국어
            </button>
          </div>
        </div>
      </div>
      </div>
      <MainPage />
    </div>
    
  );
}
