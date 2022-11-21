import { Challenge, ChallengeStatus } from '@atqr/domain';
import { Guid } from '@tokilabs/lang';
import axios from 'axios';

import { CreateChallengeDto, UpdateCreditCardTokenDto } from '@atqr/api';

const baseUrl = 'http://localhost:3333/api/';

const api = axios.create({
  baseURL: baseUrl,
  timeout: 1000,
});

export const atqrApi = {
  challenges: {
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
    getLatest: async (amount: number) => {
      try {
        const latest = await api.get(`challenge/last-challenges/${amount}`);
        return latest;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    challengeUpdated: {
      statusUpdated: async (id: Guid, updateStatus: ChallengeStatus) => {
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
      paymentUpdated: async (
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
      changedSupervisor: async (id: string) => {
        try {
          const paymentUpdated = await api.patch(`/challenge/${id}`);
          return paymentUpdated;
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
