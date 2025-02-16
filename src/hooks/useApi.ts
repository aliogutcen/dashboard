import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  QueryKey,
  InvalidateQueryFilters,
  UseMutationOptions
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

// API Response Type
export interface ApiResponse<T = unknown> {
  token(arg0: string, token: any): unknown;
  data: T;
  status: number;
  message?: string;
}

// API Error Type
export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

// Query Parameters Type
export interface QueryParams {
  [key: string]: string | number | boolean | undefined;
}

// Base API Hook Options
interface BaseApiOptions {
  timeout?: number;
}

// Custom type definition for mutation options
interface MutationOptions<TData = unknown, TError = unknown, TVariables = unknown> extends 
UseMutationOptions<TData, TError, TVariables> {
  timeout?: number;
  invalidateQueries?: InvalidateQueryFilters<unknown>;
}

/**
 * Hook for GET requests
 * @param queryKey - Query key
 * @param fetcher - Data fetching function
 * @param options - Query options
 */
export function useApiQuery<TData, TError = ApiError>(
  queryKey: QueryKey,
  fetcher: () => Promise<AxiosResponse<ApiResponse<TData>>>,
  options?: Omit<UseQueryOptions<ApiResponse<TData>, TError>, 'queryKey' | 'queryFn'> & BaseApiOptions
) {
  return useQuery<ApiResponse<TData>, TError>({
    queryKey,
    queryFn: async () => {
      const response = await fetcher();
      return response.data;
    },
    retry: options?.retry ?? 1,
    retryDelay: options?.retryDelay ?? 1000,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000,   // 10 minutes
    ...options,
  });
}

/**
 * Hook for POST, PUT, DELETE requests
 * @param mutationFn - Mutation function
 * @param options - Mutation options
 */
export function useApiMutation<TData = unknown, TError = unknown, TVariables = unknown>(
  mutationFn: (variables: TVariables) => Promise<AxiosResponse<ApiResponse<TData>>>,
  options?: Omit<MutationOptions<ApiResponse<TData>, TError, TVariables>, 'mutationFn'>
) {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<TData>, TError, TVariables>({
    mutationFn: async (variables) => {
      const response = await mutationFn(variables);
      return response.data;
    },
    retry: options?.retry ?? 0,
    retryDelay: options?.retryDelay ?? 1000,
    ...options,
    onSuccess: (data, variables, context) => {
      // Invalidate related queries by default
      if (options?.invalidateQueries) {
        queryClient.invalidateQueries(options.invalidateQueries);
      }
      // Call user-defined onSuccess
      options?.onSuccess?.(data, variables, context);
    },
  });
}

/**
 * Hook for infinite query
 * @param queryKey - Query key
 * @param fetcher - Page-based data fetching function
 * @param options - Query options
 */
export function useInfiniteApiQuery<TData, TError = ApiError>(
  queryKey: QueryKey,
  fetcher: (pageParam: number) => Promise<AxiosResponse<ApiResponse<TData[]>>>,
  options?: Omit<UseQueryOptions<ApiResponse<TData[]>, TError>, 'queryKey' | 'queryFn'> & BaseApiOptions
) {
  return useQuery<ApiResponse<TData[]>, TError>({
    queryKey,
    queryFn: async () => {
      const response = await fetcher(options?.initialData ? 1 : 0);
      return response.data;
    },
    retry: options?.retry ?? 1,
    retryDelay: options?.retryDelay ?? 1000,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000,   // 10 minutes
    ...options,
  });
}

/**
 * Helper function for optimistic updates
 * @param queryClient - Query Client instance
 * @param queryKey - Query key to update
 * @param updater - Update function
 */
export function optimisticUpdate<T>(
  queryClient: ReturnType<typeof useQueryClient>,
  queryKey: QueryKey,
  updater: (oldData: T | undefined) => T
) {
  const oldData = queryClient.getQueryData<T>(queryKey);
  queryClient.setQueryData<T>(queryKey, updater(oldData));
  return oldData;
}
