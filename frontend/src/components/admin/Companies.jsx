import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input]);

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    <Input
                        className="w-fit border border-[#4F9CF9] focus:border-[#4F9CF9] text-[#043873]"
                        placeholder="Filter by name"
                        onChange={(e) => setInput(e.target.value)}
                        style={{ color: '#043873' }}
                    />
                    <Button
                        onClick={() => navigate("/admin/companies/create")}
                        style={{
                            backgroundColor: '#4F9CF9',
                            color: '#FFFFFF',
                            borderColor: '#4F9CF9',
                        }}
                        className="hover:bg-[#043873]"
                    >
                        New Company
                    </Button>
                </div>
                <CompaniesTable />
            </div>
        </div>
    )
}

export default Companies
