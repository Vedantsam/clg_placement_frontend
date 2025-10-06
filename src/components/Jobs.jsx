
import React, { useEffect, useState, useMemo } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const Jobs = () => {
  const { allJobs, searchedQuery, filters } = useSelector(store => store.job);

  // useMemo to optimize filtering calculations
  const filterJobs = useMemo(() => {
    let filteredJobs = [...allJobs];

    if (searchedQuery) {
      const searchTerm = searchedQuery.toLowerCase();
      filteredJobs = filteredJobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm)
      );
    }

    if (filters?.location) {
      filteredJobs = filteredJobs.filter(job =>
        job.location.toLowerCase().trim() === filters.location.toLowerCase().trim()
      );
    }

    if (filters?.industry) {
      filteredJobs = filteredJobs.filter(job =>
        job.title.toLowerCase() === filters.industry.toLowerCase()
      );
    }

    if (filters?.salary) {
      const [minSalary, maxSalary] = filters.salary.split('-').map(Number);
      filteredJobs = filteredJobs.filter(job => {
        const jobSalary = Number(job.salary);
        return jobSalary >= minSalary && jobSalary <= maxSalary;
      });
    }

    return filteredJobs;
  }, [allJobs, searchedQuery, filters]);

  const NoJobsFound = () => (
    <div className="flex flex-col items-center justify-center h-[50vh] text-center px-4">
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <AlertCircle className="h-14 w-14 text-gray-400 mb-4" />
      </motion.div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Jobs Found</h2>
      <p className="text-gray-500 max-w-md mx-auto">
        {searchedQuery
          ? `No jobs found matching "${searchedQuery}"`
          : Object.values(filters).some(Boolean)
          ? 'No jobs match your selected filters.'
          : 'There are no jobs available at the moment.'}
      </p>
    </div>
  );

  return (
    <div className=" min-h-screen flex flex-col">
      <Navbar />
      <div className="w-full max-w-7xl mx-auto mt-8 px-4 flex flex-col md:flex-row gap-6">
        {/* Filter sidebar */}
        <aside className="md:w-72 sticky top-24 self-start bg-white shadow-md rounded-md p-4">
          <FilterCard />
        </aside>

        {/* Job listings */}
        <main className="w-full flex-1 h-[88vh] overflow-y-auto pb-6 shadow-inner rounded-md px-2">
          <AnimatePresence>
            {filterJobs.length === 0 ? (
              <NoJobsFound key="no-jobs" />
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                key="jobs-list"
              >
                {filterJobs.map(job => (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Jobs;
