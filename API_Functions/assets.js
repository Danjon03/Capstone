
// Posts a template to the database
function postTemplate(query)
{
    const url = 'http://localhost:3000/api/addTemplate'
    const data = query;
    const customHeaders = {
        "Content-Type": "application/json",
    }
    
    fetch(url, {
        method: "POST",
        headers: customHeaders,
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        });
  }

  async function updateTemplate(id, newTemplate) {
    console.log("In update template");
    const url = 'http://localhost:3000/api/updateTemplate';
    const data = {
        "oldId": id,
        "newTemplate": newTemplate
    };

    const customHeaders = {
        "Content-Type": "application/json",
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: customHeaders,
            body: JSON.stringify(data),
        });
        const responseData = await response.json(); // Wait for the response data
        return responseData;
    } catch (error) {
        console.error("Error logging in:", error);
        return -1; // Return -1 in case of an error
    }
}

async function getTemplates() {
    const url = 'http://localhost:3000/api/getTemplates';
    const customHeaders = {
        "Content-Type": "application/json",
    };

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: customHeaders
        });
        const data = await response.json();
        return data; // Return the fetched data
    } catch (error) {
        console.error('Error:', error);
        throw error; // Allow the caller to handle errors
    }
}

// Get method example to get ALL Records from a specific table
async function getRecords()
{
  const url = 'http://localhost:3000/api/getRecords'
  const customHeaders = {
      "Content-Type": "application/json",
  }

  try {
      const response = await fetch(url, {
          method: "GET",
          headers: customHeaders
      });
      const data = await response.json();
      return data; // Return the fetched data
  } catch (error) {
      console.error('Error:', error);
      throw error; // Allow the caller to handle errors
  }

}

function postRecords(query)
{
    const url = 'http://localhost:3000/api/addRecord'
    const data = query;
    //future change :: const data = query;

    const customHeaders = {
        "Content-Type": "application/json",
    }
    
    fetch(url, {
        method: "POST",
        headers: customHeaders,
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        });
  }

  //gets all records that have the same asset title
  async function getRecordsbyTitle(title)
  {
      const url = 'http://localhost:3000/api/getRecordsByTitle';
      const data = {
          "title": title
      };
  
      const customHeaders = {
          "Content-Type": "application/json",
      };
  
      try {
          const response = await fetch(url, {
              method: "POST",
              headers: customHeaders,
              body: JSON.stringify(data),
          });
          const responseData = await response.json(); // Wait for the response data
          return responseData;
      } catch (error) {
          console.error("Error logging in:", error);
          return -1; // Return -1 in case of an error
      }
  }