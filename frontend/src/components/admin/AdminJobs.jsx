import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div style={{ backgroundColor: "#FFFFFF", minHeight: "100vh" }}>
      <Navbar />
      <div className='max-w-6xl mx-auto my-10' style={{ color: "#043873" }}>
        <div className='flex items-center justify-between my-5'>
          <Input
            className="w-fit"
            placeholder="Filter by name, role"
            onChange={(e) => setInput(e.target.value)}
            style={{
              borderColor: "#4F9CF9",
              color: "#043873",
              backgroundColor: "#FFFFFF",
            }}
          />
          <Button
            onClick={() => navigate("/admin/jobs/create")}
            style={{
              backgroundColor: "#4F9CF9",
              color: "#FFFFFF",
              borderColor: "#4F9CF9",
            }}
          >
            New Jobs
          </Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  )
}

export default AdminJobs
