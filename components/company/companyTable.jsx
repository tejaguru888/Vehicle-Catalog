import React, { useState, useEffect } from 'react';
import { getAllManufacturers } from '../../data/vehicleAPI';
import CompanyRow from './companyRow';
import '../../App.css'

const CompanyTable = () => {
  const [manufacturers, setManufacturers] = useState([]);
  const [filterByVehicleType, setFilterByVehicleType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchData() {
      const manufacturersData = await getAllManufacturers();
      setManufacturers(manufacturersData);
    }
    fetchData();
  }, []);

  const handleFilterByVehicleTypeChange = (event) => {
    setFilterByVehicleType(event.target.value);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value.toUpperCase());
  };

  
  const filteredManufacturers = manufacturers.filter((manufacturer) => {
    if (!filterByVehicleType && !searchQuery) {
      return true;
    }
    let isMatch = true;
    if (filterByVehicleType) {
      isMatch = manufacturer.VehicleTypes.some((type) => type.Name === filterByVehicleType);
    }
    if (searchQuery) {
        isMatch =
        isMatch &&
        ((manufacturer.Mfr_Name && manufacturer.Mfr_Name.includes(searchQuery)) ||
          (manufacturer.Mfr_Country && manufacturer.Mfr_Country.includes(searchQuery)));
      
    }
    return isMatch;
  });

  return (
    <div className='company-table-container'>
        <h1>VEHICLE MANUFACTURERS</h1>
        <label htmlFor="search-query">Search by Name or Country:</label>
      <input type="text" id="search-query" value={searchQuery} onChange={handleSearchQueryChange} />
      <label htmlFor="vehicle-type-filter">Filter by Vehicle Type:</label>
      <select id="vehicle-type-filter" onChange={handleFilterByVehicleTypeChange}>
        <option value="">All</option>
        {Array.from(new Set(manufacturers.flatMap((manufacturer) => manufacturer.VehicleTypes)))
          .map((vehicleType) => (
            <option key={vehicleType.Name} value={vehicleType.Name}>
              {vehicleType.Name}
            </option>
          ))}
      </select>
      <div className='main'>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {filteredManufacturers.map((manufacturer) => (
            <CompanyRow key={manufacturer.Mfr_ID} manufacturer={manufacturer} />
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default CompanyTable;
