import { useQuery, QueryCache, QueryClient } from "react-query";
import { Boxer } from "../constants/BoxerModel";

const queryCache = new QueryCache({
  onError: (error) => {
    console.log(error)
  },
  onSuccess: (data) => {
    console.log(data)
  },
  // onSettled: (data, error) => {
  //   console.log(data, error)
  // },
})
const queryClient = new QueryClient({ queryCache });

const useSharedState = (key: string, initialValue: any) => {
  /*
    Treat this as a "global" state store, utilising the Query Cache as the store.
  */

    const { data: state } = useQuery(key, () => queryCache.find(key), {
      initialData: initialValue
    });
    const setState = (value: any) => queryClient.setQueryData(key, value);
  
    return [state, setState];
  };

  export { queryCache, queryClient, useSharedState };