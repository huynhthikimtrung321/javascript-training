import axios from 'axios';
import { ERROR_MESSAGES } from '../constants/messages';

class HttpService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.axiosClient = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async get(endpoint) {
    try {
      const response = await this.axiosClient.get(endpoint);

      if (!res.ok) {
        throw new Error (ERROR_MESSAGES.GET_FAILED_MSG);
      }

      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  }

  async post(endpoint) {
    try {
      const response = await this.axiosClient.post(`${API_BASE_URL}/${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error (ERROR_MESSAGES.POST_FAILED_MSG);
      }

      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  }

  async edit(endpoint) {
    try {
      const response = await this.axiosClient.patch(`${API_BASE_URL}/${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error (ERROR_MESSAGES.EDIT_FAILED_MSG);
      }

      return response.data;
    } catch (error) {
      console.error(error.message);
    }
  }

  async delete (endpoint) {
    try {
      await this.axiosClient.delete(`${API_BASE_URL}/${endpoint}`);

      if (!res.ok) {
        throw new Error (ERROR_MESSAGES.DELETE_FAILED_MSG);
      }

      return response.data;

    } catch (error) {
      console.error(error.message);
    }
  }
}
