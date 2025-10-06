import React, { useEffect, useRef } from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { motion } from 'framer-motion';

const categories = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer",
    "Product Manager",
    "Mobile Developer",
    "DevOps Engineer",
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const carouselRef = useRef(null);

    const searchJobHandler = (query) => {
        if (query.trim()) {
            dispatch(setSearchedQuery(query.trim()));
            navigate("/browse");
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (carouselRef.current) {
                const nextButton = carouselRef.current.querySelector('[data-carousel-next]');
                nextButton?.click();
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div ref={carouselRef} className="relative w-full px-4  bg-gradient-to-b from-gray-50 to-white">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center text-3xl md:text-4xl font-bold mb-10 text-gray-800"
            >
                🔍 Explore by Category
            </motion.h2>

            <Carousel className="max-w-6xl mx-auto">
                <CarouselContent className="gap-2 p-4">
                    {categories.map((cat, index) => (
                        <CarouselItem
                            key={index}
                            className="flex justify-center basis-2/3 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ scale: 1.08 }}
                            >
                                <Button
                                    onClick={() => searchJobHandler(cat)}
                                    variant="outline"
                                    className="rounded-full px-6 py-3 border-gray-300 text-gray-700 hover:bg-[#6A38C2] hover:text-white transition-all duration-300 shadow hover:shadow-md"
                                >
                                    {cat}
                                </Button>
                            </motion.div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious data-carousel-prev />
                <CarouselNext data-carousel-next />
            </Carousel>
        </div>
    );
};

export default CategoryCarousel;
