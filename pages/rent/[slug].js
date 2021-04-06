import HeadComponent from '../../components/HeadComponent/HeadComponent';
import Navbar from '../../components/Navbar/Navbar';
import RentMain from '../../components/RentMain/RentMain';
import Footer from '../../components/Footer/Footer';


export default function Home() {
  return (
    <>
    	<HeadComponent>Superb Car Rental - Rent</HeadComponent>
    	<Navbar />
    	<RentMain />
    	<Footer />
    </>
  )
}
