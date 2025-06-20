"use client"
import MainPage from './MainPage';
import Header from '@/components/layout/Header'
import Footer from '../components/layout/Footer'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow mt-12">
        <MainPage />
      </main>
      <Footer />
    </div>
  );
}
