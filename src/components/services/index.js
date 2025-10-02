import { useEffect, useState } from "react";
import api from "./api";
export default function useServicesFetch(url) {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        api(url)
            .then((response) => {
                console.log("data from api Call ", response);
                setData(response.data ? response.data : response);
            })
            .catch((error) => console.error("Error fetching data:", error), setError(error))
            .finally(() => setLoading(false));
    }, [url]);
    return { data, loading };
}