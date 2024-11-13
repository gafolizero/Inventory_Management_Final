import axios from 'axios';

export const checkActivityInv = async (invID, nextRowHistory) => {
  try {
    const requiredInvObjIDResponse = await axios({
      method: 'GET',
      url: `http://127.0.0.1:8000/api/v1/inventory/inventoryID/${invID}`,
    });
    const requiredInvObjID = requiredInvObjIDResponse.data.data.document.id;

    const filteredHistoryResponse = await axios({
      method: 'GET',
      url: `http://127.0.0.1:8000/api/v1/history?modifiedID=${requiredInvObjID}`,
    });

    const resultOutput = filteredHistoryResponse.data.data.document;

    const existingRows = nextRowHistory.querySelectorAll(
      '.history-inv-body .history-data-row',
    );

    if (existingRows.length > 0) {
      return;
    }

    resultOutput.forEach((el) => {
      const formattedDate = new Date(el.date).toISOString().split('T')[0];
      const historyInvBody = nextRowHistory.querySelector('.history-inv-body');
      let HTMLROW = ` 
      <tr class="history-data-row">
        <td class="date">${formattedDate}</td>
        <td class="modified">${el.modified}</td>
        <td class="action">${el.action}</td>
        <td class="modifiedName">${el.modifiedName}</td>
        <td class="modifiedID">${el.itemID}</td>
        <td class="unloadCountTable">${el.unloadCount}</td>
        <td class="historyUser">${el.user}, ${el.userID}</td>
    </tr>
      `;
      historyInvBody.insertAdjacentHTML('beforeend', HTMLROW);
    });
  } catch (err) {
    console.error(err.response ? err.response.data.message : err.message);
  }
};

export const checkActivitySupp = async (suppID, nextRowHistory) => {
  try {
    console.log('suppID', suppID);
    const requiredSuppObjIDResponse = await axios({
      method: 'GET',
      url: `http://127.0.0.1:8000/api/v1/suppliers/${suppID}`,
    });
    const requiredSuppObjID = requiredSuppObjIDResponse.data.data.document.id;

    const filteredHistoryResponse = await axios({
      method: 'GET',
      url: `http://127.0.0.1:8000/api/v1/history?modifiedID=${requiredSuppObjID}`,
    });

    const resultOutput = filteredHistoryResponse.data.data.document;

    const existingRows = nextRowHistory.querySelectorAll(
      '.history-inv-body .history-data-row',
    );

    if (existingRows.length > 0) {
      return;
    }

    resultOutput.forEach((el) => {
      const formattedDate = new Date(el.date).toISOString().split('T')[0];
      const historyInvBody = nextRowHistory.querySelector('.history-inv-body');
      let HTMLROW = ` 
      <tr class="history-data-row">
        <td class="date">${formattedDate}</td>
        <td class="modified">${el.modified}</td>
        <td class="action">${el.action}</td>
        <td class="modifiedName">${el.modifiedName}</td>
        <td class="modifiedID">${el.itemID}</td>
        <td class="unloadCountTable">${el.unloadCount}</td>
        <td class="historyUser">${el.user}, ${el.userID}</td>
    </tr>
      `;
      historyInvBody.insertAdjacentHTML('beforeend', HTMLROW);
    });
  } catch (err) {
    console.error(err.response ? err.response.data.message : err.message);
  }
};
