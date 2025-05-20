import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div>
            <Table>
                <TableCaption className="text-[#043873] font-semibold">A list of your recent applied user</TableCaption>
                <TableHeader>
                    <TableRow style={{ color: '#043873' }}>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.applications?.map((item) => (
                            <tr key={item._id} style={{ color: '#043873' }}>
                                <TableCell>{item?.applicant?.fullname}</TableCell>
                                <TableCell>{item?.applicant?.email}</TableCell>
                                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell>
                                    {
                                        item.applicant?.profile?.resume ? (
                                            <a
                                                className="cursor-pointer"
                                                href={item?.applicant?.profile?.resume}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ color: '#4F9CF9', textDecoration: 'underline' }}
                                            >
                                                {item?.applicant?.profile?.resumeOriginalName}
                                            </a>
                                        ) : <span>NA</span>
                                    }
                                </TableCell>
                                <TableCell>{item?.applicant.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="float-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal color="#4F9CF9" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32 bg-[#FFE492] text-[#043873]">
                                            {
                                                shortlistingStatus.map((status, index) => (
                                                    <div
                                                        onClick={() => statusHandler(status, item?._id)}
                                                        key={index}
                                                        className='flex w-fit items-center my-2 cursor-pointer hover:bg-[#4F9CF9] hover:text-white rounded px-2 py-1'
                                                    >
                                                        <span>{status}</span>
                                                    </div>
                                                ))
                                            }
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

export default ApplicantsTable
