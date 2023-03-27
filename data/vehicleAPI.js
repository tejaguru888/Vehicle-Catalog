const BASE_URL = 'https://vpic.nhtsa.dot.gov/api/vehicles';

export const getAllManufacturers = async () => {
  const response = await fetch(`${BASE_URL}/getallmanufacturers?format=json&page=2`);
  const data = await response.json();
  return data.Results;
};

export const getManufacturerDetails = async (manufacturerId) => {
  const response = await fetch(`${BASE_URL}/getmanufacturerdetails/${manufacturerId}?format=json`);
  const data = await response.json();
  return data.Results[0];
};
