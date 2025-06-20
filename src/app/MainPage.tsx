import { ShoppingCart, Utensils, Calendar, Globe, MapPin, Users } from 'lucide-react';
import Link from 'next/link';

export default function MainPage() {

  return (
    <div className="mt-12 flex items-center justify-center bg-radial-[at_25%_25%] from-white to-zinc-900 to-75%">
      <form className="w-1/2 p-4 bg-white rounded-xl shadow-md">
        <div className='text-center my-4 mx-4'>
          <h2 className='text-xl font-bold text-gray-700'>Live freely in Japan with local info at your fingertips.</h2>
          <p className='text-sm text-gray-500'>Find the best deals, explore local culture, and connect with the community.</p>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <Link href="/category/buy-sell-trade" className="flex flex-col items-center gap-4 py-2 border rounded-lg shadow-sm grid-container category-container hover:shadow-md transition-shadow cursor-pointer">
              <ShoppingCart className="w-8 h-8" />
              <p className='text-sm font-light'>buy sell trade</p>
            </Link>
            <Link href="/category/restaurant" className="flex flex-col items-center gap-4 py-2 border rounded-lg shadow-sm grid-container hover:shadow-md transition-shadow cursor-pointer">
              <Utensils className="w-8 h-8" />
              <p className='text-sm font-light'>restaurant</p>
            </Link>
            <Link href="/category/event" className="flex flex-col items-center gap-4 py-2 border rounded-lg shadow-sm grid-container category-container hover:shadow-md transition-shadow cursor-pointer">
              <Calendar className="w-8 h-8" />
              <p className='text-sm font-light'>event</p>
            </Link>
            <Link href="/category/foreigners" className="flex flex-col items-center gap-4 py-2 border rounded-lg shadow-sm grid-container category-container hover:shadow-md transition-shadow cursor-pointer">
              <Globe className="w-8 h-8" />
              <p className='text-sm font-light'>foreigners welcome</p>
            </Link>
            <Link href="/category/tour-experience" className="flex flex-col items-center gap-4 py-2 border rounded-lg shadow-sm grid-container category-container hover:shadow-md transition-shadow cursor-pointer">
              <MapPin className="w-8 h-8" />
              <p className='text-sm font-light'>tour experience</p>
            </Link>
            <Link href="/category/community" className="flex flex-col items-center gap-4 py-2 border rounded-lg shadow-sm grid-container category-container hover:shadow-md transition-shadow cursor-pointer">
              <Users className="w-8 h-8" />
              <p className='text-sm font-light'>community</p>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}