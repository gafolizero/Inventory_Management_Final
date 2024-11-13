import axios from 'axios';
import { showAlert } from './alert';

export const getAllSupplier = async () => {
  try {
    const allSuppliers = await axios({
      method: 'GET',
      url: `http://127.0.0.1:8000/api/v1/suppliers/`,
    });
    return allSuppliers;
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
