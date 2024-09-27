import './App.css';
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";


const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables.");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);  // Add loading state
  const [error, setError] = useState(null);     // Add error state

  useEffect(() => {
    async function fetchCountries() {
      try {
        const { data, error } = await supabase.from('countries').select();
        if (error) {
          throw error; // Re-throw the error to catch it
        }
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
        setError(error); // Set the error state
      } finally {
        setLoading(false); // Set loading to false regardless of success/failure
      }
    }

    fetchCountries();
  }, []);

  if (loading) {
    return <p>Loading...</p>;  // Display loading message
  }

  if (error) {
    return <p>Error: {error.message}</p>; // Display error message
  }

  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name}>{country.name}</li>
      ))}
    </ul>
  );
}

export default App;