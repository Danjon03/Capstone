function initializeFillMetric() {
  const assetDropdown = document.getElementById("asset");
  const templateDropdown = document.getElementById("templateTitle");
  const fieldsContainer = document.getElementById("field-container");
  const submitButton = document.getElementById("submitMetric-btn");

  let templateTitles = JSON.parse(localStorage.getItem("templateTitles")) || [];

  // reset everything on load
  assetDropdown.selectedIndex = 0;
  templateDropdown.innerHTML = '<option value="">Select a template</option>';
  fieldsContainer.innerHTML = "";

  // update templates shown based on selected asset
  function updateTemplateDropdownByAsset(selectedAsset) {
    templateDropdown.innerHTML = '<option value="">Select a template</option>';

    const matchingTemplates = templateTitles.filter(
      t => t.asset === selectedAsset
    );

    matchingTemplates.forEach(template => {
      const option = document.createElement("option");
      option.value = template.title;
      option.textContent = template.title;
      templateDropdown.appendChild(option);
    });
  }

  // when asset changes → update template dropdown
  assetDropdown.addEventListener("change", function () {
    const selectedAsset = this.value;
    updateTemplateDropdownByAsset(selectedAsset);
    fieldsContainer.innerHTML = "";
  });

  // when template is chosen → show input fields
  templateDropdown.addEventListener("change", function () {
    const selectedTemplate = templateTitles.find(
      t => t.title === this.value && t.asset === assetDropdown.value
    );
    if (!selectedTemplate) return;

    fieldsContainer.innerHTML = "";

    selectedTemplate.fields.forEach(fieldLabel => {
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = fieldLabel;
      input.classList.add("form-field");
      fieldsContainer.appendChild(input);
    });
  });

  // on submit, grab the input values (for now just alert them)
  submitButton.addEventListener("click", function () {
    const selectedAsset = assetDropdown.value;
    const selectedTemplate = templateDropdown.value;

    if (!selectedAsset || !selectedTemplate) {
      alert("Please select both an asset and a template before submitting.");
      return;
    }

    const filledValues = Array.from(fieldsContainer.querySelectorAll(".form-field"))
      .map(input => input.value.trim());

    if (filledValues.some(v => v === "")) {
      alert("Please complete all fields before submitting.");
      return;
    }

    // 🧪 You can replace this with logic to save filled data elsewhere
    alert(`Submitted values for "${selectedTemplate}" (${selectedAsset}):\n${filledValues.join('\n')}`);

    loadView('fillMetrics');
  });
}

window.initializeFillMetric = initializeFillMetric;
