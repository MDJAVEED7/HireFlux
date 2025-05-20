import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl text-[#043873]'>{user?.fullname}</h1>
                            <p className='text-[#4F9CF9]'>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right border-[#4F9CF9] text-[#4F9CF9]" variant="outline">
                        <Pen />
                    </Button>
                </div>

                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2 text-[#043873]'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2 text-[#043873]'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>

                <div className='my-5'>
                    <h1 className='text-[#7209b7] font-semibold mb-2'>Skills</h1>
                    <div className='flex items-center gap-1'>
                        {
                            user?.profile?.skills.length !== 0 
                            ? user?.profile?.skills.map((item, index) => (
                                <Badge key={index} className="bg-[#FFE492] text-[#043873] font-semibold">{item}</Badge>
                              ))
                            : <span className='text-[#043873]'>NA</span>
                        }
                    </div>
                </div>

                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold text-[#043873]">Resume</Label>
                    {
                        isResume 
                        ? <a target='_blank' rel="noopener noreferrer" href={user?.profile?.resume} className='text-[#4F9CF9] w-full hover:underline cursor-pointer'>
                            {user?.profile?.resumeOriginalName}
                          </a>
                        : <span className='text-[#043873]'>NA</span>
                    }
                </div>
            </div>

            <div className='max-w-4xl mx-auto bg-white rounded-2xl p-6'>
                <h1 className='font-bold text-lg text-[#4F9CF9] mb-5'>Applied Jobs</h1>
                {/* Applied Job Table */}
                <AppliedJobTable />
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile
