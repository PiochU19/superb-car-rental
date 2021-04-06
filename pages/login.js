import HeadComponent from '../components/HeadComponent/HeadComponent';
import Navbar from '../components/Navbar/Navbar';
import LoginMain from '../components/LoginMain/LoginMain';
import Footer from '../components/Footer/Footer';

export default function Home() {
  return (
    <>
    	<HeadComponent>Superb Car Rental - login</HeadComponent>
    	<Navbar />
    	<LoginMain />
    	<Footer />
    </>
  )
}