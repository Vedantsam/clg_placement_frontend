import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, {
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate('/');
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Logout failed');
        }
    };

    return (
        <nav className="bg-white shadow-sm">
            <div className="flex items-center justify-between px-4 sm:px-8 h-16 max-w-7xl mx-auto">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-gray-800">
                    Next<span className="text-[#F83002]">One</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-10">
                    <ul className="flex items-center gap-6 font-medium text-gray-700">
                        {user && user.role === 'recruiter' ? (
                            <>
                                <li><Link to="/admin/companies">Companies</Link></li>
                                <li><Link to="/admin/jobs">Jobs</Link></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/jobs">Jobs</Link></li>
                                <li><Link to="/browse">Browse</Link></li>
                                <li>
                                    <a
                                        href="http://43.204.215.14:8501/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Button variant="outline" size="sm">Resume App</Button>
                                    </a>
                                </li>
                            </>
                        )}
                    </ul>

                    {/* User Actions */}
                    {!user ? (
                        <div className="flex items-center gap-3">
                            <Link to="/login">
                                <Button variant="outline" size="sm">Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button size="sm" className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white">Signup</Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer ring-2 ring-[#6A38C2]">
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 shadow-lg rounded-lg">
                                <div className="flex gap-3 items-center mb-4">
                                    <Avatar>
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                                    </Avatar>
                                    <div>
                                        <h4 className="font-semibold">{user?.fullname}</h4>
                                        <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                                    </div>
                                </div>

                                <div className="space-y-2 text-gray-700">
                                    {user?.role === 'student' && (
                                        <div className="flex items-center gap-2">
                                            <User2 size={18} />
                                            <Link to="/profile">
                                                <Button variant="link" size="sm">View Profile</Button>
                                            </Link>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2">
                                        <LogOut size={18} />
                                        <Button onClick={logoutHandler} variant="link" size="sm">Logout</Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>

                {/* Mobile Hamburger */}
                <div className="md:hidden">
                    <Menu size={24} className="cursor-pointer" onClick={() => setMenuOpen(!menuOpen)} />
                </div>
            </div>

            {/* Mobile Dropdown */}
            {menuOpen && (
                <div className="md:hidden px-4 pb-4 space-y-3 text-gray-700 font-medium animate-slide-down">
                    {user && user.role === 'recruiter' ? (
                        <>
                            <Link to="/admin/companies">Companies</Link>
                            <Link to="/admin/jobs">Jobs</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/">Home</Link>
                            <Link to="/jobs">Jobs</Link>
                            <Link to="/browse">Browse</Link>
                            <a
                                href="http://43.204.215.14:8501/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Resume App
                            </a>
                        </>
                    )}
                    {!user ? (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </>
                    ) : (
                        <>
                            {user.role === 'student' && <Link to="/profile">View Profile</Link>}
                            <button onClick={logoutHandler}>Logout</button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
