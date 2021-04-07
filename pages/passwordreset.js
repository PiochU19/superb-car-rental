import HeadComponent from '../components/HeadComponent/HeadComponent';
import Navbar from '../components/Navbar/Navbar';
import PasswordReset from '../components/PasswordReset/PasswordReset';
import Footer from '../components/Footer/Footer';


export default function Home() {
  return (
    <>
    	<HeadComponent>Superb Car Rental</HeadComponent>
    	<Navbar />
    	<PasswordReset />
    	<Footer />
    </>
  )
}