import { useState, useCallback } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { contractFunctions, fheUtils } from '@/lib/contract';
import { useToast } from '@/hooks/use-toast';

export interface LendingCircle {
  id: number;
  name: string;
  description: string;
  totalMembers: number;
  currentMembers: number;
  contributionAmount: number;
  totalPool: number;
  currentRound: number;
  maxRounds: number;
  isActive: boolean;
  isVerified: boolean;
  creator: string;
  startTime: number;
  endTime: number;
}

export interface Member {
  memberId: number;
  contributionAmount: number;
  totalContributed: number;
  roundsParticipated: number;
  isActive: boolean;
  hasReceivedFunds: boolean;
  walletAddress: string;
  joinTime: number;
}

export const useContract = () => {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const createLendingCircle = useCallback(async (
    name: string,
    description: string,
    totalMembers: number,
    contributionAmount: number,
    duration: number
  ) => {
    if (!walletClient || !address) {
      toast({
        title: "Error",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return null;
    }

    setLoading(true);
    try {
      const hash = await contractFunctions.createLendingCircle(
        walletClient,
        name,
        description,
        totalMembers,
        contributionAmount,
        duration
      );

      toast({
        title: "Success",
        description: "Lending circle created successfully!",
      });

      return hash;
    } catch (error) {
      console.error('Error creating lending circle:', error);
      toast({
        title: "Error",
        description: "Failed to create lending circle",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, [walletClient, address, toast]);

  const getCircleInfo = useCallback(async (circleId: number): Promise<LendingCircle | null> => {
    try {
      const result = await contractFunctions.getCircleInfo(circleId);
      
      return {
        id: circleId,
        name: result[0],
        description: result[1],
        totalMembers: result[2],
        currentMembers: result[3],
        contributionAmount: result[4],
        totalPool: result[5],
        currentRound: result[6],
        maxRounds: result[7],
        isActive: result[8],
        isVerified: result[9],
        creator: result[10],
        startTime: Number(result[11]),
        endTime: Number(result[12]),
      };
    } catch (error) {
      console.error('Error getting circle info:', error);
      toast({
        title: "Error",
        description: "Failed to get circle information",
        variant: "destructive",
      });
      return null;
    }
  }, [toast]);

  const getMemberInfo = useCallback(async (memberAddress: string): Promise<Member | null> => {
    try {
      const result = await contractFunctions.getMemberInfo(memberAddress);
      
      return {
        memberId: result[0],
        contributionAmount: result[1],
        totalContributed: result[2],
        roundsParticipated: result[3],
        isActive: result[4],
        hasReceivedFunds: result[5],
        walletAddress: result[6],
        joinTime: Number(result[7]),
      };
    } catch (error) {
      console.error('Error getting member info:', error);
      toast({
        title: "Error",
        description: "Failed to get member information",
        variant: "destructive",
      });
      return null;
    }
  }, [toast]);

  const completeRound = useCallback(async (
    circleId: number,
    roundId: number,
    winner: string
  ) => {
    if (!walletClient || !address) {
      toast({
        title: "Error",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return null;
    }

    setLoading(true);
    try {
      const hash = await contractFunctions.completeRound(
        walletClient,
        circleId,
        roundId,
        winner
      );

      toast({
        title: "Success",
        description: "Round completed successfully!",
      });

      return hash;
    } catch (error) {
      console.error('Error completing round:', error);
      toast({
        title: "Error",
        description: "Failed to complete round",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, [walletClient, address, toast]);

  const encryptContribution = useCallback((amount: number) => {
    return fheUtils.encryptValue(amount);
  }, []);

  const decryptContribution = useCallback((encryptedValue: string) => {
    return fheUtils.decryptValue(encryptedValue);
  }, []);

  const generateContributionProof = useCallback((amount: number) => {
    return fheUtils.generateProof(amount);
  }, []);

  return {
    loading,
    createLendingCircle,
    getCircleInfo,
    getMemberInfo,
    completeRound,
    encryptContribution,
    decryptContribution,
    generateContributionProof,
  };
};
