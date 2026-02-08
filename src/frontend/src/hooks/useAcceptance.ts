import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { AcceptanceRecord } from '../backend';

export function useRecordAcceptance() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (note: string | null) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.recordAcceptance(note);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['latestRecord'] });
      queryClient.invalidateQueries({ queryKey: ['acceptanceCount'] });
    }
  });
}

export function useGetLatestRecord() {
  const { actor, isFetching } = useActor();

  return useQuery<AcceptanceRecord | null>({
    queryKey: ['latestRecord'],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getLatestRecord();
      } catch (error) {
        // No records yet
        return null;
      }
    },
    enabled: !!actor && !isFetching
  });
}

export function useGetAcceptanceCount() {
  const { actor, isFetching } = useActor();

  return useQuery<bigint>({
    queryKey: ['acceptanceCount'],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return await actor.getAcceptanceCount();
    },
    enabled: !!actor && !isFetching
  });
}
