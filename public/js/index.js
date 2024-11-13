/*eslint-disable*/

import { login, logout, signup } from './login';
import { addSupplier } from './addSupplier';
import { addInventory } from './addInventory';
import { addProject } from './addProject';
import { patchInventory, inventoryUnload } from './patchInventory';
import { deleteInventory } from './delete';
import { filterInventory } from './filter';
import { showAlert } from './alert';
import { updateSettings } from './updateSettings';
import { checkActivityInv, checkActivitySupp } from './checkactivity';
import { getAllSupplier } from './getAll';

const loginForm = document.querySelector('.form-login');
const supplierForm = document.querySelector('.form-supplier');
const inventoryForm = document.querySelector('.form-inventory');
const projectForm = document.querySelector('.form-project');
const patchInventoryForm = document.querySelector('.form-inventory-patch');
const logOutBtn = document.querySelector('.nav__el--logout');
const formDeleteInventory = document.querySelector('.form-delete-inventory');
const newSingUpForm = document.querySelector('.form-user-signup');
const allInvFilter = document.querySelector('.all-inventory-filter');
const unloadEventClick = document.querySelector('.unload-event-click');
const unloadFormCloseBtn = document.querySelector('.close-unload-button');
const unloadForm = document.querySelector('.unload-material-form');
const userDataForm = document.querySelector('.form-user-data-updateMe');
const userPasswordForm = document.querySelector('.form-user-data-password');
const historySection = document.querySelector('.history-section');
const historyBtn = document.querySelector('.btn-history');
const checkactivityForInv = document.querySelector('.table-for-history-inv');
const checkactivityForSupp = document.querySelector('.table-for-history-supp');

let toggleHistory = 0;
if (historyBtn) {
  historyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    toggleHistory = toggleHistory ? 0 : 1;

    if (toggleHistory === 0) historySection.classList.add('hide__content');
    if (toggleHistory === 1) historySection.classList.remove('hide__content');
  });
}

if (userDataForm) {
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('nameUpdateMe').value.trim();
    const email = document.getElementById('emailUpdateMe').value.trim();

    updateSettings({ name, email }, 'data');
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';
    const passwordCurrent = document
      .getElementById('password-current')
      .value.trim();
    const password = document.getElementById('password').value.trim();
    const passwordConfirm = document
      .getElementById('password-confirm')
      .value.trim();

    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password',
    );
    document.querySelector('.btn--save-password').textContent = 'Save Password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}

if (unloadForm) {
  unloadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const materialAvailableId = document
      .querySelector('.material-unload-id')
      .textContent.trim();
    const materialUnload = document.getElementById('materialUnload').value;
    const materialAvailableQuantity = document.querySelector(
      '.material-unload-available',
    ).textContent;

    if (Number(materialUnload) < 0) {
      showAlert('error', 'Not Valid.');
      return;
    }

    if (Number(materialAvailableQuantity) < Number(materialUnload)) {
      showAlert('error', 'Not Enough Inventory for Unload.');
    }
    if (Number(materialAvailableQuantity) >= Number(materialUnload)) {
      const remainingQuantity =
        Number(materialAvailableQuantity) - Number(materialUnload);
      inventoryUnload(materialAvailableId, remainingQuantity);
    }
  });
}

if (unloadFormCloseBtn) {
  unloadFormCloseBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const unloadForm = document.querySelector('.unload-material-form');
    unloadForm.classList.add('hide__content');
  });
}

if (unloadEventClick) {
  unloadEventClick.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('btn-unload')) {
      const unloadForm = document.querySelector('.unload-material-form');
      unloadForm.classList.remove('hide__content');
      const selectedRow = e.target.closest('tr');

      const materialAvailableName = document.querySelector(
        '.material-unload-name',
      );
      const materialAvailableId = document.querySelector('.material-unload-id');
      const materialAvailableSupplier = document.querySelector(
        '.material-unload-supplier',
      );
      const materialAvailableQuantity = document.querySelector(
        '.material-unload-available',
      );

      materialAvailableName.textContent = selectedRow.querySelector(
        '.inventory-material',
      ).textContent;
      materialAvailableId.textContent =
        selectedRow.querySelector('.inventory-id').textContent;
      materialAvailableSupplier.textContent = selectedRow.querySelector(
        '.inventory-supplier',
      ).textContent;
      materialAvailableQuantity.textContent = selectedRow.querySelector(
        '.inventory-quantity',
      ).textContent;
    }
  });
}

if (allInvFilter) {
  allInvFilter.addEventListener('submit', function (e) {
    e.preventDefault();

    filterInventory();
  });
}

if (logOutBtn) {
  logOutBtn.addEventListener('click', logout);
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

const formatDate = (valInput) => {
  const [year, month, day] = valInput.split('-');
  const formattedDate = `${year}/${month}/${day}`;
  return formattedDate;
};

if (newSingUpForm) {
  newSingUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('newName').value;
    const email = document.getElementById('newEmail').value;
    const newemployeeID = document.getElementById('newemployeeID').value;
    const newemployeeType = document.getElementById('newemployeeType').value;
    let employeeDOB = document.getElementById('newemployeeDOB').value;
    const role = document.getElementById('newRole').value;
    const department = document.getElementById('newdepartment').value;
    let joiningDate = document.getElementById('newjoiningDate').value;
    const password = document.getElementById('newPassword').value;
    const passwordConfirm = document.getElementById('newPasswordConfirm').value;

    employeeDOB = formatDate(employeeDOB);
    joiningDate = formatDate(joiningDate);

    signup(
      name,
      email,
      newemployeeID,
      newemployeeType,
      employeeDOB,
      role,
      department,
      joiningDate,
      password,
      passwordConfirm,
    );
  });
}

if (formDeleteInventory) {
  formDeleteInventory.addEventListener('submit', (e) => {
    e.preventDefault();
    const invId = document.querySelector('.forID').textContent.trim();
    const invIdForm = document.getElementById('inventoryDeleteId').value.trim();

    if (invId === invIdForm) {
      deleteInventory(invId);
    } else if (invId !== invIdForm) {
      showAlert('error', 'Please Confirm ID');
    }
  });
}

if (supplierForm) {
  supplierForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const supplierName = document.getElementById('supplierName').value;
    const supplierID = document.getElementById('supplierID').value;
    const contactNumber = document.getElementById('contactNumber').value;
    const address = document.getElementById('address').value;
    const representative = document.getElementById('representative').value;
    const email = document.getElementById('email').value;
    const speciality = document.getElementById('speciality').value;

    addSupplier(
      supplierName,
      contactNumber,
      address,
      supplierID,
      email,
      representative,
      speciality,
    );
    supplier = '';
    contactNumber = '';
    address = '';
  });
}

if (inventoryForm) {
  inventoryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(document.querySelector('.itemType-label').textContent);

    const inventoryID = document.getElementById('inventoryID').value;
    const material = document.getElementById('material').value;
    const supplierid = document.getElementById('supplierID').value;
    const thickness = document.getElementById('thickness').value;
    const quantity = document.getElementById('quantity').value;
    const length = document.getElementById('length').value;
    const width = document.getElementById('width').value;
    const finish = document.getElementById('finish').value;
    const grain = document.getElementById('grain').value;
    const inventoryType = document.getElementById('inventoryType').value;
    const itemType = document.querySelector('.itemType-input').value;
    const referenceCode = document.getElementById('referenceCode').value;
    const leadTime = document.getElementById('leadTime').value;
    const note = document.getElementById('note').value;

    addInventory(
      inventoryID,
      material,
      supplierid,
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
    );
  });

  const inventoryTypeSelect = document.querySelector('#inventoryType');
  const itemTypeLabel = document.querySelector('.itemType-label');

  function updateItemTypeLabel() {
    const selectedValue = inventoryTypeSelect.value;

    if (selectedValue === 'hardware') {
      itemTypeLabel.textContent = 'Hardware Type:';
    } else if (selectedValue === 'material-primarystock') {
      itemTypeLabel.textContent = 'Material Type:';
    } else if (selectedValue === 'special-material') {
      itemTypeLabel.textContent = 'Item Type:';
    } else {
      itemTypeLabel.textContent = 'Item Type:'; // Default case
    }
  }

  inventoryTypeSelect.addEventListener('change', updateItemTypeLabel);

  updateItemTypeLabel();

  let allSuppliers = [];
  getAllSupplier().then((e) => {
    allSuppliers = e.data.data.document;
  });

  const inputField = document.querySelector('#supplierID');
  const suggestionsContainer = document.querySelector('#supplierSuggestions');

  // Function to filter suppliers based on the query (case-insensitive search)
  function filterSuppliers(query) {
    const filtered = allSuppliers.filter((supplier) => {
      return (
        supplier.supplierID.toLowerCase().includes(query.toLowerCase()) ||
        supplier.supplierName.toLowerCase().includes(query.toLowerCase())
      );
    });
    return filtered;
  }

  // Function to render filtered suggestions
  function renderSuggestions(filteredSuppliers) {
    suggestionsContainer.innerHTML = ''; // Clear previous suggestions

    if (filteredSuppliers.length === 0) {
      suggestionsContainer.style.display = 'none'; // Hide if no results
      return;
    }

    suggestionsContainer.style.display = 'block'; // Ensure suggestions container is visible
    filteredSuppliers.forEach((supplier) => {
      const optionElement = document.createElement('div');
      optionElement.classList.add('suggestion-item');
      optionElement.textContent = `${supplier.supplierName} (${supplier.supplierID})`;

      // Add click event to set the supplier ID into the input field
      optionElement.addEventListener('click', function () {
        inputField.value = supplier.supplierID; // Only set the supplier ID in the input
        suggestionsContainer.style.display = 'none'; // Hide the suggestions after selection
      });

      suggestionsContainer.appendChild(optionElement);
    });
  }

  // Listen for input events in the supplier ID input field
  inputField.addEventListener('input', function () {
    const query = inputField.value;
    if (query) {
      const filteredSuppliers = filterSuppliers(query);
      renderSuggestions(filteredSuppliers);
    } else {
      suggestionsContainer.style.display = 'none'; // Hide suggestions when input is empty
    }
  });

  // Hide suggestions if clicked outside the input or suggestions container
  document.addEventListener('click', function (e) {
    // Check if the click is outside the input and suggestions container
    if (!suggestionsContainer.contains(e.target) && e.target !== inputField) {
      suggestionsContainer.style.display = 'none'; // Hide suggestions if clicked outside
    }
  });

  // Prevent the input field from closing the suggestions if clicked inside it
  inputField.addEventListener('click', function (e) {
    e.stopPropagation(); // Prevent the click event from propagating and triggering the outside click event
  });
}

if (patchInventoryForm) {
  patchInventoryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const forID = document.querySelector('.forID').textContent;
    const materialPatch = document.getElementById('materialPatch').value;
    const supplieridPatch = document.getElementById('supplieridPatch').value;
    const thicknessPatch = document.getElementById('thicknessPatch').value;
    const quantityPatch = document.getElementById('quantityPatch').value;
    const lengthPatch = document.getElementById('lengthPatch').value;
    const widthPatch = document.getElementById('widthPatch').value;
    const finishPatch = document.getElementById('finishPatch').value;
    const grainPatch = document.getElementById('grainPatch').value;

    patchInventory(
      forID,
      materialPatch,
      supplieridPatch,
      thicknessPatch,
      quantityPatch,
      lengthPatch,
      widthPatch,
      finishPatch,
      grainPatch,
    );
  });
}

let openSideBarALL = document.querySelectorAll('.open-sidebar');
let sidebar = document.querySelector('.sidebar');
let premiumTags = document.querySelectorAll('.premium-tag');
let body = document.querySelector('body');
let headerNav = document.querySelector('.header-nav');

premiumTags.forEach((tag) => {
  tag.style.display = 'none';
});

openSideBarALL.forEach(
  (sidebarButton) =>
    (sidebarButton.onclick = function (event) {
      event.stopPropagation();
      sidebar.classList.toggle('active--1');

      if (sidebar.classList.contains('active--1')) {
        body.classList.add('sidebar-open');
        premiumTags.forEach((tag) => {
          tag.style.display = 'inline-block';
        });
      } else {
        body.classList.remove('sidebar-open');
        premiumTags.forEach((tag) => {
          tag.style.display = 'none';
        });
      }

      document.querySelectorAll('.dropdown.active--1').forEach((dropdown) => {
        dropdown.classList.remove('active--1');
        dropdown.querySelector('ul.dropdown').style.display = 'none';
      });
    }),
);

const toggleDropdown = (event) => {
  event.preventDefault();

  const dropdown = event.currentTarget.nextElementSibling;
  const parentLi = event.currentTarget.parentElement;
  parentLi.classList.toggle('active--1');

  dropdown.style.display =
    parentLi.classList.contains('active--1') &&
    sidebar.classList.contains('active--1')
      ? 'block'
      : 'none';
};

document
  .querySelectorAll('.dropdown-toggle')
  .forEach((el) => el.addEventListener('click', toggleDropdown));

// Close the sidebar if the click happens outside the sidebar or the sidebar toggle button
document.addEventListener('click', function (event) {
  // Check if the clicked area is outside the sidebar and not on the toggle button
  if (
    !sidebar.contains(event.target) &&
    !event.target.closest('.open-sidebar')
  ) {
    sidebar.classList.remove('active--1'); // Close the sidebar if clicked outside
    body.classList.remove('sidebar-open'); // Remove blur and darkening when sidebar is closed
    premiumTags.forEach((tag) => {
      tag.style.display = 'none'; // Hide premium tags when sidebar is closed
    });
  }

  // Close any open dropdown if clicked outside
  document.querySelectorAll('.dropdown.active--1').forEach((dropdown) => {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove('active--1');
      dropdown.querySelector('ul.dropdown').style.display = 'none';
    }
  });
});

if (projectForm) {
  const projectContainer = document.querySelector('.form-project');

  projectContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('project-inv-add')) {
      e.preventDefault();

      const htmlProjectContainer = `
        <div class="project-container">
            <div class="project-Inv-qnt">
                <div class="form__group form__group-add-supplier">
                    <label class="add-supplier-label small-font" for="inventoryId">Inventory ID</label>
                    <input id="inventoryId" class="form__input form__input-supplier-add inventoryId" type="text" placeholder="Inventory Id" required>
                </div>
                <div class="form__group form__group-add-supplier">
                    <label class="add-supplier-label small-font " for="inventoryQuantity">Inventory Quantity</label>
                    <input id="inventoryQuantity" class="form__input form__input-supplier-add inventoryQuantity" type="text" placeholder="inventoryQuantity" required>
                </div>
            </div>
            <div class="project-inv-add-delete-sec">
                <button class="btn btn--green project-inv-add">Add Inventory</button>
                <button class="btn btn--green project-inv-delete">Delete Inventory</button>
            </div>
        </div>
        `;

      e.target
        .closest('.project-container')
        .insertAdjacentHTML('afterend', htmlProjectContainer);
    }

    if (
      e.target.classList.contains('project-inv-delete') &&
      document.querySelectorAll('.project-inv-delete').length > 1
    ) {
      e.preventDefault();
      e.target.closest('.project-container').remove();
    } else if (
      e.target.classList.contains('project-inv-delete') &&
      document.querySelectorAll('.project-inv-delete').length <= 1
    ) {
      alert('Project Must have Inventory!');
    }
  });

  const addProjectBtn = document.querySelector('.btn-add-project');

  projectForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn-add-project').textContent =
      'Adding Project...';
    const projectName = document.getElementById('projectName').value;
    const projectId = document.getElementById('projectId').value;
    const address = document.getElementById('address').value;
    const projectManagerId = document.getElementById('projectManagerId').value;
    const siteManagerId = document.getElementById('siteManagerId').value;
    const clientName = document.getElementById('clientName').value;
    const clientNumber = document.getElementById('clientNumber').value;
    const clientType = document.getElementById('clientType').value;

    const client = {
      clientName,
      clientNumber,
      clientType,
    };

    const inventoryIdAll = document.querySelectorAll('.inventoryId');
    const inventoryQuantityAll =
      document.querySelectorAll('.inventoryQuantity');

    let invArray = [];
    for (let i = 0; i < inventoryIdAll.length; i++) {
      invArray.push({
        inventoryItemId: inventoryIdAll[i].value,
        inventoryquantity: inventoryQuantityAll[i].value,
      });
    }

    await addProject(
      projectName,
      projectId,
      address,
      projectManagerId,
      siteManagerId,
      invArray,
      client,
    );

    document.querySelector('.btn-add-project').textContent = 'Add Project';
    document.getElementById('projectName').value = '';
    document.getElementById('projectId').value = '';
    document.getElementById('address').value = '';
    document.getElementById('projectManagerId').value = '';
    document.getElementById('siteManagerId').value = '';
    document.getElementById('clientName').value = '';
    document.getElementById('clientNumber').value = '';
    document.getElementById('clientType').value = '';
  });
}

if (checkactivityForInv) {
  const tableSelect = document.querySelector('.inventory-table');
  tableSelect.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-checkHistory')) {
      e.preventDefault();
      if (e.target.classList.contains('btn-checkHistory')) {
        const nextRowHistory = e.target.closest('tr').nextElementSibling;
        e.target
          .closest('tr')
          .nextElementSibling.classList.toggle('hide__content');
        const id = e.target
          .closest('tr')
          .querySelector('.inventory-id').textContent;

        checkActivityInv(id, nextRowHistory);
      }
    }
  });
}

if (checkactivityForSupp) {
  const tableSelect = document.querySelector('.supplier-table');

  tableSelect.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-checkHistory')) {
      e.preventDefault();
      if (e.target.classList.contains('btn-checkHistory')) {
        const nextRowHistory = e.target.closest('tr').nextElementSibling;
        e.target
          .closest('tr')
          .nextElementSibling.classList.toggle('hide__content');
        const id = e.target
          .closest('tr')
          .querySelector('.supplier-id').textContent;

        checkActivitySupp(id, nextRowHistory);
      }
    }
  });
}
