import HeadComponent from '../../components/HeadComponent/HeadComponent';
import Navbar from '../../components/Navbar/Navbar';
import EmployeeMain from '../../components/EmployeeMain/EmployeeMain';
import Footer from '../../components/Footer/Footer';


export default function Home() {
  return (
    <>
    	<HeadComponent>Superb Car Rental - Employees</HeadComponent>
    	<Navbar />
    	<EmployeeMain />
    	<Footer />
    </>
  )
}