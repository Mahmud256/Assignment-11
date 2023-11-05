import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import FontAwesome icons
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext);
    console.log(user);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                // Display a success message with SweetAlert2
                Swal.fire({
                    icon: 'success',
                    title: 'Logout Successful!',
                    text: 'You have successfully logged out.',
                });
            })
            .catch(error => {
                console.error('Error during logout:', error);
                // Handle the error as needed

                // Display an error message with SweetAlert2
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Logout failed. Please try again later.',
                });
            });
    };

    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    const navLinks = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/services">Services</NavLink></li>
        <li><NavLink to="/blog">Blog</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
    </>

    return (
        <nav className="py-4 px-7 flex justify-between items-center">
            {/* Left Side: Logo */}
            <Link to="/" className="flex items-center">
                <h2>Logo</h2>
            </Link>

            {/* Middle Section: Navigation Links */}
            <div className="hidden md:flex space-x-6">
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu gap-2 menu-horizontal px-1">
                        {navLinks}
                        {user ? (
                            <>
                                <div className='flex flex-col gap-2 items-center'>
                                    <div className="avatar">
                                        <div className="w-12 rounded-full">
                                            <img className='im w-[25px]' src={user.photoURL} alt="" />
                                        </div>
                                    </div>
                                    <h2>{user.displayName}</h2>
                                </div>
                                <li><h2 onClick={handleLogOut} className="">Logout</h2></li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/login">
                                        <h2 className="">Login</h2>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/register">
                                        <h2 className="">Register</h2>
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>

            {/* Right Side: Icons and Buttons */}
            <div className="flex items-center space-x-4">
                {/* You can add other buttons or icons here if needed */}
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className='md:hidden'>
                <button
                    className=""
                    onClick={toggleMobileMenu}
                >
                    {isMobileMenuOpen ? (
                        <FaTimes />
                    ) : (
                        <FaBars />
                    )}
                </button>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden flex m-auto">
                        <ul className='menu'>
                            {navLinks}
                            {user ? (
                                <>
                                    <div className='flex flex-col items-center'>
                                        <div className="avatar">
                                            <div className="w-12 rounded-full">
                                                <img className='im w-[25px]' src={user.photoURL} alt="" />
                                            </div>
                                        </div>
                                        <h2>{user.displayName}</h2>
                                    </div>
                                    <li><h2 onClick={handleLogOut} className="">Logout</h2></li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link to="/login">
                                            <h2 className="">Login</h2>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/register">
                                            <h2 className="">Register</h2>
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
