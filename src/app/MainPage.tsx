import { ShoppingCart, Utensils, Calendar, HelpCircle, Globe, MapPin, Briefcase, Heart, Car, House } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

export default function MainPage() {
  const { t } = useTranslation();
  return (
    <div className="mt-4 flex items-center justify-center bg-radial-[at_25%_25%] from-white to-zinc-900 to-75%">
      <form className="w-1/2 p-4 bg-white rounded-xl shadow-md">
        <div className='text-center my-4 mx-4'>
          <div className="loc-selector text-[#616161]">Your Location <span className='loc-selector-span'>Tokyo
          </span> <a href="#" className="loc-selector-change">Change</a>
          </div>
          <div className="grid grid-cols-3 gap-4">
          <Link href="/category/buy-sell-trade" className="flex flex-col items-center gap-4 py-2 border rounded-lg shadow-sm grid-container category-container hover:shadow-md transition-shadow cursor-pointer">
              <Car className="w-8 h-8" />
              <p className='text-sm font-light'>{t('Motors')}</p>
            </Link>
            <Link href="/category/event" className="flex flex-col items-center gap-4 py-2 border rounded-lg shadow-sm grid-container category-container hover:shadow-md transition-shadow cursor-pointer">
              <House className="w-8 h-8" />
              <p className='text-sm font-light'>{t('Property')}</p>
            </Link>
            <Link href="/category/buy-sell-trade" className="flex flex-col items-center gap-4 py-2 border rounded-lg shadow-sm grid-container category-container hover:shadow-md transition-shadow cursor-pointer">
              <ShoppingCart className="w-8 h-8" />
              <p className='text-sm font-light'>{t('translations.buySellTrade')}</p>
            </Link>
            <Link href="/category/restaurant" className="flex flex-col items-center gap-4 py-2 border rounded-lg shadow-sm grid-container hover:shadow-md transition-shadow cursor-pointer">
              <Utensils className="w-8 h-8" />
              <p className='text-sm font-light'>{t('translations.restaurant')}</p>
            </Link>
            <Link href="/category/event" className="flex flex-col items-center gap-4 py-2 border rounded-lg shadow-sm grid-container category-container hover:shadow-md transition-shadow cursor-pointer">
              <Calendar className="w-8 h-8" />
              <p className='text-sm font-light'>{t('translations.event')}</p>
            </Link>
            <Link href="/category/foreigners" className="flex flex-col items-center gap-4 py-2 border rounded-lg shadow-sm grid-container category-container hover:shadow-md transition-shadow cursor-pointer">
              <Globe className="w-8 h-8" />
              <p className='text-sm font-light'>{t('translations.foreignersWelcome')}</p>
            </Link>
            <Link href="/category/tour" className="flex flex-col items-center gap-4 py-2 border rounded-lg shadow-sm grid-container category-container hover:shadow-md transition-shadow cursor-pointer">
              <MapPin className="w-8 h-8" />
              <p className='text-sm font-light'>{t('translations.tourExperience')}</p>
            </Link>
            <Link href="/category/jobs" className="flex flex-col items-center gap-4 py-2 border rounded-lg shadow-sm grid-container category-container hover:shadow-md transition-shadow cursor-pointer">
              <Briefcase className="w-8 h-8" />
              <p className='text-sm font-light'>{t('translations.jobs')}</p>
            </Link>
            <Link href="/category/personals" className="flex flex-col items-center gap-4 py-2 border rounded-lg shadow-sm grid-container category-container hover:shadow-md transition-shadow cursor-pointer">
              <Heart className="w-8 h-8" />
              <p className='text-sm font-light'>{t('translations.personals')}</p>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}