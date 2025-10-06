import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const [isApplied, setIsApplied] = useState(false);

  const { id: jobId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some((application) => application.applicant === user?._id)
          );
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load job details.");
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...(singleJob.applications || []), { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Something went wrong.");
    }
  };

  const formattedDate = singleJob?.createdAt
    ? new Date(singleJob.createdAt).toLocaleDateString()
    : "";

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">{singleJob?.title}</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className="text-blue-700 font-bold" variant="ghost">
              {singleJob?.position} Positions
            </Badge>
            <Badge className="text-[#F83002] font-bold" variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className="text-[#7209b7] font-bold" variant="ghost">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'
          }`}
        >
          {isApplied ? 'Already Applied' : 'Apply Now'}
        </Button>
      </div>

      <h1 className="border-b-2 border-b-gray-300 font-medium py-4">Job Description</h1>
      <div className="my-4 space-y-2">
        <h1 className="font-bold">
          Role: <span className="pl-4 font-normal text-gray-800">{singleJob?.title}</span>
        </h1>
        <h1 className="font-bold">
          Location: <span className="pl-4 font-normal text-gray-800">{singleJob?.location}</span>
        </h1>
        <h1 className="font-bold">
          Description: <span className="pl-4 font-normal text-gray-800">{singleJob?.description}</span>
        </h1>
        <h1 className="font-bold">
          Experience: <span className="pl-4 font-normal text-gray-800">{singleJob?.experience} yrs</span>
        </h1>
        <h1 className="font-bold">
          Salary: <span className="pl-4 font-normal text-gray-800">{singleJob?.salary} LPA</span>
        </h1>
        <h1 className="font-bold">
          Total Applicants: <span className="pl-4 font-normal text-gray-800">{singleJob?.applications?.length || 0}</span>
        </h1>
        <h1 className="font-bold">
          Posted Date: <span className="pl-4 font-normal text-gray-800">{formattedDate}</span>
        </h1>

        {singleJob?.skills?.length > 0 && (
          <div className="mt-6">
            <h1 className="font-bold mb-3">Required Skills:</h1>
            <ul className="list-disc pl-8">
              {singleJob.skills.map((skill, index) => (
                <li key={index} className="text-gray-800 mb-2">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Applicants List */}
      {singleJob?.applications?.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-bold mb-4">Applicants List</h2>
          <div className="space-y-3">
            {singleJob.applications.map((application, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg shadow-sm bg-gray-50 flex items-center justify-between"
              >
                <p className="font-medium">{application?.applicant?.fullname || 'Anonymous'}</p>
                {application?.applicant?.profile?.resume ? (
                  <a
                    href={application.applicant.profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-sm"
                  >
                    View Resume
                  </a>
                ) : (
                  <span className="text-gray-400 italic text-sm">No resume uploaded</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDescription;
