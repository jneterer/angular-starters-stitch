exports = function(email, name){
  const mailchimp_api_key = context.values.get("mailchimp_api_key");
  const mailchimp_listid = context.values.get("mailchimp_listid");
  let body = {
	  "email_address": email,
	  "email_type": "text",
	  "status": "subscribed",
	  "tags": [
      "Homepage Subscribe Form"
    ]
  };
  if (name) {
    body['merge_fields'] = {
      "FLNAME": name
    };
  }
  return context.http
    .post({ 
      url: `https://us19.api.mailchimp.com/3.0/lists/${mailchimp_listid}/members`,
      headers: {
        "Authorization": [
          `Basic ${mailchimp_api_key}`
        ]
      },
      body: body,
      encodeBodyAsJSON: true
    })
    .then((response) => {
      if (response['statusCode'] !== 200) {
        console.log('Error: ', JSON.stringify(response));
      }
      return response;
    });
};