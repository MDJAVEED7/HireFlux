import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
  }
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    if (selectedValue) {
      dispatch(setSearchedQuery(selectedValue));
    }
  }, [selectedValue]);

  return (
    <div className="w-full bg-white p-5 rounded-lg shadow-lg">
      <h1 className="text-xl font-bold text-[#043873] mb-4">Filter Jobs</h1>
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((section, index) => (
          <div key={section.filterType} className="mb-6">
            <h2 className="text-md font-semibold text-[#4F9CF9] mb-2">{section.filterType}</h2>
            {section.array.map((item, idx) => {
              const itemId = `id-${index}-${idx}`;
              return (
                <div key={itemId} className="flex items-center space-x-2 py-1">
                  <RadioGroupItem
                    value={item}
                    id={itemId}
                    className="data-[state=checked]:bg-[#4F9CF9] data-[state=checked]:border-[#043873]"
                  />
                  <Label htmlFor={itemId} className="text-sm text-[#043873] cursor-pointer hover:text-[#4F9CF9] transition">
                    {item}
                  </Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
