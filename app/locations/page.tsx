import {searchLocations} from "@/actions/locations";
import { use } from "react";

export default function locations() {
  const locations = use(searchLocations("yemen"));

  return (
    <div className="container">
      <h1>Search Results:</h1>
      {locations.length > 0 ? (
        <ul >
          {locations.map((location) => (
            <li key={location.location_id} >
              <h2>{location.name}</h2>
              <p>
                <strong>Address:</strong> {location.address_obj.address_string}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No locations found.</p>
      )}
    </div>
  );
}
