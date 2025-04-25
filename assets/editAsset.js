// doesnt work with the api server

function initializeEditAsset() {
    const templateDropdown = document.getElementById("templateTitle");
    const addNewFieldButton = document.getElementById("newField-btn");
    const fieldsContainer = document.getElementById("field-container");
    const saveTemplateButton = document.getElementById("saveTemplate-btn");
    const deleteTemplateButton = document.getElementById("deleteTemplate-btn");
  
    let templateTitles = JSON.parse(localStorage.getItem("templateTitles")) || [];
  
    function populateDropdown() {
        templateDropdown.innerHTML = '<option value="">Select a template</option>';
        const assetTemplates = templateTitles.filter(t => t.type === "asset");
        assetTemplates.forEach(template => {
          const option = document.createElement("option");
          option.value = template.title;
          option.textContent = template.title;
          templateDropdown.appendChild(option);
        });
      }
      
  
    function renderFields(fields = []) {
      fieldsContainer.innerHTML = "";
      fields.forEach(value => {
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
    }
  
    templateDropdown.addEventListener("change", function () {
      const selected = templateTitles.find(t => t.title === this.value);
      if (selected) {
        renderFields(selected.fields);
      } else {
        fieldsContainer.innerHTML = "";
      }
    });
  
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
      deleteButton.addEventListener("click", () => fieldWrapper.remove());
  
      fieldWrapper.appendChild(newField);
      fieldWrapper.appendChild(deleteButton);
      fieldsContainer.appendChild(fieldWrapper);
    });
  
    saveTemplateButton.addEventListener("click", function () {
      const selectedTitle = templateDropdown.value;
      if (!selectedTitle) {
        alert("Please select a template.");
        return;
      }
  
      const fieldValues = Array.from(fieldsContainer.querySelectorAll(".form-field"))
        .map(field => field.value.trim())
        .filter(Boolean);
  
      if (fieldValues.length === 0) {
        alert("You must have at least one field.");
        return;
      }
  
      templateTitles = templateTitles.filter(
        t => !(t.title === selectedTitle && t.type === "asset")
      );
      
      templateTitles.push({ 
        type: "asset",
        title: selectedTitle, 
        fields: fieldValues,
    });

      localStorage.setItem("templateTitles", JSON.stringify(templateTitles));
      alert("Template updated successfully.");
      populateDropdown();
      templateDropdown.value = selectedTitle;
    });
  
    deleteTemplateButton.addEventListener("click", function () {
      const selectedTitle = templateDropdown.value;
      if (!selectedTitle) {
        alert("Please select a template to delete.");
        return;
      }
  
      const confirmed = confirm(`Delete template "${selectedTitle}"?`);
      if (!confirmed) return;
  
      templateTitles = templateTitles.filter(
        t => !(t.title === selectedTitle && t.type === "asset")
      );
      
      localStorage.setItem("templateTitles", JSON.stringify(templateTitles));
      populateDropdown();
      fieldsContainer.innerHTML = "";
      alert("Template deleted.");
    });
  
    // Initialize the dropdown when the view loads
    populateDropdown();
  }
  