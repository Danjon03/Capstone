function initializeEditMetric() {
  console.log("initializeEditMetric is running");



  const assetDropdown = document.getElementById("asset");
  const templateDropdown = document.getElementById("templateTitle");
  const addNewFieldButton = document.getElementById("newField-btn");
  const fieldsContainer = document.getElementById("field-container");
  const saveTemplateButton = document.getElementById("saveTemplate-btn");
  const deleteTemplateButton = document.getElementById("deleteTemplate-btn");

  let templateTitles = JSON.parse(localStorage.getItem("templateTitles")) || [];

  addNewFieldButton.addEventListener("click", function () {
    const fieldWrapper = document.createElement("div");
    fieldWrapper.classList.add("new-field");

    const newField = document.createElement("input");
    newField.type = "text";
    newField.classList.add("form-field");
    newField.placeholder = "Enter text here";

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.classList.add("delete-button");

    deleteButton.addEventListener("click", function () {
      fieldWrapper.remove();
    });

    fieldWrapper.appendChild(newField);
    fieldWrapper.appendChild(deleteButton);
    fieldsContainer.appendChild(fieldWrapper);
  });


  saveTemplateButton.addEventListener("click", function () {
    try {
      const title = templateDropdown.value.trim();
      const asset = assetDropdown.value;

      if (title === "") {
        alert("Error: Please enter a template title.");
        return;
      }

      const fieldValues = Array.from(fieldsContainer.querySelectorAll(".form-field"))
        .map(field => field.value.trim())
        .filter(value => value !== "");

      if (fieldValues.length === 0) {
        alert("Error: You must add at least one non-empty field before saving template.");
        return;
      }

      // overwrite existing template
      templateTitles = templateTitles.filter(t => !(t.title === title && t.asset === asset));
      templateTitles.push({ title, asset, fields: fieldValues });
      localStorage.setItem("templateTitles", JSON.stringify(templateTitles));

      fieldsContainer.innerHTML = "";
      alert("Template updated successfully.");

      loadView('editMetric');
    } catch (error) {
      alert(error.message);
    }
  });


  deleteTemplateButton.addEventListener("click", function () {
    const selectedTitle = templateDropdown.value;
    const selectedAsset = assetDropdown.value;

    if (!selectedTitle || !selectedAsset) {
      alert("Please select both an asset and a template to delete.");
      return;
    }

    const confirmDelete = confirm(`Are you sure you want to delete the template "${selectedTitle}"?`);
    if (!confirmDelete) return;

    // Filter out the selected template
    templateTitles = templateTitles.filter(
      t => !(t.title === selectedTitle && t.asset === selectedAsset)
    );

    // Save updated list
    localStorage.setItem("templateTitles", JSON.stringify(templateTitles));

    // Refresh the template dropdown
    updateTemplateDropdownByAsset(selectedAsset);
    fieldsContainer.innerHTML = "";

    alert("Template deleted successfully.");
  });


  // function helps generate templates associated w/ an asset
  function updateTemplateDropdownByAsset(selectedAsset) {
    templateDropdown.innerHTML = '<option value="">Select a template</option>';
    const filteredTemplates = templateTitles.filter(t => t.asset === selectedAsset);
    filteredTemplates.forEach(template => {
      const option = document.createElement("option");
      option.value = template.title;
      option.textContent = template.title;
      templateDropdown.appendChild(option);
    });
  }

  // Load template fields when a template is selected
  templateDropdown.addEventListener("change", function () {
    const selectedTemplate = templateTitles.find(
      t => t.title === this.value && t.asset === assetDropdown.value
    );
    if (!selectedTemplate) return;

    fieldsContainer.innerHTML = "";

    selectedTemplate.fields.forEach(value => {
      const fieldWrapper = document.createElement("div");
      fieldWrapper.classList.add("new-field");

      const newField = document.createElement("input");
      newField.type = "text";
      newField.classList.add("form-field");
      newField.value = value;

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "X";
      deleteButton.classList.add("delete-button");
      deleteButton.addEventListener("click", () => fieldWrapper.remove());

      fieldWrapper.appendChild(newField);
      fieldWrapper.appendChild(deleteButton);
      fieldsContainer.appendChild(fieldWrapper);
    });
  });

  // updates templates when changing assets
  assetDropdown.addEventListener("change", function () {
    const selectedAsset = this.value;
    updateTemplateDropdownByAsset(selectedAsset);
    fieldsContainer.innerHTML = ""; // clear fields when changing asset
  });

  // resets dropdowns
  setTimeout(() => {
    console.log("Resetting dropdowns now...");
    assetDropdown.selectedIndex = 0;
    templateDropdown.innerHTML = '<option value="">Select a template</option>';
    fieldsContainer.innerHTML = "";
  }, 0);

}

window.initializeEditMetric = initializeEditMetric;

