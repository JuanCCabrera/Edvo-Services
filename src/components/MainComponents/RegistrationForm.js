import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux';
import axios from 'axios';
import auth0Client from '../../Auth';
import { Redirect, BrowserRouter, Route } from 'react-router-dom';

/**
 * The Registration form is used to generate the full profile information for a user of the Teacher type. 
 * It is only accessible by logged in users which have NOT completed this form previously. 
 */
class RegistrationForm extends React.Component{
    constructor(props){
        super(props);
        //Input fields which are required: name, last name, gender, date of birth, level of education, location,
        //class subject, class format, class language, class level, class group size, class topics, 
        //school name, school location, school type, time since first employment, known languages, 
        //accepting terms of use and accepting privacy policy
        this.state = {
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

             termsOfUse: false,
             privacyPolicy: false,

             secError: false,

             globalError: false,

            currPage: 1
        };
    }

    //Change name in local state
    onNameChange = (e) => {
        const name = e.target.value;
        this.setState(() => ({name}));
    }

    //Change last name in local state
    onLastNameChange = (e) => {
        const lastName = e.target.value;
        this.setState(() => ({lastName}));
    }

    //Change gender in local state
    onGenderChange = (e) => {
        const gender = e.target.value;
        this.setState(() => ({gender}));
    }

    //Change date in local state
    onDateChange = (dateOfBirth) => {
        if(dateOfBirth){
            this.setState(() => ({dateOfBirth}));
        }
    };

    //Change calendarFocused in local state
    onFocusChange = ({focused}) => {
        this.setState(() => ({calendarFocused: focused}));
    };

    //Change level of education in local state
    onLOEChange = (e) => {
        const levelOfEdu = e.target.value;
        this.setState(() => ({levelOfEdu}));
    }

    //Change location in local state
    onLocationChange = (e) => {
        const location = e.target.value;
        this.setState(() => ({location}));
    }

    //Change class subject in local state
    onSubjectChange = (e) => {
        const subject = e.target.value;
        this.setState(() => ({subject}));
    }

    //Change class format in local state
    onFormatChange = (e) => {
        const format = e.target.value;
        this.setState(() => ({format}));
    }

    //Change class language in local state
    onLanguageChange = (e) => {
        const language = e.target.value;
        this.setState(() => ({language}));
    }

    //Change class level in local state
    onLevelChange = (e) => {
        const level = e.target.value;
        this.setState(() => ({level}));
    }

    //Change class group size in local state
    onSizeChange = (e) => {
        const size = e.target.value;
        this.setState(() => ({size}));
    }

    //Change topics in local state
    onTopicChange = i => e => {
        let topics = [...this.state.topicsTaught]
        topics[i] = e.target.value;
        this.setState(() => ({topicsTaught: topics}));
    }

    //Delete topic from topics array in local state
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

    //Add topic to topics array in local state
    addTopic = (e) => {
        e.preventDefault();
        if(this.state.topicsTaught.length < 3){
            let topics = this.state.topicsTaught.concat(['']);
            this.setState(() => ({topicsTaught: topics}));
        }
    }

    //Change school name in local state
    onSchoolNameChange = (e) => {
        const schoolName = e.target.value;
        this.setState(() => ({schoolName}));
    }

    //Change school location in local state
    onSchoolLocationChange = (e) => {
        const schoolLocation = e.target.value;
        this.setState(() => ({schoolLocation}));
    }

    //Change school type in local state
    onSchoolTypeChange = (e) => {
        const schoolType = e.target.value;
        this.setState(() => ({schoolType}));
    }

    //Change institution ID in local state
    onInstitutionIDChange = (e) => {
        const institutionID = e.target.value;
        this.setState(() => ({institutionID}));
    }

    //Change moodle boolean in local state
    onMoodleChange = (e) => {
        const moodle = this.state.moodle;
        this.setState(() => ({moodle: !moodle}));
    }

    //Change google classroom boolean in local state
    onGoogleClassroomChange = (e) => {
        const googleClassroom = this.state.googleClassroom;
        this.setState(() => ({googleClassroom: !googleClassroom}));
    }

    //Change email resource boolean in local state
    onEmailResourceChange = (e) => {
        const emailResource = this.state.emailResource;
        this.setState(() => ({emailResource: !emailResource}));
    }

    //Change books resource boolean in local state
    onBooksChange = (e) => {
        const books = this.state.books;
        this.setState(() => ({books: !books}));
    }

    //Change social media boolean in local state
    onSocialMediaChange = (e) => {
        const socialMedia = this.state.socialMedia;
        this.setState(() => ({socialMedia: !socialMedia}));
    }

    //Change projector boolean in local state
    onProjectorChange = (e) => {
        const projector = this.state.projector;
        this.setState(() => ({projector: !projector}));
    }

    //Change computer boolean in local state
    onComputerChange = (e) => {
        const computer = this.state.computer;
        this.setState(() => ({computer: !computer}));
    }

    //Change tablet boolean in local state
    onTabletChange = (e) => {
        const tablet = this.state.tablet;
        this.setState(() => ({tablet: !tablet}));
    }

    //Change stylus boolean in local state
    onStylusChange = (e) => {
        const stylus = this.state.stylus;
        this.setState(() => ({stylus: !stylus}));
    }

    //Change internet boolean in local state
    onInternetChange = (e) => {
        const internet = this.state.internet;
        this.setState(() => ({internet: !internet}));
    }

    //Change smart board boolean in local state
    onSmartBoardChange = (e) => {
        const smartboard = this.state.smartboard;
        this.setState(() => ({smartboard: !smartboard}));
    }

    //Change smart pencil boolean in local state
    onSmartPencilChange = (e) => {
        const smartpencil = this.state.smartpencil;
        this.setState(() => ({smartpencil: !smartpencil}));
    }

    //Change speakers boolean in local state
    onSpeakersChange = (e) => {
        const speakers = this.state.speakers;
        this.setState(() => ({speakers: !speakers}));
    }

    //Change employed date in local state
    onEmployedDateChange = (timeEmployed) => {
        if(timeEmployed){
            this.setState(() => ({timeEmployed}));
        }
    };

    //Change employedCalendarFocused in local state
    onEmployedFocusChange = ({focused}) => {
        this.setState(() => ({employedCalendarFocused: focused}));
    };

    //Change spanish boolean in local state
    onSpanishChange = (e) => {
        const spanish = this.state.spanish;
        this.setState(() => ({spanish: !spanish}));
    }

    //Change english boolean in local state
    onEnglishChange = (e) => {
        const english = this.state.english;
        this.setState(() => ({english: !english}));
    }

    //Change teaching strategies boolean in local state
    onTeachingStrategiesChange = (e) => {
        const teachingStrategies = this.state.teachingStrategies;
        this.setState(() => ({teachingStrategies: !teachingStrategies}));
    }

    //Change updated material boolean in local state
    onUpdatedMaterialChange = (e) => {
        const updatedMaterial = this.state.updatedMaterial;
        this.setState(() => ({updatedMaterial: !updatedMaterial}));
    }

    //Change time management boolean in local state
    onTimeManagementChange = (e) => {
        const timeManagement = this.state.timeManagement;
        this.setState(() => ({timeManagement: !timeManagement}));
    }

    //Change technology integration boolean in local state
    onTechnologyIntegrationChange = (e) => {
        const technologyIntegration = this.state.technologyIntegration;
        this.setState(() => ({technologyIntegration: !technologyIntegration}));
    }

    //Change instructional alignment boolean in local state
    onInstructionAlignmentChange = (e) => {
        const instructionAlignment = this.state.instructionAlignment;
        this.setState(() => ({instructionAlignment: !instructionAlignment}));
    }

    //Change terms of use boolean in local state
    onTermsChange = (e) => {
        const termsOfUse = this.state.termsOfUse;
        this.setState(() => ({termsOfUse: !termsOfUse}));
    }

    //Change privacy policy boolean in local state
    onPrivacyChange = (e) => {
        const privacyPolicy = this.state.privacyPolicy;
        this.setState(() => ({privacyPolicy: !privacyPolicy}));
    }

    //Page Change functions.
    //Once used, each one will take the user to a specific page (currPage). These are accessed by buttons on the bottom of the Registration page. 

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

    //Submit registration information

    onSubmit = (e) => {
        e.preventDefault();
        //Display specific message if terms of use or privacy policy is not accepted.
        if(!this.state.termsOfUse || !this.state.privacyPolicy){
            this.setState(() => ({secError: true, globalError: false}));
        }
        //Display default error message if there are required fields left blank. 
        else if(!this.state.name || !this.state.lastName || !this.state.location || !this.state.subject || !this.state.topicsTaught[0] || !this.state.schoolName || !this.state.schoolLocation || (!this.state.english && !this.state.spanish)){
            this.setState(() => ({globalError: true, secError: false}));
        }else{
            this.setState(() => ({secError: false, globalError: false}));
            axios.post('http://localhost:3000/register', {
                usertype: 'teacher',
                name: this.state.name,
                lastname: this.state.lastName,
                gender: this.state.gender,
                email: this.state.email,
                password: this.state.password,
                dob: this.state.dateOfBirth,
                policies: true,
                teachersince: this.state.timeEmployed,
                education: this.state.levelOfEdu,
                english: true,
                spanish: true,
                strategies: this.state.teachingStrategies,
                material: this.state.updatedMaterial,
                timemanagement: this.state.timeManagement,
                tech: this.state.technologyIntegration,
                instructions: this.state.instructionAlignment,
                schoolname: this.state.schoolName,
                location: this.state.location,
                schooltype: this.state.schoolType,
                moodle: this.state.moodle,
                googleclassroom: this.state.googleClassroom,
                emails: this.state.emailResource,
                books: this.state.books,
                applications: true,
                socialmedia: this.state.socialMedia,
                projector: this.state.projector,
                computer: this.state.computer,
                tablet: this.state.tablet,
                stylus: this.state.stylus,
                internet: this.state.internet,
                smartboard: this.state.smartboard,
                smartpencil: this.state.smartpencil,
                speakers: this.state.speakers,

                subject: this.state.subject,
                format: this.state.format,
                language: 'spanish',
                level: this.state.level,
                groupsize: this.state.size,
                topics: this.state.topicsTaught,
                pageTwoError: this.state.pageTwoError,
                level: this.state.level,
                schoolLocation: this.state.schoolLocation,
                institutionID: this.state.institutionID,
                pageThreeError: this.state.pageThreeError,

                employedCalendarFocused: this.state.employedCalendarFocused,
                preferredLanguage: this.state.preferredLanguage,
                pageFourError: this.state.pageFourError,

                globalError: this.state.globalError,

                currPage: this.state.currPage
            },
            {headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }})
            .then(response =>{
                console.log("PROPS1: ",this.state.props);
                this.state.props.history.replace('/teacher/settings/plans');
            })
            .catch(error =>{
                this.state.props.history.replace('/');
            });
        }
        
        }

    render(){
        return(
            <div>
            <form onSubmit={this.onSubmit}>
            {
                //Page one
            }
                {this.state.currPage == 1 && <div>
                    <h2> General Information </h2>
                    <br/>
                    {
                        //Name input field
                    }
                    <label>{this.props.lang === 'English' ? 'Name' : 'Nombre'}:</label>
                    <input type = "text" placeholder = "Name" value = {this.state.name} onChange = {this.onNameChange}/>
    
                    <br/>
                    {
                        //Last name input field
                    }
                    <label>{this.props.lang === 'English' ? 'Last Name' : 'Apellido'}:</label>
                    <input type = "text" placeholder = "Last Name" value = {this.state.lastName} onChange = {this.onLastNameChange}/>
    
                    <br/> 
                    {
                        //Gender radio selector
                    }  
                    <label>{this.props.lang === 'English' ? 'Gender' : 'Género'}:</label>
                    <br/>
                        <input type="radio" name="gender" value= "male" checked={this.state.gender === 'male'} onChange = {this.onGenderChange}/> {this.props.lang === 'English' ? 'Male' : 'Masculino'}<br/>
                        <input type="radio" name="gender" value= "female" checked={this.state.gender === 'female'} onChange = {this.onGenderChange}/> {this.props.lang === 'English' ? 'Female' : 'Femenino'}<br/>
                    {
                       //<input type="radio" name="gender" value= "other" checked={this.state.gender === 'other'} onChange = {this.onGenderChange}/> {this.props.lang === 'English' ? 'Other' : 'Otro'} <br/>
                    }

                    <br/>
                    {
                        //Date of birth selector
                    }
                    <label>{this.props.lang === 'English' ? 'Date of Birth' : 'Fecha de Nacimiento'}:</label>
                        <br/>

                        {/*
                        <SingleDatePicker
                        date={this.state.dateOfBirth}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={3}
                        isOutsideRange={day => (moment().diff(day) < 0)}
                        />
                        */}

                        <DatePicker
                        selected={this.state.dateOfBirth}
                        onChange={this.onDateChange}
                        />
    
                    <br/>
                    {
                        //Level of education radio selector
                    }
                    <label>{this.props.lang === 'English' ? 'Level of Education' : 'Nivel de Educación'}:</label>
                    <br/>
                    <input type="radio" name="levelOfEdu" value= "AS" checked={this.state.levelOfEdu === 'AS'} onChange = {this.onLOEChange}/> {this.props.lang === 'English' ? 'Associate\'s Degree' : 'Grado Asociado'}<br/>
                    <input type="radio" name="levelOfEdu" value= "BSD" checked={this.state.levelOfEdu === 'BSD'} onChange = {this.onLOEChange}/> {this.props.lang === 'English' ? 'Bachellor\'s Degree' : 'Bachillerato'}<br/>
                    <input type="radio" name="levelOfEdu" value= "MSD" checked={this.state.levelOfEdu === 'MSD'} onChange = {this.onLOEChange}/> {this.props.lang === 'English' ? 'Master\'s Degree' : 'Maestría'}<br/>
                    <input type="radio" name="levelOfEdu" value= "PHD" checked={this.state.levelOfEdu === 'PHD'} onChange = {this.onLOEChange}/> {this.props.lang === 'English' ? 'Doctor of Philosophy' : 'Doctor en Filosofía'}<br/>
                    <input type="radio" name="levelOfEdu" value= "EDD" checked={this.state.levelOfEdu === 'EDD'} onChange = {this.onLOEChange}/>  {this.props.lang === 'English' ? 'Doctor of Education' : 'Doctor en Educación'}<br/>
                    <input type="radio" name="levelOfEdu" value= "NA" checked={this.state.levelOfEdu === 'NA'} onChange = {this.onLOEChange}/> {this.props.lang === 'English' ? 'None' : 'Ninguna'}<br/>

                    <br/>
                    {
                        //Location of employment input field
                    }
                    <label>{this.props.lang === 'English' ? 'Location of Employment' : 'Localización de Empleo'}:</label>
                        <input type="text" placeholder="Location" value={this.state.location} onChange={this.onLocationChange}/>
    
                <br/>
                {
                    //Button to change page to page 2
                }
                <button onClick={this.toPageTwo}>{this.props.lang === 'English' ? 'Next' : 'Continuar'}</button>
                </div>}

                <br/>
                {
                    //Page two
                }
                {this.state.currPage == 2 && <div>
                    <h2> {this.props.lang === 'English' ? 'Class Information' : 'Información de Clase'} </h2>
                    <br/>
                    {
                        //Class subject input field
                    }
                    <label>{this.props.lang === 'English' ? 'Subject' : 'Tema'}:</label>
                    <input type="text" placeholder="Subject" value={this.state.subject} onChange={this.onSubjectChange}/>

                    <br/>
                    {
                        //Class format radio selector
                    }
                    <label>{this.props.lang === 'English' ? 'Class Format' : 'Formato de Clase'}:</label>
                    <br/>
                    <input type="radio" name="format" value= "classroom" checked={this.state.format === 'classroom'} onChange = {this.onFormatChange}/> {this.props.lang === 'English' ? 'Classroom' : 'Salón de Clases'}<br/>
                    <input type="radio" name="format" value= "blended" checked={this.state.format === 'blended'} onChange = {this.onFormatChange}/> {this.props.lang === 'English' ? 'Blended' : 'Mixto'}<br/>
                    <input type="radio" name="format" value= "online" checked={this.state.format === 'online'} onChange = {this.onFormatChange}/> {this.props.lang === 'English' ? 'Online' : 'En Línea'} <br/>
                
                    <br/>
                    {
                        //Class language radio seelctor
                    }
                    <label>{this.props.lang === 'English' ? 'Language' : 'Lenguaje'}:</label>
                    <br/>
                    <input type="radio" name="lang" value= "spanish" checked={this.state.language === 'spanish'} onChange = {this.onLanguageChange}/> {this.props.lang === 'English' ? 'Spanish' : 'Español'}<br/>
                    <input type="radio" name="lang" value= "english" checked={this.state.language === 'english'} onChange = {this.onLanguageChange}/> {this.props.lang === 'English' ? 'English' : 'Inglés'}<br/>
                    
                    <br/>
                    {
                        //Class level radio selector
                    }
                    <label>{this.props.lang === 'English' ? 'Level' : 'Nivel'}:</label>
                    <br/>
                    <input type="radio" name="level" value= "Kindergarden - 3rd grade" checked={this.state.level === 'Kindergarden - 3rd grade'} onChange = {this.onLevelChange}/> {this.props.lang === 'English' ? 'Kindergarden - 3rd grade' : 'Kindergarden - 3er grado'}<br/>
                    <input type="radio" name="level" value= "4th - 6th grade" checked={this.state.level === '4th - 6th grade'} onChange = {this.onLevelChange}/> {this.props.lang === 'English' ? '4th - 6th grade' : '4to - 6to grado'}<br/>
                    <input type="radio" name="level" value= "7th - 8th grade" checked={this.state.level === '7th - 8th grade'} onChange = {this.onLevelChange}/> {this.props.lang === 'English' ? '7th - 8th grade' : '7mo - 8vo grado'} <br/>
                    <input type="radio" name="level" value= "9th - 12th grade" checked={this.state.level === '9th - 12th grade'} onChange = {this.onLevelChange}/> {this.props.lang === 'English' ? '9th - 12th grade' : '9no - 12mo grado'}<br/>
                    <input type="radio" name="level" value= "University / College" checked={this.state.level === 'University / College'} onChange = {this.onLevelChange}/> {this.props.lang === 'English' ? 'University/College' : 'Universidad/Colegio'}<br/>

                    <br/>
                    {
                        //Class size radio selector
                    }
                    <label>{this.props.lang === 'English' ? 'Group Size' : 'Tamaño de Grupo'}</label>
                    <br/>
                    <input type="radio" name="size" value= "1 - 10" checked={this.state.size === '1 - 10'} onChange = {this.onSizeChange}/> 1 - 10<br/>
                    <input type="radio" name="size" value= "11 - 20" checked={this.state.size === '11 - 20'} onChange = {this.onSizeChange}/> 11 - 20<br/>
                    <input type="radio" name="size" value= "21 - 30" checked={this.state.size === '21 - 30'} onChange = {this.onSizeChange}/> 21 - 30 <br/>
                    <input type="radio" name="size" value= "31+" checked={this.state.size === '31+'} onChange = {this.onSizeChange}/> 31+<br/>
                    
                    {
                        //Topics taught input field 
                    }
                    <label>{this.props.lang === 'English' ? 'Topics Taught' : 'Tópicos de Clase'} (Max: 3):</label>
                    {
                        //Mapping to generate a field for each topics in the topics array. 
                    }
                    {this.state.topicsTaught.map((topic, index) => (
                        <span key={index}>
                            <br/>
                            {
                                //Input field generated per each topic in the topics array. 
                            }
                            <input
                            type = "text"
                            placeholder = "Topic"
                            value={topic}
                            onChange={this.onTopicChange(index)}
                            />
                            {
                                //Button to delete the topic (Minimum of 1). 
                            }
                            <button onClick={this.deleteTopic(index)}>X</button>
                        </span>
                    ))}
                    <br/>
                    {
                        //Button to add a new topic field to the topics array. (Maximum of 3). 
                    }
                    <button onClick={this.addTopic} disabled={this.state.topicsTaught.length === 3}>{this.props.lang === 'English' ? 'Add New Topic' : 'Añadir Tópico Nuevo'}</button>

                    <br/>
                    {
                        //Buttons to move to the previous and next pages
                    }
                    <button onClick={this.toPageOne}>{this.props.lang === 'English' ? 'Back' : 'Regresar'}</button> <button onClick={this.toPageThree}>{this.props.lang === 'English' ? 'Next' : 'Continuar'}</button>
                </div>}

                {
                    //Page three
                }
                {this.state.currPage == 3 && <div>
                    <h2>{this.props.lang === 'English' ? 'School Information' : 'Información de Escuela'}</h2>
                    <br/>
                    {
                        //School name input field
                    }
                    <label>{this.props.lang === 'English' ? 'School Name' : 'Nombre de Escuela'}:</label>
                    <input type="text" placeholder="School Name" value={this.state.schoolName} onChange={this.onSchoolNameChange}/>

                    <br/>
                    {
                        //School location input field
                    }
                    <label>{this.props.lang === 'English' ? 'School Location' : 'Localización de Escuela'}:</label>
                    <input type="text" placeholder="School Location" value={this.state.schoolLocation} onChange={this.onSchoolLocationChange}/>

                    <br/>
                    {
                        //Institution ID input field
                    }
                    <label>{this.props.lang === 'English' ? 'Institution ID (Optional)' : 'Identificación de institución (Opcional)'}:</label>
                    <input type="text" placeholder="Institution ID" value={this.state.institutionID} onChange={this.onInstitutionIDChange}/>

                    <br/>
                    {
                        //School system radio selector
                    }
                    <label>{this.props.lang === 'English' ? 'School System' : 'Sistema Educativo'}:</label>
                    <br/>
                    <input type="radio" name="system" value= "public" checked={this.state.schoolType === 'public'} onChange = {this.onSchoolTypeChange}/> {this.props.lang === 'English' ? 'Public' : 'Público'}<br/>
                    <input type="radio" name="system" value= "private" checked={this.state.schoolType === 'private'} onChange = {this.onSchoolTypeChange}/> {this.props.lang === 'English' ? 'Private' : 'Privado'}<br/>
                    <input type="radio" name="system" value= "independent" checked={this.state.schoolType === 'independent'} onChange = {this.onSchoolTypeChange}/> {this.props.lang === 'English' ? 'Independent' : 'Independiente'} <br/>
                    
                    <br/>
                    {
                        //Resources owned checkboxes
                    }
                    <label>{this.props.lang === 'English' ? 'What resources do you use in your school?' : '¿Qué recursos utiliza en su escuela?'}</label>
                    <br/>
                    <input type="checkbox" name="resource" checked={this.state.moodle === true} onChange={this.onMoodleChange}/> Moodle <br/>
                    <input type="checkbox" name="resource" checked={this.state.googleClassroom === true} onChange={this.onGoogleClassroomChange}/> Google Classroom <br/>
                    <input type="checkbox" name="resource" checked={this.state.emailResource === true} onChange={this.onEmailResourceChange}/> Emails <br/>
                    <input type="checkbox" name="resource" checked={this.state.books === true} onChange={this.onBooksChange}/> {this.props.lang === 'English' ? 'Books' : 'Libros'} <br/>
                    <input type="checkbox" name="resource" checked={this.state.socialMedia === true} onChange={this.onSocialMediaChange}/> {this.props.lang === 'English' ? 'Social Media' : 'Medios Sociales'} <br/>
                    
                    <br/>
                    {
                        //Accessible resources checkboxes
                    }
                    <label>{this.props.lang === 'English' ? 'Which resources do you have access to?' : '¿A cuáles de estos recursos tiene acceso en su escuela?'}</label>
                    <br/>
                    <input type="checkbox" name="resource" checked={this.state.projector === true} onChange={this.onProjectorChange}/> {this.props.lang === 'English' ? 'Projector' : 'Proyector'} <br/>
                    <input type="checkbox" name="resource" checked={this.state.computer === true} onChange={this.onComputerChange}/> {this.props.lang === 'English' ? 'Computer' : 'Computadora'} <br/>
                    <input type="checkbox" name="resource" checked={this.state.tablet === true} onChange={this.onTabletChange}/> {this.props.lang === 'English' ? 'Tablet' : 'Tableta'} <br/>
                    <input type="checkbox" name="resource" checked={this.state.stylus === true} onChange={this.onStylusChange}/> Stylus <br/>
                    <input type="checkbox" name="resource" checked={this.state.internet === true} onChange={this.onInternetChange}/> Internet <br/>
                    <input type="checkbox" name="resource" checked={this.state.smartboard === true} onChange={this.onSmartBoardChange}/> {this.props.lang === 'English' ? 'Smart Board' : 'Pizarra Inteligente'} <br/>
                    <input type="checkbox" name="resource" checked={this.state.smartpencil === true} onChange={this.onSmartPencilChange}/> {this.props.lang === 'English' ? 'Smart Pencil' : 'Lápiz Inteligente'} <br/>
                    <input type="checkbox" name="resource" checked={this.state.speakers === true} onChange={this.onSpeakersChange}/> {this.props.lang === 'English' ? 'Speakers' : 'Bocinas'} <br/>

                    <br/>
                    {
                        //Buttons to go to the previous and next pages. 
                    }
                    <button onClick={this.toPageTwo}>{this.props.lang === 'English' ? 'Back' : 'Regresar'}</button> <button onClick={this.toPageFour}>{this.props.lang === 'English' ? 'Next' : 'Continuar'}</button>
                </div>}

                {
                    //Page four
                }
                {this.state.currPage == 4 && <div>
                    <h2>{this.props.lang === 'English' ? 'Profile' : 'Perfil'}</h2>
                    <br/>

                    {
                        //Date selector for employment date input field. 
                    }
                    <label>{this.props.lang === 'English' ? 'Employed Since' : 'Empleado Desde'}:</label>
                    <br/>
                    {/*
                    <SingleDatePicker
                        date={this.state.timeEmployed}
                        onDateChange={this.onEmployedDateChange}
                        focused={this.state.employedCalendarFocused}
                        onFocusChange={this.onEmployedFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={day => (moment().diff(day) < 0)}
                        />
                    */}

                    <DatePicker
                    selected={this.state.timeEmployed}
                    onChange={this.onEmployedDateChange}
                    />

                    <br/>
                    {
                        //Known languages checkbox selector
                    }
                    <label>{this.props.lang === 'English' ? 'Known Languages' : 'Lenguajes Conocidos'}:</label>
                    <br/>
                    <input type="checkbox" name="preflang" value= "spanish" checked={this.state.spanish === true} onChange = {this.onSpanishChange}/> {this.props.lang === 'English' ? 'Spanish' : 'Español'}<br/>
                    <input type="checkbox" name="preflang" value= "english" checked={this.state.english === true} onChange = {this.onEnglishChange}/> {this.props.lang === 'English' ? 'English' : 'Inglés'} <br/>
                    
                    <br/>
                    {
                        //Challenges checkbox selector
                    }
                    <label>{this.props.lang === 'English' ? 'Challenges' : 'Retos'}:</label>
                    <br/>
                    <input type="checkbox" name="resource" checked={this.state.teachingStrategies === true} onChange={this.onTeachingStrategiesChange}/> {this.props.lang === 'English' ? 'Teaching Strategies' : 'Estrategias de Enseñanza'} <br/>
                    <input type="checkbox" name="resource" checked={this.state.updatedMaterial === true} onChange={this.onUpdatedMaterialChange}/> {this.props.lang === 'English' ? 'Updated Material' : 'Material Actualizado'} <br/>
                    <input type="checkbox" name="resource" checked={this.state.timeManagement === true} onChange={this.onTimeManagementChange}/> {this.props.lang === 'English' ? 'Time Management' : 'Manejo del Tiempo'} <br/>
                    <input type="checkbox" name="resource" checked={this.state.technologyIntegration === true} onChange={this.onTechnologyIntegrationChange}/> {this.props.lang === 'English' ? 'Technology Integration' : 'Integración de Tecnologia'} <br/>
                    <input type="checkbox" name="resource" checked={this.state.instructionAlignment === true} onChange={this.onInstructionAlignmentChange}/> {this.props.lang === 'English' ? 'Instructional Alignment' : 'Alineamiento de Instrucción'} <br/>

                    <br/>

                    <input type="checkbox" name="termsOfUse" checked={this.state.termsOfUse === true} onChange={this.onTermsChange}/> {this.props.lang === 'English' ? 'I have read and accept the ' : 'He leído y acepto los '} <a href="http://localhost:8080/static/pages/tos.html"> {this.props.lang === 'English' ? 'Terms of Use' : 'Términos de Uso'}</a> <br/>
                    <input type="checkbox" name="privacyPolicy" checked={this.state.privacyPolicy === true} onChange={this.onPrivacyChange}/> {this.props.lang === 'English' ? 'I have read and accept the ' : 'He leído y acepto la '} <a href="http://localhost:8080/static/pages/privacy.html"> {this.props.lang === 'English' ? 'Privacy Policy' : 'Póliza de Privacidad'}</a><br/>
                    {
                        //Error message is displayed if the Terms of Use or Privacy Policy is not accepted when trying to submit the form. 
                    }
                    {this.state.secError === true && 
                    <div className="text-danger">
                        {this.props.lang === 'English' ? <p>You must accept the Terms of Use and Privacy Policy before completing your registration.</p> : <p>Debe aceptar los Términos de Uso y la Póliza de Privacidad antes de completar su registración.</p>}
                    </div>}
                    {
                        //Error message is displayed if required fields are left blank. 
                    }
                    {this.state.globalError === true && 
                    <div className="text-danger">
                        {this.props.lang === 'English' ? <p>Please fill all fields before completing your registration.</p> : <p>Por favor, llene todos los campos antes de completar su registración.</p>}
                    </div>}
                    
                    {
                        //Buttons to return to the previous page and to submit the registration form. 
                    }
                    <button onClick={this.toPageThree}>{this.props.lang === 'English' ? 'Back' : 'Regresar'}</button> <button onClick={this.onSubmit}>Submit</button>
                </div>}
                </form>
            </div>
        );
    }
}

//Maps the current language state to the component's properties. 
const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
}

//Connect component to the controller
export default connect(mapStateToProps)(RegistrationForm);