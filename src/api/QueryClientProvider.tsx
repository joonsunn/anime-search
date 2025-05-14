import { QueryClient, QueryClientProvider as TanstackQueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

const QueryClientProvider = ({ children }: { children: React.ReactNode }) => {
  return <TanstackQueryClientProvider client={queryClient}>{children}</TanstackQueryClientProvider>;
};

export { queryClient, QueryClientProvider };
