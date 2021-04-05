import HeadComponent from '../components/HeadComponent/HeadComponent';
import Navbar from '../components/Navbar/Navbar';
import IndexMain from '../components/IndexMain/IndexMain';
import Footer from '../components/Footer/Footer';

export default function Home() {
  return (
    <>
    	<HeadComponent>Superb Car Rental</HeadComponent>
    	<Navbar />
    	<IndexMain />
    	<Footer />
    </>
  )
}
