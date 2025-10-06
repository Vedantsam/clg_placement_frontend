// import React, { useEffect } from 'react'
// import Navbar from './shared/Navbar'
// import Job from './Job';
// import { useDispatch, useSelector } from 'react-redux';
// import { setSearchedQuery } from '@/redux/jobSlice';
// import useGetAllJobs from '@/hooks/useGetAllJobs';

// // const randomJobs = [1, 2,45];

// const Browse = () => {
//     useGetAllJobs();
//     const {allJobs} = useSelector(store=>store.job);
//     const dispatch = useDispatch();
//     useEffect(()=>{
//         return ()=>{
//             dispatch(setSearchedQuery(""));
//         }
//     },[])
//     return (
//         <div>
//             <Navbar />
//             <div className='max-w-7xl mx-auto my-10'>
//                 <h1 className='font-bold text-xl my-10'>Search Results ({allJobs.length})</h1>
//                 <div className='grid grid-cols-3 gap-4'>
//                     {
//                         allJobs.map((job) => {
//                             return (
//                                 <Job key={job._id} job={job}/>
//                             )
//                         })
//                     }
//                 </div>

//             </div>
//         </div>
//     )
// }

// export default Browser
import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const Browse = () => {
  useGetAllJobs();

  const dispatch = useDispatch();
  const { allJobs, loading } = useSelector(store => store.job);

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(''));
    };
  }, [dispatch]);

  const NoJobs = () => (
    <div className="flex flex-col items-center justify-center h-64 text-center text-gray-600">
      <AlertCircle className="w-12 h-12 mb-3" />
      <p>No jobs available at the moment. Please check back later.</p>
    </div>
  );

  const LoadingSpinner = () => (
    <div className="flex justify-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#7209b7] border-solid"></div>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-4">
        <h1 className="font-bold text-xl mb-10">
          Search Results ({allJobs.length})
        </h1>

        {loading ? (
          <LoadingSpinner />
        ) : allJobs.length === 0 ? (
          <NoJobs />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <AnimatePresence>
              {allJobs.map(job => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Job job={job} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
