window.addEventListener('DOMContentLoaded', async () => {
    const url = 'http://localhost:8000/api/locations/';

    const response = await fetch(url);

    if (response.ok) {
        const data = await response.json();

        const selectTag = document.getElementById('location');



        for (let i = 0; i < data.locations.length; i++) {
            const location = data.locations[i]
            const name = location.name
            const id = location.id
            const option = document.createElement('option');
            option.innerHTML = name;
            option.value = id;
            selectTag.appendChild(option)            
        }
    }

    const formTag = document.getElementById('create-conference-form');
    formTag.addEventListener('submit', async event => {
        event.preventDefault();
        const formData = new FormData(formTag);
        const json = JSON.stringify(Object.fromEntries(formData));

        const locationURL = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
            method: "post",
            body: json,
            headers: {
                'Content-Type': 'application/json',
            },
        };
            const response = await fetch(locationURL, fetchConfig);
            if (response.ok) {
                formTag.reset();
                const responseJson = await response.json();
                const newConference = responseJson; 
                console.log(newConference);
            }

    });

});