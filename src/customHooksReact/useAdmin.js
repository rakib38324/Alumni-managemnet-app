import { useEffect, useState } from "react";
import { useGetIsAdminQuery } from "../features/Api/apiSlice";

const useAdmin = (email) => {
  const { data, isLoading, isError } = useGetIsAdminQuery();
  const [isAdmin, setAdmin] = useState(false);
  const [isAdminLoading, setUseAdminLoading] = useState(true);

  useEffect(() => {
    if (email) {
      console.log(data);

      if (!isLoading && !isError) {
        setAdmin(data.isAdmin);
        setUseAdminLoading(false);
      }
    }
  }, [data, email, isError, isLoading]);

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
