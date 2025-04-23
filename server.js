// server.js
const Hapi = require('@hapi/hapi');
const MongoClient = require('mongodb').MongoClient;

const { ObjectId } = require('mongodb');

// Initializes the Server
const init = async () => {
    const server = Hapi.server({ 
        port: 3000,
        host: 'localhost',
        "routes": {
            "cors": {
            "origin": ["*"],
            "headers": ["Accept", "Content-Type"], // proflipisclump
            "additionalHeaders": ["X-Requested-With"]
        }
}
    });

    // MongoDB connection setup
    const client = new MongoClient('mongodb://localhost:27017');
    await client.connect();
    const db = client.db('Capstone');
 

    //returns all records that have the template title given by the parameter
    async function getAllRecordsWithTemplateTitle(title)
    {
        //get everything from the users collection
        const users = await db.collection("Records").find().toArray(); // All the users in the database
                let records = [];
                for (let i = 0; i < users.length; i++) {
                    const userData = users[i];
                    if(userData.template == title)
                    {
                        records.push(userData);
                        
                    }
                }
                console.log(records);
                return records;
    }

    //Returns the user object from a given id
    //takes the app defined object id as a parameter.
    async function getUserByID(id)
    {
        //get everything from the users collection
        const users = await db.collection("Users").find().toArray(); // All the users in the database
                
                let returnUser = {response : "No User Found"};
                for (let i = 0; i < users.length; i++) {
                    const userData = users[i];
                    if(userData._id == id)
                    {
                        returnUser = {response : userData};
                        break;
                    }
                }
                return returnUser;
    }

    //returns all metrics with the given templateid
    async function getMetricsByID(id)
    {
         //get everything from the MetricTemplates collection
         const users = await db.collection("MetricTemplates").find().toArray(); // All the users in the database
                
         let returnData = [];
         for (let i = 0; i < users.length; i++) {
             const userData = users[i];
             console.log(userData.templateId + " : " + id);
             if(userData.templateId == id)
             {
                 returnData.push(userData);
             }
         }
         return returnData;
    }


    async function getMetricsByRecord(recordID, metID)
    {
        //get all records of metrics
        const items = await db.collection("Metrics").find({}).toArray();

        let returnData = [];
         for (let i = 0; i < items.length; i++) {
             const userData = items[i];
             //console.log(userData.assetType + " : " + id);
             if((userData.metricID == metID) && (userData.record == recordID))
             {
                 returnData.push(userData);
             }
         }
         return returnData;

    }





    //Returns the _id attribute of a specific object
    //takes the app defined object id as a parameter
    async function getUserByIDReturnsObjectID(id)
    {
        const users = await db.collection("Users").find().toArray(); // All the users in the database
                
                let returnUser = {response : "No User Found"};
                for (let i = 0; i < users.length; i++) {
                    const userData = users[i];
                    //console.log(users[i]);
                    //console.log(userData.id + " : " + JSON.stringify(id));
                    if(userData.id == id)
                    {
                        returnUser = {response : users[i]._id};
                        break;
                    }
                }
                return returnUser;
    }

    //A endpoint that can retrieve all records under a certain template
    //takes the title of the template as a parameter.
    server.route({
        method: 'POST',
        path: '/api/getRecordsByTitle',
        handler: async (request, h) => {

            const {title} = request.payload;
            const records = getAllRecordsWithTemplateTitle(title);
            return records;
        }
    });


    //Get Users                                                                               //Get All Users
    server.route({
        method: 'GET',
        path: '/api/getUsers',
        handler: async (request, h) => {
            const items = await db.collection("Users").find({}).toArray();
            return items;
        }
    });

    //This endpoint allows you to code whatever you want with the database
    server.route({
        method: 'GET',
        path: '/api/deleteAllUsers',
        handler: async (request, h) => {
            


        }
    });
   
    // Get Templates
    server.route({
        method: 'GET',
        path: '/api/getTemplates',
        handler: async (request, h) => {
            const items = await db.collection("Templates").find({}).toArray();
            return items;
        }
    });

    // Get Records
    server.route({
        method: 'GET',
        path: '/api/getRecords',
        handler: async (request, h) => {
            const items = await db.collection("Records").find({}).toArray();
            return items;
        }
    });


     //Get Metrics                                                                               //Get All Users
     server.route({
        method: 'GET',
        path: '/api/getMetrics',
        handler: async (request, h) => {
            const items = await db.collection("Metrics").find({}).toArray();
            return items;
        }
    });

    //Add Metrics
    server.route({
        method: 'POST',
        path: '/api/addMetric',
        handler: async (request, h) => {
            console.log(request.payload);
            const newItem = request.payload;
            const result = await db.collection("Metrics").insertOne(newItem);
            return result;
        }
    });

    //Get Metric Templates                                                                               //Get All Users
    server.route({
        method: 'GET',
        path: '/api/getMetricTemplates',
        handler: async (request, h) => {
            const items = await db.collection("MetricTemplates").find({}).toArray();
            console.log(items);
            return items;
        }
    });

    //Add Metric Template
    server.route({
        method: 'POST',
        path: '/api/addMetricTemplate',
        handler: async (request, h) => {
            console.log(request.payload);
            const newItem = request.payload;
            const result = await db.collection("MetricTemplates").insertOne(newItem);
            return result;
        }
    });

    //Add User
    server.route({
        method: 'POST',
        path: '/api/addUser',
        handler: async (request, h) => {
            console.log(request.payload);
            const newItem = request.payload;
            const result = await db.collection("Users").insertOne(newItem);
            return result;
        }
    });

    //Add Template
        server.route({
        method: 'POST',
        path: '/api/addTemplate',
        handler: async (request, h) => {
            console.log(request.payload);
            const newItem = request.payload;
            const result = await db.collection("Templates").insertOne(newItem);
            return result;
        }
    });

    //Add Record
        server.route({
        method: 'POST',
        path: '/api/addRecord',
        handler: async (request, h) => {
            console.log(request.payload);
            const newItem = request.payload;
            const result = await db.collection("Records").insertOne(newItem);
            return result;
        }
    });
    // Login Stuff
        server.route({
        method: 'POST',
        path: '/api/loginUser',
        handler: async (request, h) => {
            try {
                const { username, password } = request.payload; // Extract username and password
                const users = await db.collection("Users").find().toArray();
                //console.log(users);
                let returnUserID = {"response" : 1000};

                for (let i = 0; i < users.length; i++) {
                    const userData = users[i];
                    //console.log(userData.username + " : " + userData.password);

                    if(userData.username == username && userData.password == password)
                    {
                        return {"userID" : userData._id,
                                        "firstName" : userData.firstName,
                                        "permissions" : userData.permissions,
                                        "response" : "validLogin"
                        };
                    }
                    
                }
                //console.log(returnUserID.response);
                return returnUserID;
    
                // Return 1 for valid credentials, 0 for invalid credentials
            } catch (error) {
                console.error("Error handling login:", error);
                return h.response({ message: "Server error" }).code(500);
            }
        }
    });


    //get username by id. takes the integer value of the id you are looking for
    //Returns No User Found if there is no user with the matching ID in the dtabase
    //Returns the json object of that user if the user is found
    server.route({
        method: 'POST',
        path: '/api/getUserByID',
        handler: async (request, h) => {
            try {
                const {id} = request.payload; // this is the id that the user sent in
                return await getUserByID(id);

            } catch (error) {
                console.error("Error handling login:", error);
                return h.response({ message: "Server error" }).code(500);
            }
        }
    });

    //This route updates the user permissions for any given user
    //This takes the id of the user we are updating, and the permissions attributes
    server.route({
        method: 'POST',
        path: '/api/updateUserPermissions',
        handler: async (request, h) => {
            //console.log(request.payload);
            const {userId, permissions} = request.payload;
            console.log(userId + " : " + permissions);

            //let x = await getUserByIDReturnsObjectID(userId);

            const filter = { _id: new ObjectId(userId) };
            console.log(filter);
                    // Define the new permissions object
                    
            
                    // Update the record with the new permissions object
                    const update = { $set: { permissions: permissions } };
                    console.log(update);
                    const result = await db.collection("Users").updateOne(filter, update);
                    console.log(result);
                    return result;
        }
    });

    //Updates the value of a template takes the old id of the template we want to replace, and the new json object we are replacing it with
    server.route({
        method: 'POST',
        path: '/api/updateTemplate',
        handler: async (request, h) => {
            const { oldId, newTemplate } = request.payload;
    
            if (!oldId || !newTemplate || typeof newTemplate !== 'object') {
                return h.response({ error: 'Missing or invalid parameters' }).code(400);
            }
    
            const dbCollection = db.collection("Templates");
    
            try {
                const deleteResult = await dbCollection.deleteOne({ _id: new ObjectId(oldId) });
                console.log("Delete Result:", deleteResult);
    
                if (deleteResult.deletedCount === 0) {
                    return h.response({ error: "No document found with provided _id" }).code(404);
                }
    
                // Make sure the new document has a valid _id
                if (!newTemplate._id) {
                    newTemplate._id = new ObjectId(); // Assign a new one if needed
                } else {
                    newTemplate._id = new ObjectId(newTemplate._id); // Ensure it's in correct format
                }
    
                const insertResult = await dbCollection.insertOne(newTemplate);
                console.log("Insert Result:", insertResult);
    
                return h.response({ success: true, insertedId: insertResult.insertedId }).code(200);
    
            } catch (err) {
                console.error("Error replacing template:", err);
                return h.response({ error: 'Internal server error' }).code(500);
            }
        }
    });
    
    //getMetricRecordsBy ID
    server.route({
        method: 'POST',
        path: '/api/getMetricsById',
        handler: async (request, h) => {
            try {
                const {id} = request.payload; // this is the id that the user sent in
                return await getMetricsByID(id);

            } catch (error) {
                console.error("Error handling login:", error);
                return h.response({ message: "Server error" }).code(500);
            }
        }
    });

    //getMetricRecordsBy TemplateID and RecordID
    server.route({
        method: 'POST',
        path: '/api/getMetricsByRecord',
        handler: async (request, h) => {
            try {
                const {RecordID, MetricID} = request.payload; // this is the id that the user sent in
                return await getMetricsByRecord(RecordID, MetricID);
                //console.log("Inside stuff");

            } catch (error) {
                console.error("Error handling login:", error);
                return h.response({ message: "Server error" }).code(500);
            }
        }
    });



    await server.start();
    console.log('Server running on %s', server.info.uri);
};

    



process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();


