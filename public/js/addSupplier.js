import axios from 'axios';
import { showAlert } from './alert';

export const addSupplier = async (
  supplierName,
  contactNumber,
  address,
  supplierID,
  email,
  representative,
  speciality,
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/v1/suppliers/',
      data: {
        supplierName,
        contactNumber,
        address,
        supplierID,
        email,
        representative,
        speciality,
      },
    });
    console.log(res.data);
    if (res.data.status === 'success') {
      showAlert('success', 'Supplier added Successfully');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
