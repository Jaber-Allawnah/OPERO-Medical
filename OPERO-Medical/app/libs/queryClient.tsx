import {QueryClient} from "@tanstack/query-core";

export const queryClient=new QueryClient({
        defaultOptions:{
            queries:{
                retry:2,
                staleTime:2*60*1000
            }
        }
    }
);