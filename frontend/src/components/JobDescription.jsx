import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '@/redux/jobSlice';
import { toast } from 'sonner';

const JobDescription = () => {
  const { singleJob } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const { id: jobId } = useParams();

  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          const jobData = res.data.job;
          dispatch(setSingleJob(jobData));
          setIsApplied(jobData.applications?.some(app => app.applicant === user?._id) || false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setIsApplied(true);
        const updatedJob = {
          ...singleJob,
          applications: [...(singleJob.applications || []), { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-10 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-bold text-2xl text-[#043873]">{singleJob?.title}</h1>
          <div className="flex items-center flex-wrap gap-2 mt-3">
            <Badge className="bg-[#FFE492] text-[#043873] font-semibold" variant="ghost">
              {singleJob?.position} Position{singleJob?.position > 1 ? 's' : ''}
            </Badge>
            <Badge className="bg-[#4F9CF9] text-white font-semibold" variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className="bg-[#043873] text-white font-semibold" variant="ghost">
              ₹ {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>

        <Button
          onClick={applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg px-6 py-2 text-white transition-colors ${
            isApplied
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#4F9CF9] hover:bg-[#3787e0]'
          }`}
        >
          {isApplied ? 'Already Applied' : 'Apply Now'}
        </Button>
      </div>

      {/* Divider */}
      <h2 className="border-b-2 border-[#FFE492] font-medium py-3 text-[#043873]">Job Description</h2>

      {/* Details */}
      <div className="mt-4 text-sm text-[#043873] space-y-2">
        <p><span className="font-bold">Role:</span> <span className="pl-2">{singleJob?.title}</span></p>
        <p><span className="font-bold">Location:</span> <span className="pl-2">{singleJob?.location}</span></p>
        <p><span className="font-bold">Description:</span> <span className="pl-2">{singleJob?.description}</span></p>
        <p><span className="font-bold">Experience:</span> <span className="pl-2">{singleJob?.experience} yrs</span></p>
        <p><span className="font-bold">Salary:</span> <span className="pl-2">₹ {singleJob?.salary} LPA</span></p>
        <p><span className="font-bold">Total Applicants:</span> <span className="pl-2">{singleJob?.applications?.length || 0}</span></p>
        <p><span className="font-bold">Posted Date:</span> <span className="pl-2">{singleJob?.createdAt?.split("T")[0]}</span></p>
      </div>
    </div>
  );
};

export default JobDescription;
