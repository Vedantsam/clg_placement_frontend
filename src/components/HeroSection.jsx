import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        if (query.trim()) {
            dispatch(setSearchedQuery(query.trim()));
            navigate('/browse');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            searchJobHandler();
        }
    };

    return (
        <section className="w-full px-4 py-20 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-8">

                <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="px-4 py-2 rounded-full bg-purple-100 text-[#6A38C2] font-semibold text-sm tracking-wide shadow-sm"
                >
                    🚀 No. 1 Job Hunt Website
                </motion.span>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-800"
                >
                    Search, Apply &<br />
                    Get Your <span className="text-[#6A38C2]">Dream Job</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="text-gray-600 text-base md:text-lg max-w-xl"
                >
                    Find the job you deserve, not just the one you need.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                    className="w-full h-12 max-w-2xl flex flex-col sm:flex-row items-stretch sm:items-center shadow-lg rounded-full border border-gray-300 overflow-hidden bg-white transition-all duration-300"
                >
                    <input
                        type="text"
                        placeholder="Find your dream job"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-grow px-6 py-3 text-sm md:text-base outline-none rounded-l-full"
                    />
                    <Button
                        onClick={searchJobHandler}
                        className="bg-[#6A38C2] h-full hover:bg-[#5a2cab] transition-colors rounded-none sm:rounded-r-full text-white px-6 py-3"
                    >
                        <Search className="w-5 h-5" />
                    </Button>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-sm text-gray-400 mt-2"
                >
                    Start by entering a keyword like “frontend” or “designer”
                </motion.p>
            </div>
        </section>
    );
};

export default HeroSection;
