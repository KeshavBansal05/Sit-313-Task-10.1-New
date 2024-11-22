import React from 'react';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import './Footer.css';

function Footer() {
    return (
        <div className='footerInfo'>
            <div className='foot'>
                <div className='Explore'>
                    <p>Explore</p>
                    <li><a href='#'>Home</a></li>
                    <li><a href='#'>Questions</a></li>
                    <li><a href='#'>Articles</a></li>
                    <li><a href='#'>Tutorials</a></li>
                </div>
                <div className='support'>
                    <p>Support</p>
                    <li><a href='#'>FAQs</a></li>
                    <li><a href='#'>Help</a></li>
                    <li><a href='#'>Contact Us</a></li>
                </div>
                <div className='socialmedia'>
                    <p>Stay Connected</p>
                    <div className='Icons'>
                        <li><FaInstagram size={30} color="Purple" /></li>
                        <li><FaFacebook size={30} color="DarkBlue" /></li>
                        <li><FaTwitter size={30} color="Blue" /></li>
                    </div>
                </div>
            </div>
            <div className='dev'>
                <p>DEV@Deakin 2024</p>
                <div className='dev1'>
                    <p>Privacy Policy</p>
                    <p>Terms</p>
                    <p>Code of Conduct</p>
                </div>
            </div>
        </div>
    );
}

export default Footer;
