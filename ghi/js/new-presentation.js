function createPresentationUrl(id) {
    return `http://localhost:8000/api/conferences/${id}/presentations/`
}


window.addEventListener('DOMContentLoaded', async () => {
    const url = 'http://localhost:8000/api/conferences/';

    const response = await fetch(url);

    if (response.ok) {
        const data = await response.json();

        const selectConference = document.getElementById('conference');
        for (let conference in data.conferences) {
            const option = document.createElement('option');
            option.value = conference.href;
            option.innerHTML = conference.name
            selectConference.appendChild(option);       
        }
    }

    const formTag = document.getElementById('create-presentation-form');
    formTag.addEventListener('submit', async event => {
        event.preventDefault();
        const formData = new FormData(formTag);
        const conferenceId = formData.get('conference');
        console.log(conferenceID);
        const presentationUrl = createPresentationUrl(conferenceId);
        const json = JSON.stringify(Object.fromEntries(formData));
        const fetchConfig = {
            method: "post",
            body: json,
            headers: {
                'Content-Type': 'application/json',
            },
        };
            const response = await fetch(presentationUrl, fetchConfig);
            if (response.ok) {
                formTag.reset();
                const responseJson = await response.json();
                const newPresentation = responseJson; 
                console.log(newPresentation);
            }

    });

});