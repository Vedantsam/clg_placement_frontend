import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, clearFilters } from '@/redux/jobSlice';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    filterType: "Salary",
    array: ["0-40", "40-100", "100-500"],
  },
];

const FilterCard = () => {
  const dispatch = useDispatch();
  const { filters = { location: "", industry: "", salary: "" } } = useSelector((store) => store.job);
  const [selectedFilters, setSelectedFilters] = useState({
    location: "",
    industry: "",
    salary: "",
  });

  // Sync local state if redux filters change externally
  useEffect(() => {
    if (filters) {
      setSelectedFilters(filters);
    }
  }, [filters]);

  const handleFilterChange = (filterType, value) => {
    const key = filterType.toLowerCase();
    const newFilters = {
      ...selectedFilters,
      [key]: selectedFilters[key] === value ? "" : value,
    };
    setSelectedFilters(newFilters);
    dispatch(setFilters(newFilters));
  };

  const handleClearFilters = () => {
    setSelectedFilters({ location: "", industry: "", salary: "" });
    dispatch(clearFilters());
  };

  const isClearDisabled =
    !selectedFilters?.location && !selectedFilters?.industry && !selectedFilters?.salary;

  return (
    <motion.div
      className="w-full bg-white p-4 rounded-md shadow-md"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-3">
        <h1 className="font-bold text-lg">Filter Jobs</h1>
        <Button
          variant="outline"
          size="sm"
          onClick={handleClearFilters}
          disabled={isClearDisabled}
          className={`${isClearDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Clear Filters
        </Button>
      </div>
      <hr />

      {filterData.map((data, index) => (
        <div key={index} className="mt-5">
          <h1 className="font-semibold text-md">{data.filterType}</h1>
          <RadioGroup
            value={selectedFilters[data?.filterType.toLowerCase()] || ""}
            onValueChange={(value) => handleFilterChange(data.filterType, value)}
            className="mt-3 space-y-2"
          >
            {data?.array.map((item, idx) => {
              const itemId = `filter-${index}-${idx}`;
              const isSelected = selectedFilters[data?.filterType.toLowerCase()] === item;

              return (
                <div
                  key={idx}
                  className={`flex items-center space-x-2 py-1 px-2 rounded cursor-pointer transition 
                    ${isSelected ? 'bg-purple-100 text-purple-700 font-semibold' : 'hover:bg-gray-100'}`}
                  onClick={() => handleFilterChange(data?.filterType, item)}
                >
                  <RadioGroupItem
                    value={item}
                    id={itemId}
                    className="peer hidden"
                  />
                  <Label htmlFor={itemId} className="cursor-pointer select-none">
                    {item}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      ))}
    </motion.div>
  );
};

export default FilterCard;