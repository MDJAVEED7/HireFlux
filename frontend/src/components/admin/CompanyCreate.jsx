import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("");
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto'>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl text-[#043873]'>Your Company Name</h1>
                    <p className='text-[#4F4F4F]'>What would you like to give your company name? you can change this later.</p>
                </div>

                <Label className="text-[#043873]">Company Name</Label>
                <Input
                    type="text"
                    className="my-2 border border-gray-300 focus:border-[#4F9CF9] outline-none"
                    placeholder="JobHunt, Microsoft etc."
                    onChange={(e) => setCompanyName(e.target.value)}
                />
                <div className='flex items-center gap-2 my-10'>
                    <Button variant="outline" className="border-[#4F9CF9] text-[#4F9CF9] hover:bg-[#4F9CF9]/10" onClick={() => navigate("/admin/companies")}>
                        Cancel
                    </Button>
                    <Button className="bg-[#4F9CF9] hover:bg-[#3a7bd5] text-white" onClick={registerNewCompany}>
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate
