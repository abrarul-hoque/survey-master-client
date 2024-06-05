import { Link } from 'react-router-dom';
import footerLogo from '../../assets/logo-footer.png';

const Footer = () => {
    return (
        <div className='bg-base-200 text-base-content'>
            <div className='max-w-6xl mx-auto'>
                <footer className="footer p-10 ">
                    <aside>
                        <div className=''>
                            <img className='w-28' src={footerLogo} alt="" />
                        </div>

                        <p>Engage your audience, gather insights, <br />and make informed decisions.</p>
                    </aside>
                    <nav>
                        <h6 className="footer-title">Services</h6>
                        <a className="link link-hover">Branding</a>
                        <a className="link link-hover">Design</a>
                        <a className="link link-hover">Marketing</a>
                        <a className="link link-hover">Advertisement</a>
                    </nav>
                    <nav>
                        <h6 className="footer-title">Menus</h6>
                        <Link to="/aboutUs"><a className="link link-hover">About us</a></Link>
                        <Link to="/contact"><a className="link link-hover">Contact</a></Link>
                        <Link to="/surveys"><a className="link link-hover">Surveys</a></Link>
                    </nav>
                    <nav>
                        <h6 className="footer-title">Legal</h6>
                        <a className="link link-hover">Terms of use</a>
                        <a className="link link-hover">Privacy policy</a>
                        <a className="link link-hover">Cookie policy</a>
                    </nav>
                </footer>
            </div>
        </div>
    );
};

export default Footer;