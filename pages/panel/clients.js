import HeadComponent from '../../components/HeadComponent/HeadComponent';
import Navbar from '../../components/Navbar/Navbar';
import ClientsMain from '../../components/CLientsMain/CLientsMain';
import Footer from '../../components/Footer/Footer';


export default function Home() {
  return (
    <>
    	<HeadComponent>Superb Car Rental - Clients</HeadComponent>
    	<Navbar />
    	<ClientsMain />
    	<Footer />
    </>
  )
}