import React from 'react';

className ConferenceForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            startDate: '',
            endDate: '',
            description: '',
            maxPresentations: '',
            maxAttendees: '',
            locations: [],
        };
        //you have to bind the function to this instance!!! Does not do it automatically!
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleMaxPresentationChange = this.handleMaxPresentationChange.bind(this);
        this.handleMaxAttendeesChange = this.handleMaxAttendeesChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({name: value})
    }

    handleStartDateChange(event) {
        const value = event.target.value;
        this.setState({startDate: value})
    }

    handleEndDateChange(event) {
        const value = event.target.value;
        this.setState({endDate: value})
    }

    handleDescriptionChange(event) {
        const value = event.target.value;
        this.setState({description: value})

    handleMaxPresentationChange(event) {
        const value = event.target.value;
        this.setState({maxPresentations: value})
    }

    handleMaxAttendeesChange(event) {
        const value = event.target.value;
        this.setState({maxAttendees: value})
    }

    handleLocationChange(event) {
        const value = event.target.value;
        this.setState({locations: value})
    }

    async componentDidMount() {
        const url = "http://localhost:8000/api/conferences/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();

            this.setState({locations: data.locations});
        }
    }



    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        //below- translating python(how it is stored, to Javascript)
        data.starts = data.startDate;
        data.ends = data.endDate;
        data.max_presentations = data.maxPresentations;
        data.max_attendees = data.maxAttendees;
        delete data.startDate;
        delete data.endDate;
        delete data.maxPresentations;
        delete data.maxAttendees;
        delete data.locations;

        const conferenceUrl = "http://localhost:8000/api/conferences/"



    }

    render() {
        return (
            <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1>Create a new conference</h1>
                <form onSubmit={this.handleSubmit} id="create-conference-form">
                  <div className="form-floating mb-3">
                    <input onChange = {this.handleNameChange} placeholder="Name" required type="text" name="name" value= {this.state.name} id="name" className="form-control">
                    <label htmlFor="name">Name</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input onChange = {this.handleStartDateChange} placeholder="Starts" required type="date" name="starts" value={this.state.startDate} id="starts" className="form-control">
                    <label htmlFor="starts">Starts</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input onChange = {this.handleEndDateChange} placeholder="Ends" required type="date" name="ends" value={this.state.endDate} id="ends" className="form-control">
                    <label htmlFor="ends">Ends</label>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea onChange={this.handleDescriptionChange} placeholder="Description" required type="text" name="description" id="description" className="form-control" rows="3"></textarea>  
                  </div>

                  <div className="form-floating mb-3">
                    <input placeholder="Max presentations" required type="number" name="max_presentations" id="max_presentations" className="form-control">
                    <label htmlFor="max_presentations">Max presentations</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input placeholder="Max Attendees" required type="number" name="max_attendees" id="max_attendees" className="form-control">
                    <label htmlFor="max_attendees">Max attendees</label>
                  </div>

                  <div className="mb-3">
                    <select onChange= {this.handleLocationChange} required id="location" name="location" value= {this.state.location} className="form-select"> 
                      <option value="">Choose a location</option>
                      {this.state.locations.map(location => {
                          return (
                              <option key={location.name} value={location.id}>
                                  {location.name}
                              </option>
                          );
                      })}
                    </select>
                  </div>
                  <button className="btn btn-primary">Create</button>
                </form>
              </div>
            </div>
          </div>
        )
    }
}