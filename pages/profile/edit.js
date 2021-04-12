import HeadComponent from '../../components/HeadComponent/HeadComponent';
import Navbar from '../../components/Navbar/Navbar';
import ProfileEdit from '../../components/ProfileEdit/ProfileEdit';
import Footer from '../../components/Footer/Footer';


export default function Home() {
  return (
    <>
    	<HeadComponent>Superb Car Rental - Profile</HeadComponent>
    	<Navbar />
    	<ProfileEdit />
    	<Footer />
    </>
  )
}