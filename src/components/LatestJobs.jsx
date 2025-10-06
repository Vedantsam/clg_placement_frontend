import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
};

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);

    return (
        <section className="max-w-7xl mx-auto px-4 my-20">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl sm:text-4xl font-bold text-center mb-10"
            >
                <span className="text-[#6A38C2]">Latest & Top</span> Job Openings
            </motion.h1>

            {allJobs.length <= 0 ? (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-gray-500 text-lg"
                >
                    🚫 No jobs available right now.
                </motion.p>
            ) : (
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                >
                    {allJobs.slice(0, 6).map((job) => (
                        <motion.div key={job._id} variants={cardVariants}>
                            <LatestJobCards job={job} />
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </section>
    );
};

export default LatestJobs;
