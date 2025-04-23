function postUser(query)
{
    const url = 'http://localhost:3000/api/addUser'
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

   // Get method example to get ALL Records from a specific table
   async function getUsers() {
    const url = 'http://localhost:3000/api/getUsers';
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

async function getUserByID(id) {
    const url = 'http://localhost:3000/api/getUserByID';
    const data = {
        "id": id
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

async function updateUserPermissions(id, permissions) {
    const url = 'http://localhost:3000/api/updateUserPermissions';
    const data = {
        "userId": id,
        "permissions": permissions
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