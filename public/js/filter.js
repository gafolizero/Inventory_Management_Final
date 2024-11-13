/*eslint-disable*/

import axios from 'axios';
import { showAlert } from './alert';

export const filterInventory = async () => {
  try {
    const materialFilter = document
      .getElementById('materialFilter')
      .value.trim();
    let supplierFilter = document.getElementById('supplierFilter').value.trim();
    const thicknessFilter = document
      .getElementById('thicknessFilter')
      .value.trim();

    if (supplierFilter) {
      const resSUPP = await axios({
        method: 'GET',
        url: `http://127.0.0.1:8000/api/v1/suppliers/${supplierFilter}`,
      });
      supplierFilter = resSUPP.data.data.document.id;
    }

    let filter = {};

    let material = materialFilter
      ? (filter.material = `${materialFilter}`)
      : '';
    let supplier = supplierFilter
      ? (filter.supplier = `${supplierFilter}`)
      : '';
    let thickness = thicknessFilter
      ? (filter.thickness = `${thicknessFilter}`)
      : '';

    let filterString = '';
    Object.keys(filter).forEach((el) => {
      filterString += `${el}=${filter[el]}` + '&';
    });
    filterString = filterString.slice(0, -1);

    const res = await axios({
      method: 'GET',
      url: `http://127.0.0.1:8000/api/v1/inventory?${filterString}`,
    });
    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.assign(`/inventory/getAll?${filterString}`);
      }, 1000);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
