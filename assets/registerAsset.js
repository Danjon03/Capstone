// fix exception handling to match asset requirements

function initializeRegisterAsset() {
    const addNewFieldButton = document.getElementById("newField-btn");
    const fieldsContainer = document.getElementById("field-container");
    const clearFieldsButton = document.getElementById("clearFields-btn");
    const saveTemplateButton = document.getElementById("saveTemplate-btn");

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

    clearFieldsButton.addEventListener("click", function () {
        fieldsContainer.innerHTML = "";
        
    });

    saveTemplateButton.addEventListener("click", function () {
        try {
          const titleInput = document.getElementById("template-title");
          const title = titleInput.value.trim();
      
          // empty title validation
          if (title === "") {
            alert("Error: Please enter a title before saving the template.");
            titleInput.focus();
            return;
          }
      
          // duplicate title validation
          const isDuplicate = templateTitles.some(t => t.title === title && t.type === "asset");
          if (isDuplicate) {
            alert("Error: A template with this title already exists. Please choose a different title.");
            titleInput.focus();
            return;
          }
      
          const fieldValues = Array.from(fieldsContainer.querySelectorAll(".form-field"))
            .map(field => field.value.trim())
            .filter(value => value !== "");
      
          // non-empty fields validation
          if (fieldValues.length === 0) {
            alert("Error: You must add at least one non-empty field before saving template.");
            return;
          }
      
          // Prepare asset template object
          const newTemplate = {
            title,
            fields: fieldValues,
            timestamp: new Date().toLocaleString(),
            userId: 0,
            type: "asset"  // distinguishes asset templates from metric ones
          };
      
          // Save to template pool in localStorage
          templateTitles.push(newTemplate);
          localStorage.setItem("templateTitles", JSON.stringify(templateTitles));
      
          // save to asset pool
          let assets = JSON.parse(localStorage.getItem("assets")) || [];
          if (!assets.includes(title)) {
            assets.push(title);
            localStorage.setItem("assets", JSON.stringify(assets));
          }
      
          // Send to backend
          postTemplate(newTemplate);
      
          // Reset form
          fieldsContainer.innerHTML = "";
          titleInput.value = "";
          alert("Template saved successfully.");
        } catch (error) {
          alert(error.message);
        }
      });
      
    
}

function updateTemplateDropdown(selectedAsset) {
    const templateDropdown = document.getElementById("templateTitle");
    templateDropdown.innerHTML = '<option value="">Select a template</option>';

    const templateTitles = JSON.parse(localStorage.getItem("templateTitles")) || [];
    const matchingTemplates = templateTitles.filter(t => t.asset === selectedAsset);

    matchingTemplates.forEach(template => {
        const option = document.createElement("option");
        option.value = template.title;
        option.textContent = template.title;
        templateDropdown.appendChild(option);
    });
}

  