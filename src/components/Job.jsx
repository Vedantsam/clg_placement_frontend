// import React from 'react'
// import { Button } from './ui/button'
// import { Bookmark } from 'lucide-react'
// import { Avatar, AvatarImage } from './ui/avatar'
// import { Badge } from './ui/badge'
// import { useNavigate } from 'react-router-dom'

// const Job = ({job}) => {
//     const navigate = useNavigate();
//     // const jobId = "lsekdhjgdsnfvsdkjf";

//     const daysAgoFunction = (mongodbTime) => {
//         const createdAt = new Date(mongodbTime);
//         const currentTime = new Date();
//         const timeDifference = currentTime - createdAt;
//         return Math.floor(timeDifference/(1000*24*60*60));
//     }
    
//     return (
//         <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
//             <div className='flex items-center justify-between'>
//                 <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
//                 <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>
//             </div>

//             <div className='flex items-center gap-2 my-2'>
//                 <Button className="p-6" variant="outline" size="icon">
//                     <Avatar>
//                         <AvatarImage src={job?.company?.logo} />
//                     </Avatar>
//                 </Button>
//                 <div>
//                     <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
//                     <p className='text-sm text-gray-500'>India</p>
//                 </div>
//             </div>

//             <div>
//                 <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
//                 <p className='text-sm text-gray-600'>{job?.description}</p>
//             </div>
//             <div className='flex items-center gap-2 mt-4'>
//                 <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
//                 <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
//                 <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary}LPA</Badge>
//             </div>
//             <div className='flex items-center gap-4 mt-4'>
//                 <Button onClick={()=> navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
//                 <Button className="bg-[#7209b7]">Save For Later</Button>
//             </div>
//         </div>
//     )
// }

// export default Job

import React from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    if (daysAgo === 0) return "Today";
    if (daysAgo === 1) return "1 day ago";
    return `${daysAgo} days ago`;
  };

  return (
    <div
      className="p-5 rounded-md shadow-xl bg-white border border-gray-100
                 hover:shadow-2xl hover:-translate-y-1 transition-transform duration-300
                 flex flex-col justify-between"
      role="article"
      aria-label={`Job posting for ${job?.title} at ${job?.company?.name}`}
    >
      {/* Header: Date + Bookmark */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-gray-500 select-none">{daysAgoFunction(job?.createdAt)}</p>
        <Button
          variant="outline"
          className="rounded-full p-2"
          size="icon"
          aria-label="Save job"
          title="Save job"
        >
          <Bookmark className="text-gray-600 hover:text-[#7209b7] transition-colors duration-200" />
        </Button>
      </div>

      {/* Company info */}
      <div className="flex items-center gap-3 mb-4">
        <Button
          className="p-2"
          variant="outline"
          size="icon"
          aria-label={`View ${job?.company?.name} logo`}
          title={job?.company?.name}
        >
          <Avatar className="w-12 h-12">
            <AvatarImage src={job?.company?.logo} alt={`${job?.company?.name} logo`} />
          </Avatar>
        </Button>
        <div>
          <h2 className="font-semibold text-lg text-gray-800">{job?.company?.name}</h2>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>

      {/* Job title and description */}
      <div className="mb-5">
        <h3 className="font-bold text-xl text-gray-900 mb-2">{job?.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-3">{job?.description}</p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-3 mb-5">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          aria-label={`View details for ${job?.title}`}
          className="flex-1"
        >
          Details
        </Button>
        <Button
          className="bg-[#7209b7] hover:bg-[#5b078b] transition-colors flex-1"
          aria-label={`Save ${job?.title} for later`}
        >
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
