async function getMetrics()
{
    const url = 'http://localhost:3000/api/getMetrics'
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

async function addMetricRecord(query) {
    const url = 'http://localhost:3000/api/addMetric';
    const datas = query;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datas)
      });
  
      if (!response.ok) {
        throw new Error(`Server responded ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('addMetricRecord response:', data);
      return data;
    } catch (err) {
      console.error('addMetricRecord error:', err);
      throw err;
    }
  }


async function addMetricTemplate(query)
{
    const url = 'http://localhost:3000/api/addMetricTemplate'
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

async function getMetricTemplates()
{
    const url = 'http://localhost:3000/api/getMetricTemplates'
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

async function getMetricTemplatesByID(id) {
    const url = 'http://localhost:3000/api/getMetricsById';
    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body:   JSON.stringify({ id })
    });
    
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await resp.json();
    //console.log(data);
    return data;      // ← now your async function actually returns the array
  }

async function getMetricRecordsBySpeficRecord(RecordID, MetricID)
{
    const url = 'http://localhost:3000/api/getMetricsByRecord';
    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body:   JSON.stringify({ RecordID, MetricID })
    });
    
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await resp.json();
    //console.log(data);
    return data;      // ← now your async function actually returns the array
}

async function test()
{
    console.log(await getMetrics());
    console.log(await getMetricRecordsBySpeficRecord('67fefa2e996707d09b81acb4', '68056b10b5a77f1cde9e3af6'));
}

test();

