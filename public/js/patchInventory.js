/*disable-eslint*/

import axios from 'axios';
import { showAlert } from './alert';

export const patchInventory = async (
  id,
  material,
  supplierID,
  thickness,
  quantity,
  length,
  width,
  finish,
  grain,
) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:8000/api/v1/inventory/${id}`,
      data: {
        material,
        supplierID,
        thickness,
        quantity,
        length,
        width,
        finish,
        grain,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Inventory Updated Successfully');
      window.setTimeout(() => {
        location.reload();
      }, 1000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const inventoryUnload = async (id, quantity) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `http://127.0.0.1:8000/api/v1/inventory/unload/${id}`,
      data: {
        quantity,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Inventory Unloaded Successfully');
      window.setTimeout(() => {
        location.assign('/inventory/getAll');
      }, 1000);
    }
  } catch (err) {
    showAlert('error', err);
  }
};
