import axios from 'axios';

export const atqrApi = {
  challenges: {
    getLatest: async () => {
      try {
        return await axios.get('/');
      } catch (error) {
        console.log(error);
      }
    },
  },
  payment: {},
};
