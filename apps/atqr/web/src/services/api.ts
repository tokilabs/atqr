import axios from 'axios';

export const api = {
  getLatestChallenges: async () => {
    try {
      return await axios.get('/');
    } catch (error) {
      console.log(error);
    }
  },
};
