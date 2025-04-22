import { ShoppingCart, Utensils, Calendar, HelpCircle, Globe, MapPin, Briefcase, Heart } from 'lucide-react';

export default function MainPage() {
  return (
    <div className='text-center my-10 mx-10'>
      <div className="loc-selector">Your Location <span className='loc-selector-span'>Tokyo
      </span> <a href="#" className="loc-selector-change">Change</a>
      </div>
      <div className="grid grid-cols-3 gap-8 px-10 py-4 mx-10">
        <div className="flex flex-col  items-center gap-4  border rounded-lg shadow-sm grid-container hover:shadow-md transition-shadow cursor-pointer">
          <ShoppingCart className="w-8 h-8" />
          <p className='text-sm font-light'>Buy / Sell / Trade</p>
        </div>
        <div className="flex flex-col items-center gap-4  border rounded-lg shadow-sm grid-container hover:shadow-md transition-shadow cursor-pointer">
          <Utensils className="w-8 h-8" />
          <p className='text-sm font-light'>Restaurant</p>
        </div>
        <div className="flex flex-col items-center gap-4 border rounded-lg shadow-sm grid-container hover:shadow-md transition-shadow cursor-pointer">
          <Calendar className="w-8 h-8" />
          <p className='text-sm font-light'>Event</p>
        </div>
        <div className="flex flex-col items-center gap-4 border rounded-lg shadow-sm grid-container hover:shadow-md transition-shadow cursor-pointer">
          <HelpCircle className="w-8 h-8 mt-10" />
          <p className='text-sm font-light'>Help&Concierge</p>
        </div>
        <div className="flex flex-col items-center gap-4  border rounded-lg shadow-sm grid-container hover:shadow-md transition-shadow cursor-pointer">
          <Globe className="w-8 h-8" />
          <p className='text-sm font-light'>Foreigners Welcome Services</p>
        </div>
        <div className="flex flex-col items-center gap-4 border rounded-lg shadow-sm grid-container hover:shadow-md transition-shadow cursor-pointer">
          <MapPin className="w-8 h-8" />
          <p className='text-sm font-light'>Tour&Experience</p>
        </div>
        <div className="flex flex-col items-center gap-4 border rounded-lg shadow-sm grid-container hover:shadow-md transition-shadow cursor-pointer">
          <Briefcase className="w-8 h-8" />
          <p className='text-sm font-light'>Job</p>
        </div>
        <div className="flex flex-col items-center gap-4 border rounded-lg shadow-sm grid-container hover:shadow-md transition-shadow cursor-pointer">
          <Heart className="w-8 h-8" />
          <p className='text-sm font-light'>Personals</p>
        </div>
      </div>
    </div>
  );
}