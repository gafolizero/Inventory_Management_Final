import axios from 'axios';
import { showAlert } from './alert';

export const addInventory = async (
  inventoryID,
  material,
  supplierID,
  thickness,
  quantity,
  length,
  width,
  finish,
  grain,
  inventoryType,
  itemType,
  referenceCode,
  leadTime,
  note,
) => {
  try {
    const supplierObjID = await axios({
      method: 'GET',
      url: `http://127.0.0.1:8000/api/v1/suppliers/${supplierID}`,
    });

    console.log(supplierObjID);
    console.log(supplierObjID.data.data.document._id);
    supplierID = supplierObjID.data.data.document._id;

    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/v1/inventory/',
      data: {
        inventoryID,
        material,
        supplier: supplierID,
        thickness,
        quantity,
        length,
        width,
        finish,
        grain,
        inventoryType,
        itemType,
        referenceCode,
        leadTime,
        note,
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Inventory added Successfully');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    console.log(err.response);
  }
};
