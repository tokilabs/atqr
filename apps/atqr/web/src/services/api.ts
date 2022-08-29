import { Challenge, ChallengeStatus } from '@atqr/domain';
import { Guid } from '@tokilabs/lang';
import axios from 'axios';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CreateChallengeDto } from '../../../api/src/app/dtos/index';
import { UpdateCreditCardTokenDto } from '../../../api/src/app/dtos/index';

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
    statusUpdated: async (id: Guid, status: ChallengeStatus) => {
      try {
        const updated = await api.patch(`challenge/challenge/${id}`, status);
        return updated;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    changePayment: async (id: Guid) => {
      try {
        const paymentUpdated = await api.get(`challenge/challenge/${id}`);
        return paymentUpdated;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    updateCardToken: async (id: Guid, token: UpdateCreditCardTokenDto) => {
      try {
        const tokenUpdated = await api.patch(
          `challenge/challenge/${id}`,
          token
        );
        return tokenUpdated;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    changeSupervisor: async (id: Guid) => {
      try {
        const supervisorUpdated = await api.get(`challenge/challenge/${id}`);
        return supervisorUpdated;
      } catch (error) {
        console.log(error);
        return error;
      }
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
