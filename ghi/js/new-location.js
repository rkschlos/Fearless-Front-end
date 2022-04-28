//when the page loads

//call that RESTful API we just created
//get the data back
//loop through it 
// for each state in it
    // create an option element that has the value of the abbreviation and text of name


// add an event listener for when the DOM (document object model) loads
window.addEventListener('DOMContentLoaded', async () => {
    const url = 'http://localhost:8000/api/states/';

    const response = await fetch(url);

    if (response.ok) {
        const data = await response.json();
    
        const selectTag = document.getElementById('state');
        

        //For each state in the states property of the data
        for (let state of data.states){
            const option = document.createElement('option');
            option.innerHTML = Object.keys(state)[0];
            option.value = Object.values(state)[0];
            selectTag.appendChild(option);
        }
    }
    

    const formTag = document.getElementById('create-location-form') // found specific form tag's id we are referencign in the html 
    formTag.addEventListener('submit', async event => {
        event.preventDefault();
        const formData = new FormData(formTag);
        const json = JSON.stringify(Object.fromEntries(formData));

        const locationUrl = 'http://localhost:8000/api/locations/';
        debugger;
        const fetchConfig = {
            method: "post",
            body: json, 
            headers: {
                'Content-Type': 'application/json',
            },
        };
            const response = await fetch(locationUrl, fetchConfig);
            if (response.ok) {
                formTag.reset();
                const responseJson = await response.json();
                const newLocation = responseJson; 
                console.log(newLocation);
            }
    });



});