import Navbar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

export default function Page({ children }) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );

};
