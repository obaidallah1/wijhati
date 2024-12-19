// app/locations/page.tsx
import React, { useEffect, useState } from 'react';

interface Address {
  street1: string;
  city: string;
  state: string;
  country: string;
  postalcode: string;
  address_string: string;
}

interface Location {
  location_id: string;
  name: string;
  address_obj: Address;
}
const locationApi = process.env.NEXT_PUBLIC_TRIPADIVSOR_API_KEY

const Locations: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.content.tripadvisor.com/api/v1/location/search?searchQuery=yemen&category=restaurants&language=en&key='); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setLocations(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Locations</h1>
      <ul>
        {locations.map(location => (
          <li key={location.location_id}>
            <h2>{location.name}</h2>
            <p>Address: {location.address_obj.address_string}</p>
            <p>City: {location.address_obj.city}</p>
            <p>State: {location.address_obj.state}</p>
            <p>Country: {location.address_obj.country}</p>
            <p>Postal Code: {location.address_obj.postalcode}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Locations;