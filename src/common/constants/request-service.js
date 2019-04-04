const Http = {
  get: (url, callback, errorCallback) => {
    fetch(url)
      .then(response => {
        if (response.status !== 200) {
          console.log('Error. Status Code: ' + response.status);
          if (typeof errorCallback === "function") errorCallback();
          return;
        }
        response.json().then(data => callback(data))
      })
      .catch(err => console.log('Request Failed: ' + err))
  }
};

export default Http