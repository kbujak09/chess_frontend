import { useState, useEffect } from "react";

type useFetchType = {
  url: string,
  options?: RequestInit
}

const useFetch = ({url, options}: useFetchType) => {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(url, options);
        if (!res.ok) {
          throw new Error(`Error: ${res.statusText}`);
        }
        const json = await res.json();
        setData(json);
      }
      catch (err) {
        setError(err as Error);
      }
      finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [url, options]);

  return { data, error, loading }
}

export default useFetch;