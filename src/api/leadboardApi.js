import axios from 'axios';


const leadboardApiEndpoint='http://harkulwantpalindromecheckerapi-prod.ap-southeast-2.elasticbeanstalk.com/api/v1/palindrome';

// All calls return promises.
const leads = [];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (lead) => {
  return replaceAll(lead.value, ' ', '-');
};

class LeadApi {

  static getAllLeads() {
    return new Promise((resolve, reject) => {
       axios.get(leadboardApiEndpoint)
      .then(function(response){

        leads.push.apply(leads, response.data);

        resolve(Object.assign([], leads));
      })
      .catch(error => reject(error));
    });
  }

  static saveLead(request) {
    // lead = Object.assign({}, lead); // to avoid manipulating object passed in.

    let leadRequest = JSON.parse(JSON.stringify(request)); // deep-clone to avoid manipulating request object passed in.
    let lead = leadRequest.lead;

    return new Promise((resolve, reject) => {

    // Simulate server-side validation
    const minLeadnameLength = 3;
      if (lead.value.length < minLeadnameLength) {
        reject(`value must be at least ${minLeadnameLength} characters.`);
        return false;
      }

      axios.post(leadboardApiEndpoint, lead)
      .then(function(response){

        if (lead.id) {
          const existingLeadIndex = leads.findIndex(a => a.id == lead.id);
          leads.splice(existingLeadIndex, 1, lead);
        } else {
          //Just simulating creation here.
          //The server would generate ids and phone's for new leads in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          lead.id = generateId(lead);
          leads.push(lead);
        }

        resolve(lead);
      })
      .catch(error => reject(error));

    });
  }
}

export default LeadApi;