import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => { 
    const {allAdminJobs, searchJobByText} = useSelector(store=>store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(()=>{ 
        const filteredJobs = allAdminJobs.filter((job)=>{
            if(!searchJobByText){
                return true;
            }
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) 
              || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJobs(filteredJobs);
    },[allAdminJobs,searchJobByText])

    return (
        <div>
            <Table style={{ backgroundColor: "#FFFFFF", color: "#043873" }}>
                <TableCaption style={{ color: "#043873" }}>
                    A list of your recent posted jobs
                </TableCaption>
                <TableHeader>
                    <TableRow style={{ borderBottom: `2px solid #4F9CF9` }}>
                        <TableHead style={{ color: "#4F9CF9" }}>Company Name</TableHead>
                        <TableHead style={{ color: "#4F9CF9" }}>Role</TableHead>
                        <TableHead style={{ color: "#4F9CF9" }}>Date</TableHead>
                        <TableHead className="text-right" style={{ color: "#4F9CF9" }}>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJobs?.map((job) => (
                            <tr key={job._id} style={{ borderBottom: `1px solid #FFE492` }}>
                                <TableCell style={{ color: "#043873" }}>{job?.company?.name}</TableCell>
                                <TableCell style={{ color: "#043873" }}>{job?.title}</TableCell>
                                <TableCell style={{ color: "#043873" }}>{job?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer" style={{ color: "#4F9CF9" }}>
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal color="#4F9CF9" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32" style={{ backgroundColor: "#FFE492", color: "#043873" }}>
                                            <div onClick={()=> navigate(`/admin/companies/${job._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4' color="#043873" />
                                                <span>Edit</span>
                                            </div>
                                            <div onClick={()=> navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                                                <Eye className='w-4' color="#043873" />
                                                <span>Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable
