// import React from 'react';
// import { Badge } from './ui/badge';
// import { useNavigate } from 'react-router-dom';

// const LatestJobCards = ({ job }) => {
//     const navigate = useNavigate();

//     return (
//         <div
//             onClick={() => navigate(`/description/${job._id}`)}
//             className="p-5 rounded-xl shadow-md border border-gray-200 bg-white cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-lg duration-300"
//         >
//             <div className="mb-2">
//                 <h2 className="font-semibold text-lg text-gray-800">{job?.company?.name}</h2>
//                 <p className="text-sm text-gray-500">📍 India</p>
//             </div>

//             <div className="my-3">
//                 <h3 className="text-xl font-bold text-[#6A38C2] mb-1">{job?.title}</h3>
//                 <p className="text-sm text-gray-600 line-clamp-3">
//                     {job?.description}
//                 </p>
//             </div>

//             <div className="flex flex-wrap gap-2 mt-4">
//                 <Badge className="text-blue-700 font-medium bg-blue-50">{job?.position} Positions</Badge>
//                 <Badge className="text-[#F83002] font-medium bg-red-50">{job?.jobType}</Badge>
//                 <Badge className="text-[#7209b7] font-medium bg-purple-50">{job?.salary} LPA</Badge>
//             </div>
//         </div>
//     );
// };

// export default LatestJobCards;
import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            onClick={() => navigate(`/description/${job._id}`)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="p-6 rounded-2xl shadow-sm border border-gray-200 bg-white cursor-pointer hover:shadow-lg transition-all duration-300"
        >
            {/* Company Name */}
            <div className="mb-3">
                <h2 className="font-semibold text-lg text-gray-800">{job?.company?.name}</h2>
                <p className="text-sm text-gray-500">📍 India</p>
            </div>

            {/* Job Title & Description */}
            <div className="mb-4">
                <h3 className="text-xl font-bold text-[#6A38C2] mb-1">{job?.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-3">{job?.description}</p>
            </div>

            {/* Job Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
                <Badge className="bg-blue-50 text-blue-700 font-medium shadow-sm">
                    {job?.position} Position{job?.position > 1 ? 's' : ''}
                </Badge>
                <Badge className="bg-red-50 text-[#F83002] font-medium shadow-sm">
                    {job?.jobType}
                </Badge>
                <Badge className="bg-purple-50 text-[#7209b7] font-medium shadow-sm">
                    ₹ {job?.salary} LPA
                </Badge>
            </div>
        </motion.div>
    );
};

export default LatestJobCards;
