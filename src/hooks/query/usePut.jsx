import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosCommon from "../fetch/useAxiosCommon";

export const usePutStaffData = () => {
  const axiosCommon = useAxiosCommon();
  const queryClient = useQueryClient();

  const putStaff = async (formData) => {
    try {
      const { data } = await axiosCommon.put("/staff", formData);
      return data;
    } catch (err) {
      throw new Error(err.response.data.message || "Failed to fetch get staff");
    }
  };

  const { mutateAsync: staffAsync } = useMutation({
    mutationFn: putStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff"] });
    },
  });

  return staffAsync;
};
