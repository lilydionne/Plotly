const url = "https://api.spacexdata.com/v2/launchpads";

d3.json(url).then(receivedData => console.log(receivedData));
d3.json(url).then(receivedData => console.log([receivedData.map(para => para.location.latitude), receivedData.map(para => para.location.longitude)]));
