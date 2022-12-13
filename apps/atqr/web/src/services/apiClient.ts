import { Guid } from '@tokilabs/lang';
import axios from 'axios';
import {
  challenge,
  CreateChallengeDto,
  IChallenge,
  UpdateCreditCardTokenDto,
} from './interfaces';
import { ChallengeStatus } from './interfaces';

const baseUrl = 'http://localhost:3333/api/';

const api = axios.create({
  baseURL: baseUrl,
  timeout: 1000,
});

export const atqrApi = {
  challenge: {
    create: async (createChallengeDto: CreateChallengeDto) => {
      try {
        const created = await api.post(
          `challenge/challenge`,
          createChallengeDto
        );
        return created;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    getOne: async (id: string) => {
      try {
        const getOne = await api.get(`/challenge/${id}`);
        console.log(getOne);
        return getOne;
      } catch (error) {
        console.log(error);
        return 'An unexpected error occurred';
      }
    },
    getLatest: async (amount: number): Promise<IChallenge[]> => {
      try {
        const latest = (await api.get(
          `challenge/latest/${amount}`
        )) as challenge[];
        return latest;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    challengeUpdate: {
      status: async (id: string, updateStatus: ChallengeStatus) => {
        try {
          const statsUpdated = await api.patch(
            `/challenge/${id}`,
            updateStatus
          );
          return statsUpdated;
        } catch (error) {
          console.log(error);
          return error;
        }
      },
      //TODO: need implement in controller
      payment: async (
        id: Guid,
        updateCreditCardTokenDto: UpdateCreditCardTokenDto
      ) => {
        try {
          const paymentUpdated = await api.patch(
            `/challenge/${id}`,
            updateCreditCardTokenDto
          );
          return paymentUpdated;
        } catch (error) {
          console.log(error);
          return error;
        }
      }, //TODO: need implement in controller
      supervisor: async (id: string) => {
        try {
          const supervisorUpdated = await api.patch(`/challenge/${id}`);
          return supervisorUpdated;
        } catch (error) {
          console.log(error);
          return error;
        }
      },
    },
  },

  payment: {
    publicKey: async () => {
      try {
        const key = await api.get(`stripe/public-key`);
        return key;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    setupIntent: async () => {
      try {
        const intent = await api.post(`stripe/setup-intent`);
        return intent;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  },
};
