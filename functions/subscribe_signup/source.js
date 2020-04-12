exports = function(email, name){
  const sendgrid_api_key = context.values.get("sendgrid_api_key");
  let body = {
	  "contacts": [{
	    "email": email
	  }]
  };
  if (name) {
    body['contacts'][0]['unique_name'] = name;
  }
  return context.http
    .put({ 
      url: `https://api.sendgrid.com/v3/marketing/contacts`,
      headers: {
        "Authorization": [
          `Bearer ${sendgrid_api_key}`
        ]
      },
      body: body,
      encodeBodyAsJSON: true
    })
    .then((response) => {
      if (response['statusCode'] !== 202) {
        console.log('Error: ', JSON.stringify(response));
      }
      return response;
    });
};