const axios = require('axios');

//Performing a GET request
// axios.get('https://api.github.com/user', {
//     headers: {
//         'Accept': 'application/vnd.github.v3+json'
//     }
// })
//     .then(function (response) {
//         // handle success
//         //console.log(response);
//     })
//     .catch(function (error) {
//         // handle error
//         console.log(error);
//     })
//     .then(function () {
//         // always executed
//     });

getUser = async (url) => {
    try {
        const response = await axios.get(url);
        console.log(response.data,"res");
    } catch (error) {
        console.error(error,'error');
    }
}
getUser(`https://jsonplaceholder.typicode.com/posts`);
module.exports = getUser;