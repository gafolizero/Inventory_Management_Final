/*eslint-disable*/
import '@babel/polyfill';
import axios from 'axios';
import { showAlert } from './alert';

export const deleteInventory = async (id) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `http://127.0.0.1:8000/api/v1/inventory/${id}`,
    });

    showAlert('success', 'Inventory Deleted.');
    window.setTimeout(() => {
      location.assign('/inventory/getAll');
    }, 1000);
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
