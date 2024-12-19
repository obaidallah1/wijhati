interface AddressObj {
    street1: string;
    street2?: string;
    city: string;
    state?: string;
    country: string;
    postalcode?: string;
    address_string: string;
  }
interface location {
    location_id: string;
    name: string;
    address_obj: AddressObj;
  }
  
export  async function searchLocations(searchQuery: string ): Promise<location[]> {
    const tripadvisorAPI= process.env.NEXT_PUBLIC_TRIPADVISOR_API_KEY;
    const searchQueryString = searchQuery;
  const response = await fetch(
    `https://api.content.tripadvisor.com/api/v1/location/search?searchQuery=${searchQueryString}&language=ar&key=${tripadvisorAPI}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data || [];
}