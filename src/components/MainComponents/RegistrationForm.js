import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

export default class RegistrationForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
             email: '',
             password: '',
             confirmPassword: '',
             name: '',
             lastName: '',
             gender: 'male',
             dateOfBirth: moment(),
             calendarFocused: false,
             levelOfEdu: 'AS',
             location: '',
             pageOneError: '',
            
             subject: '',
             format: 'classroom',
             language: 'spanish',
             level: 'Kindergarden - 3rd grade',
             size: '1 - 10',
             topicsTaught: [''],
             pageTwoError: '',

             schoolName: '',
             schoolLocation: '',
             institutionID: '',
             schoolType: 'public',
             moodle: false,
             googleClassroom: false,
             emailResource: false,
             books: false,
             socialMedia: false,
             projector: false,
             computer: false,
             tablet: false,
             stylus: false,
             internet: false,
             smartboard: false,
             smartpencil: false,
             speakers: false,
             pageThreeError: '',

             timeEmployed: moment(),
             employedCalendarFocused: false,
             spanish: false,
             english: false,
             teachingStrategies: false,
             updatedMaterial: false,
             timeManagement: false,
             technologyIntegration: false,
             instructionAlignment: false,
             pageFourError: '',

             globalError: '',

            currPage: 1
        };
    }

    //Change Handlers

    onEmailChange = (e) => {
        const email = e.target.value;
        this.setState(() => ({email}));
    }

    onPasswordChange = (e) => {
        const password = e.target.value;
        this.setState(() => ({password}));
    }

    onConfirmPasswordChange = (e) => {
        const confirmPassword = e.target.value;
        this.setState(() => ({confirmPassword}));
    }

    onNameChange = (e) => {
        const name = e.target.value;
        this.setState(() => ({name}));
    }

    onLastNameChange = (e) => {
        const lastName = e.target.value;
        this.setState(() => ({lastName}));
    }

    onGenderChange = (e) => {
        const gender = e.target.value;
        this.setState(() => ({gender}));
    }

    onDateChange = (dateOfBirth) => {
        if(dateOfBirth){
            this.setState(() => ({dateOfBirth}));
        }
    };

    onFocusChange = ({focused}) => {
        this.setState(() => ({calendarFocused: focused}));
    };

    onLOEChange = (e) => {
        const levelOfEdu = e.target.value;
        this.setState(() => ({levelOfEdu}));
    }

    onLocationChange = (e) => {
        const location = e.target.value;
        this.setState(() => ({location}));
    }

    onSubjectChange = (e) => {
        const subject = e.target.value;
        this.setState(() => ({subject}));
    }

    onFormatChange = (e) => {
        const format = e.target.value;
        this.setState(() => ({format}));
    }

    onLanguageChange = (e) => {
        const language = e.target.value;
        this.setState(() => ({language}));
    }

    onLevelChange = (e) => {
        const level = e.target.value;
        this.setState(() => ({level}));
    }

    onSizeChange = (e) => {
        const size = e.target.value;
        this.setState(() => ({size}));
    }

    onTopicChange = i => e => {
        let topics = [...this.state.topicsTaught]
        topics[i] = e.target.value;
        this.setState(() => ({topicsTaught: topics}));
    }

    deleteTopic = i => e => {
        e.preventDefault();
        if(this.state.topicsTaught.length > 1){
            let topics = [
                ...this.state.topicsTaught.slice(0,i),
                ...this.state.topicsTaught.slice(i+1)
            ];
            this.setState(() => ({topicsTaught: topics}));
        }
    }

    addTopic = (e) => {
        e.preventDefault();
        if(this.state.topicsTaught.length < 3){
            let topics = this.state.topicsTaught.concat(['']);
            this.setState(() => ({topicsTaught: topics}));
        }
    }

    onSchoolNameChange = (e) => {
        const schoolName = e.target.value;
        this.setState(() => ({schoolName}));
    }

    onSchoolLocationChange = (e) => {
        const schoolLocation = e.target.value;
        this.setState(() => ({schoolLocation}));
    }

    onSchoolTypeChange = (e) => {
        const schoolType = e.target.value;
        this.setState(() => ({schoolType}));
    }

    onInstitutionIDChange = (e) => {
        const institutionID = e.target.value;
        this.setState(() => ({institutionID}));
    }

    onMoodleChange = (e) => {
        const moodle = this.state.moodle;
        this.setState(() => ({moodle: !moodle}))
    }

    onGoogleClassroomChange = (e) => {
        const googleClassroom = this.state.googleClassroom;
        this.setState(() => ({googleClassroom: !googleClassroom}));
    }

    onEmailResourceChange = (e) => {
        const emailResource = this.state.emailResource;
        this.setState(() => ({emailResource: !emailResource}));
    }

    onBooksChange = (e) => {
        const books = this.state.books;
        this.setState(() => ({books: !books}));
    }

    onSocialMediaChange = (e) => {
        const socialMedia = this.state.socialMedia;
        this.setState(() => ({socialMedia: !socialMedia}));
    }

    onProjectorChange = (e) => {
        const projector = this.state.projector;
        this.setState(() => ({projector: !projector}));
    }

    onComputerChange = (e) => {
        const computer = this.state.computer;
        this.setState(() => ({computer: !computer}));
    }

    onTabletChange = (e) => {
        const tablet = this.state.tablet;
        this.setState(() => ({tablet: !tablet}));
    }

    onStylusChange = (e) => {
        const stylus = this.state.stylus;
        this.setState(() => ({stylus: !stylus}));
    }

    onInternetChange = (e) => {
        const internet = this.state.internet;
        this.setState(() => ({internet: !internet}));
    }

    onSmartBoardChange = (e) => {
        const smartboard = this.state.smartboard;
        this.setState(() => ({smartboard: !smartboard}));
    }

    onSmartPencilChange = (e) => {
        const smartpencil = this.state.smartpencil;
        this.setState(() => ({smartpencil: !smartpencil}));
    }

    onSpeakersChange = (e) => {
        const speakers = this.state.speakers;
        this.setState(() => ({speakers: !speakers}));
    }

    onEmployedDateChange = (timeEmployed) => {
        if(timeEmployed){
            this.setState(() => ({timeEmployed}));
        }
    };

    onEmployedFocusChange = ({focused}) => {
        this.setState(() => ({employedCalendarFocused: focused}));
    };

    onSpanishChange = (e) => {
        const spanish = this.state.spanish;
        this.setState(() => ({spanish: !spanish}));
    }

    onEnglishChange = (e) => {
        const english = this.state.english;
        this.setState(() => ({english: !english}));
    }

    onTeachingStrategiesChange = (e) => {
        const teachingStrategies = this.state.teachingStrategies;
        this.setState(() => ({teachingStrategies: !teachingStrategies}));
    }

    onUpdatedMaterialChange = (e) => {
        const updatedMaterial = this.state.updatedMaterial;
        this.setState(() => ({updatedMaterial: !updatedMaterial}));
    }

    onTimeManagementChange = (e) => {
        const timeManagement = this.state.timeManagement;
        this.setState(() => ({timeManagement: !timeManagement}));
    }

    onTechnologyIntegrationChange = (e) => {
        const technologyIntegration = this.state.technologyIntegration;
        this.setState(() => ({technologyIntegration: !technologyIntegration}));
    }

    onInstructionAlignmentChange = (e) => {
        const instructionAlignment = this.state.instructionAlignment;
        this.setState(() => ({instructionAlignment: !instructionAlignment}));
    }

    //Page Change

    toPageOne = (e) => {
        this.setState(() => ({currPage: 1}));
    }

    toPageTwo = (e) => {
        this.setState(() => ({currPage: 2}));
    }

    toPageThree = (e) => {
        this.setState(() => ({currPage: 3}));
    }

    toPageFour = (e) => {
        this.setState(() => ({currPage: 4}));
    }

    //Submit

    onSubmit = (e) => {
        e.preventDefault();
        //TO-DO Dispatch action to send data to database
    }

    //render
    render(){
        return(
            <div>
            <form onSubmit={this.onSubmit}>
                {this.state.currPage == 1 && <div>
                    <h2> General Information </h2>
                    <br/>

                    <label>Email:</label>
                    <input type="text" placeholder = "Email" value = {this.state.email} onChange={this.onEmailChange}/>
    
                    <br/>
                    <label>Password:</label>
                    <input type="password" placeholder = "Password" value = {this.state.password} onChange={this.onPasswordChange}/>
    
                    <br/>
                    <label>Confirm Password:</label>
                    <input type="password" placeholder = "Confirm Password" value = {this.state.confirmPassword} onChange={this.onConfirmPasswordChange}/>
    
                    <br/>
                    <label>Name:</label>
                    <input type = "text" placeholder = "Name" value = {this.state.name} onChange = {this.onNameChange}/>
    
                    <br/>
                    <label>Last Name:</label>
                    <input type = "text" placeholder = "Last Name" value = {this.state.lastName} onChange = {this.onLastNameChange}/>
    
                    <br/>   
                    <label>Gender:</label>
                    <br/>
                        <input type="radio" name="gender" value= "male" checked={this.state.gender === 'male'} onChange = {this.onGenderChange}/> Male<br/>
                        <input type="radio" name="gender" value= "female" checked={this.state.gender === 'female'} onChange = {this.onGenderChange}/> Female<br/>
                        <input type="radio" name="gender" value= "other" checked={this.state.gender === 'other'} onChange = {this.onGenderChange}/> Other <br/>
                    
                    <br/>
                    <label>Date of Birth:</label>
                        <br/>
                        <SingleDatePicker
                        date={this.state.dateOfBirth}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={day => (moment().diff(day) < 0)}
                        />
    
                    <br/>
                    <label>Level of Education:</label>
                    <br/>
                    <input type="radio" name="levelOfEdu" value= "AS" checked={this.state.levelOfEdu === 'AS'} onChange = {this.onLOEChange}/> Associate Degree<br/>
                    <input type="radio" name="levelOfEdu" value= "BSD" checked={this.state.levelOfEdu === 'BSD'} onChange = {this.onLOEChange}/> Bachelor's Degree<br/>
                    <input type="radio" name="levelOfEdu" value= "MSD" checked={this.state.levelOfEdu === 'MSD'} onChange = {this.onLOEChange}/> Master's Degree<br/>
                    <input type="radio" name="levelOfEdu" value= "PHD" checked={this.state.levelOfEdu === 'PHD'} onChange = {this.onLOEChange}/> Doctor of Philosophy<br/>
                    <input type="radio" name="levelOfEdu" value= "EDD" checked={this.state.levelOfEdu === 'EDD'} onChange = {this.onLOEChange}/> Doctor of Education<br/>
                    <input type="radio" name="levelOfEdu" value= "NA" checked={this.state.levelOfEdu === 'NA'} onChange = {this.onLOEChange}/> None<br/>

                    <br/>
                    <label>Location of Employment:</label>
                        <input type="text" placeholder="Location" value={this.state.location} onChange={this.onLocationChange}/>
    
                <br/>
                <button onClick={this.toPageTwo}>Next</button>
                </div>}

                <br/>
                {this.state.currPage == 2 && <div>
                    <h2> Class Information </h2>
                    <br/>
                    <label>Subject:</label>
                    <input type="text" placeholder="Subject" value={this.state.subject} onChange={this.onSubjectChange}/>

                    <br/>
                    <label>Class Format:</label>
                    <br/>
                    <input type="radio" name="format" value= "classroom" checked={this.state.format === 'classroom'} onChange = {this.onFormatChange}/> Classroom<br/>
                    <input type="radio" name="format" value= "blended" checked={this.state.format === 'blended'} onChange = {this.onFormatChange}/> Blended<br/>
                    <input type="radio" name="format" value= "online" checked={this.state.format === 'online'} onChange = {this.onFormatChange}/> Online <br/>
                
                    <br/>
                    <label>Language:</label>
                    <br/>
                    <input type="radio" name="lang" value= "spanish" checked={this.state.language === 'spanish'} onChange = {this.onLanguageChange}/> Spanish<br/>
                    <input type="radio" name="lang" value= "english" checked={this.state.language === 'english'} onChange = {this.onLanguageChange}/> English<br/>
                    
                    <br/>
                    <label>Level:</label>
                    <br/>
                    <input type="radio" name="level" value= "Kindergarden - 3rd grade" checked={this.state.level === 'Kindergarden - 3rd grade'} onChange = {this.onLevelChange}/> Kindergarden - 3rd grade<br/>
                    <input type="radio" name="level" value= "4th - 6th grade" checked={this.state.level === '4th - 6th grade'} onChange = {this.onLevelChange}/> 4th - 6th grade<br/>
                    <input type="radio" name="level" value= "7th - 8th grade" checked={this.state.level === '7th - 8th grade'} onChange = {this.onLevelChange}/> 7th - 8th grade <br/>
                    <input type="radio" name="level" value= "9th - 12th grade" checked={this.state.level === '9th - 12th grade'} onChange = {this.onLevelChange}/> 9th - 12th grade<br/>
                    <input type="radio" name="level" value= "University / College" checked={this.state.level === 'University / College'} onChange = {this.onLevelChange}/> University / College<br/>

                    <br/>
                    <label>Group Size</label>
                    <br/>
                    <input type="radio" name="size" value= "1 - 10" checked={this.state.size === '1 - 10'} onChange = {this.onSizeChange}/> 1 - 10<br/>
                    <input type="radio" name="size" value= "11 - 20" checked={this.state.size === '11 - 20'} onChange = {this.onSizeChange}/> 11 - 20<br/>
                    <input type="radio" name="size" value= "21 - 30" checked={this.state.size === '21 - 30'} onChange = {this.onSizeChange}/> 21 - 30 <br/>
                    <input type="radio" name="size" value= "31+" checked={this.state.size === '31+'} onChange = {this.onSizeChange}/> 31+<br/>
                    
                    <label>Topics Taught (Max: 3):</label>
                    {this.state.topicsTaught.map((topic, index) => (
                        <span key={index}>
                            <br/>
                            <input
                            type = "text"
                            placeholder = "Topic"
                            value={topic}
                            onChange={this.onTopicChange(index)}
                            />
                            <button onClick={this.deleteTopic(index)}>X</button>
                        </span>
                    ))}
                    <br/>
                    <button onClick={this.addTopic} disabled={this.state.topicsTaught.length === 3}>Add New Topic</button>

                    <br/>
                    <button onClick={this.toPageOne}>Back</button> <button onClick={this.toPageThree}>Next</button>
                </div>}

                {this.state.currPage == 3 && <div>
                    <h2>School Information</h2>
                    <br/>
                    <label>School Name:</label>
                    <input type="text" placeholder="School Name" value={this.state.schoolName} onChange={this.onSchoolNameChange}/>

                    <br/>
                    <label>School Location:</label>
                    <input type="text" placeholder="School Location" value={this.state.schoolLocation} onChange={this.onSchoolLocationChange}/>

                    <br/>
                    <label>Institution ID (Optional):</label>
                    <input type="text" placeholder="Institution ID" value={this.state.institutionID} onChange={this.onInstitutionIDChange}/>

                    <br/>
                    <label>School System:</label>
                    <br/>
                    <input type="radio" name="system" value= "public" checked={this.state.schoolType === 'public'} onChange = {this.onSchoolTypeChange}/> Public<br/>
                    <input type="radio" name="system" value= "private" checked={this.state.schoolType === 'private'} onChange = {this.onSchoolTypeChange}/> Private<br/>
                    <input type="radio" name="system" value= "independent" checked={this.state.schoolType === 'independent'} onChange = {this.onSchoolTypeChange}/> Independent <br/>
                    
                    <br/>
                    <label>What resources do you use in your school?</label>
                    <br/>
                    <input type="checkbox" name="resource" checked={this.state.moodle === true} onChange={this.onMoodleChange}/> Moodle <br/>
                    <input type="checkbox" name="resource" checked={this.state.googleClassroom === true} onChange={this.onGoogleClassroomChange}/> Google Classroom <br/>
                    <input type="checkbox" name="resource" checked={this.state.emailResource === true} onChange={this.onEmailResourceChange}/> Emails <br/>
                    <input type="checkbox" name="resource" checked={this.state.books === true} onChange={this.onBooksChange}/> Books <br/>
                    <input type="checkbox" name="resource" checked={this.state.socialMedia === true} onChange={this.onSocialMediaChange}/> Social Media <br/>
                    
                    <br/>
                    <label>Which resources do you have access to?</label>
                    <br/>
                    <input type="checkbox" name="resource" checked={this.state.projector === true} onChange={this.onProjectorChange}/> Projector <br/>
                    <input type="checkbox" name="resource" checked={this.state.computer === true} onChange={this.onComputerChange}/> Computer <br/>
                    <input type="checkbox" name="resource" checked={this.state.tablet === true} onChange={this.onTabletChange}/> Tablet <br/>
                    <input type="checkbox" name="resource" checked={this.state.stylus === true} onChange={this.onStylusChange}/> Stylus <br/>
                    <input type="checkbox" name="resource" checked={this.state.internet === true} onChange={this.onInternetChange}/> Internet <br/>
                    <input type="checkbox" name="resource" checked={this.state.smartboard === true} onChange={this.onSmartBoardChange}/> Smart Board <br/>
                    <input type="checkbox" name="resource" checked={this.state.smartpencil === true} onChange={this.onSmartPencilChange}/> Smart Pencil <br/>
                    <input type="checkbox" name="resource" checked={this.state.speakers === true} onChange={this.onSpeakersChange}/> Speakers <br/>

                    <br/>
                    <button onClick={this.toPageTwo}>Back</button> <button onClick={this.toPageFour}>Next</button>
                </div>}

                {this.state.currPage == 4 && <div>
                    <h2>Profile</h2>
                    <br/>

                    <label>Employed Since:</label>
                    <br/>
                    <SingleDatePicker
                        date={this.state.timeEmployed}
                        onDateChange={this.onEmployedDateChange}
                        focused={this.state.employedCalendarFocused}
                        onFocusChange={this.onEmployedFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={day => (moment().diff(day) < 0)}
                        />

                    <br/>
                    <label>Known Languages:</label>
                    <br/>
                    <input type="checkbox" name="preflang" value= "spanish" checked={this.state.spanish === true} onChange = {this.onSpanishChange}/> Spanish<br/>
                    <input type="checkbox" name="preflang" value= "english" checked={this.state.english === true} onChange = {this.onEnglishChange}/> English <br/>
                    
                    <br/>
                    <label>Challenges:</label>
                    <br/>
                    <input type="checkbox" name="resource" checked={this.state.teachingStrategies === true} onChange={this.onTeachingStrategiesChange}/> Teaching Strategies <br/>
                    <input type="checkbox" name="resource" checked={this.state.updatedMaterial === true} onChange={this.onUpdatedMaterialChange}/> Updated Material <br/>
                    <input type="checkbox" name="resource" checked={this.state.timeManagement === true} onChange={this.onTimeManagementChange}/> Time Management <br/>
                    <input type="checkbox" name="resource" checked={this.state.technologyIntegration === true} onChange={this.onTechnologyIntegrationChange}/> Technology Integration <br/>
                    <input type="checkbox" name="resource" checked={this.state.instructionAlignment === true} onChange={this.onInstructionAlignmentChange}/> Instruction Alignment <br/>

                    <br/>
                    <button onClick={this.toPageThree}>Back</button> <button onClick={this.onSubmit}>Submit</button>
                </div>}
                </form>
            </div>
        );
    }
}