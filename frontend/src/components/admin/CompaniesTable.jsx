import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText])

    return (
        <div>
            <Table>
                <TableCaption className="text-[#FFE492] font-semibold">
                    A list of your recent registered companies
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-[#043873]">Logo</TableHead>
                        <TableHead className="text-[#043873]">Name</TableHead>
                        <TableHead className="text-[#043873]">Date</TableHead>
                        <TableHead className="text-[#043873] text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCompany?.map((company) => (
                            <tr key={company._id} className="hover:bg-[#FFE492]/20 transition-colors">
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={company.logo} />
                                    </Avatar>
                                </TableCell>
                                <TableCell className="text-[#043873]">{company.name}</TableCell>
                                <TableCell className="text-[#043873]">{company.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer text-[#4F9CF9]">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="hover:text-[#043873]" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32">
                                            <div
                                                onClick={() => navigate(`/admin/companies/${company._id}`)}
                                                className='flex items-center gap-2 w-fit cursor-pointer text-[#4F9CF9] hover:text-[#043873]'
                                            >
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
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

export default CompaniesTable
