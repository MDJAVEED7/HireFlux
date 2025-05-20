import React from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const now = new Date();
    const diff = now - createdAt;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-6 rounded-xl shadow-md bg-white border border-[#FFE492] hover:shadow-lg transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-[#043873]">
          {daysAgoFunction(job?.createdAt) === 0 ? 'Today' : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full border-[#4F9CF9]" size="icon">
          <Bookmark className="h-4 w-4 text-[#4F9CF9]" />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-3 mb-4">
        <Avatar>
          <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
          <AvatarFallback>{job?.company?.name?.[0] || 'C'}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold text-[#043873]">{job?.company?.name}</h2>
          <p className="text-sm text-[#4F9CF9]">India</p>
        </div>
      </div>

      {/* Job Details */}
      <div className="mb-4">
        <h1 className="font-bold text-xl text-[#4F9CF9] mb-2">{job?.title}</h1>
        <p className="text-sm text-[#043873] line-clamp-3">{job?.description}</p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge className="bg-[#FFE492] text-[#043873] font-semibold" variant="ghost">
          {job?.position} Position{job?.position > 1 ? 's' : ''}
        </Badge>
        <Badge className="bg-[#4F9CF9] text-white font-semibold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="bg-[#043873] text-white font-semibold" variant="ghost">
          ₹ {job?.salary} LPA
        </Badge>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="border-[#4F9CF9] text-[#4F9CF9] hover:bg-[#EFF7FF]"
        >
          Details
        </Button>
        <Button className="bg-[#4F9CF9] hover:bg-[#3787e0] text-white">
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
