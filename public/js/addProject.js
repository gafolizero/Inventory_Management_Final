import axios from 'axios';
import { showAlert } from './alert';

export const addProject = async (
  name,
  projectID,
  address,
  projectManager,
  siteManager,
  inventoryArr,
  client,
) => {
  try {
    let inventorySendObj = [];

    for (const el of inventoryArr) {
      let invObjID = await axios({
        method: 'GET',
        url: `http://127.0.0.1:8000/api/v1/inventory/inventoryID/${el.inventoryItemId}`,
      });
      inventorySendObj.push({
        inventoryItemId: `${invObjID.data.data.document.id}`,
        inventoryquantity: `${el.inventoryquantity}`,
      });
    }

    const projectManagerID = await axios({
      method: 'GET',
      url: `http://127.0.0.1:8000/api/v1/projectManager/${projectManager}`,
    });
    const siteManagerID = await axios({
      method: 'GET',
      url: `http://127.0.0.1:8000/api/v1/siteManager/${siteManager}`,
    });

    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/v1/projects',
      data: {
        name,
        projectID,
        address,
        projectManager: projectManagerID.data.data.document._id,
        siteManager: siteManagerID.data.data.document._id,
        inventory: inventorySendObj,
        client,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Project added Successfully');
    }
  } catch (err) {
    if (err.response.data.message === 'No document found for the provided ID')
      showAlert('error', err.response.data.message);
    else showAlert('error', 'Cannot Create Project: Duplicate ID');
  }
};
