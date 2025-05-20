import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-5 rounded-xl shadow-md bg-[#FFFFFF] border border-[#E5EAF2] cursor-pointer hover:shadow-lg transition duration-300"
    >
      {/* Company Name */}
      <div>
        <h1 className="font-semibold text-lg text-[#043873]">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>

      {/* Job Title + Description */}
      <div>
        <h1 className="font-bold text-xl my-2 text-[#4F9CF9]">{job?.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-3">{job?.description}</p>
      </div>

      {/* Tags */}
      <div className="flex items-center gap-2 mt-4 flex-wrap">
        <Badge className="text-[#043873] bg-[#FFE492] font-semibold" variant="ghost">
          {job?.position} Position{job?.position > 1 ? 's' : ''}
        </Badge>
        <Badge className="text-[#043873] border-[#4F9CF9] font-semibold" variant="outline">
          {job?.jobType}
        </Badge>
        <Badge className="text-white bg-[#4F9CF9] font-semibold">
          ₹ {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
