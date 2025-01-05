import { Outlet } from "react-router-dom";
import { self } from "../http/api";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../store";
import { useEffect } from "react";
const getSelf = async () => {
  const { data } = await self();
  return data.data;
};
export const Root = () => {
  const { setUser } = useAuthStore();
  const { data, isLoading } = useQuery({
    queryKey: ["self"],
    queryFn: getSelf,
    retry: 1,
  });
  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);
  if (isLoading) return <div>Loading...</div>;
  console.log("root", data);

  return <Outlet />;
};
