"use client"
import Search from '@/components/Search';
import MainPage from './MainPage';
import Header from '@/components/Header'
import Footer from '../components/Footer'

export default function Home() {

  return (
    <>
      <Header></Header>
      {/* <Search></Search> */}
      <MainPage></MainPage>
      <Footer></Footer>
    </>


  );
}
