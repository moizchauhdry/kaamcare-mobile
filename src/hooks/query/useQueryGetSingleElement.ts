import type { QueryKey } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';

export const useQueryGetSingleElement = <TData>(
  value: string,
  queryKey: QueryKey,
  searchKey: keyof TData,
): TData | undefined => {
  const queryClient = useQueryClient();
  const list = queryClient.getQueryData<TData[]>(queryKey) ?? [];

  return list.find((elem) => elem[searchKey] === value);
};
