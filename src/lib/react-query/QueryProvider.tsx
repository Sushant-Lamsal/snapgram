//we have to create our own context to use react-query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
const queryClient = new QueryClient();
export const QueryProvider = ({children} : {children: React.ReactNode}) => {
  return (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
  )
}

