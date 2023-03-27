import React, { useState } from "react";
import { getManufacturerDetails } from "../../data/vehicleAPI";
import '../../index.css'

const CompanyRow = ({ manufacturer }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const [manufacturerDetails, setManufacturerDetails] = useState(null)

    const handleRowClick = async () => {
        const details = await getManufacturerDetails(manufacturer.Mfr_ID);
        setManufacturerDetails(details)
        setIsPopupOpen(true)
    }

    const handlePopupClose = () => {
        setIsPopupOpen(false)
    }

    return (
        <>
        <tr onClick={handleRowClick}>
            <td>{manufacturer.Mfr_Name}</td>
         <td>{manufacturer.Country}</td>
         <td>
           {manufacturer.VehicleTypes.map((vehicleType, index) => (
             <span key={index}>
               {vehicleType.Name}
               {index !== manufacturer.VehicleTypes.length - 1 && ', '}
             </span>
           ))}
         </td>
        </tr>
        {isPopupOpen && (
            <div className="popup">
                <div className="popup-content">
                    <span className="close" onClick={handlePopupClose}>X</span>
                    <h2>{manufacturerDetails?.Mfr_Name}</h2>
                    <p> 
                        {manufacturerDetails?.PrincipalFirstName}
                        ({manufacturerDetails?.PrincipalPosition}):{''}
                    </p>
                    <p>{manufacturerDetails?.Address}</p>
                    <p>{manufacturerDetails?.StateProvince}</p>
                </div>
            </div>
        )}
        </>
        
    )
}

export default CompanyRow;

