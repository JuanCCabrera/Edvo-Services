import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux';
import axios from 'axios';
import auth0Client from '../../Auth';
import { Redirect, BrowserRouter, Route } from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import {Line} from 'rc-progress';
import { setSuccessModal } from '../../actions/successModal';
import { setFailureModal } from '../../actions/failureModal';

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
             nameError: '',

             lastName: '',
             lastNameError: '',

             gender: 'male',
             dateOfBirth: moment().subtract('18',"years"),
             dateOfBirthError: '',

             calendarFocused: false,
             levelOfEdu: 'AS',
             location: '',
             locationError: '',

             pageOneError: '',
            
             subject: '',
             subjectError: '',

             format: 'classroom',
             language: 'spanish',
             level: 'Kindergarden - 3rd grade',
             size: '1 - 10',

             topicsTaught: [''],
             topicError: '',

             pageTwoError: '',

             schoolName: '',
             schoolNameError: '',

             schoolLocation: '',
             schoolLocationError: '',

             institutionID: '',
             institutionIDError: '',

             schoolType: 'public',
             moodle: false,
             googleClassroom: false,
             emailResource: false,
             books: false,
             applications: false,
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
             timeEmployedError: '',

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

             registerInvalidInputs: false,

             progress: "10",

            currPage: 1
        };
    }

    //Change Handlers

    componentDidUpdate(prevProps, prevState){
        if(prevProps !== this.props){
            if(this.props.lang === 'English'){
                if(this.state.nameError){
                    this.setState(() => ({nameError: 'The name field must contain text.'}));
                }
                if(this.state.lastNameError){
                    this.setState(() => ({lastNameError: 'The last name field must contain text.'}));
                }
                if(this.state.dateOfBirthError){
                    this.setState(() => ({dateOfBirthError: 'Enter a valid date of birth.'}));
                }
                if(this.state.timeEmployedError){
                    this.setState(() => ({timeEmployedError: 'Enter a valid date of employment.'}));
                }
                if(this.state.topicError){
                    this.setState(() => ({topicError: 'Enter valid topics. '}));
                }
                if(this.state.locationError){
                    this.setState(() => ({locationError: 'Enter a valid address'}));
                }
                if(this.state.subjectError){
                    this.setState(() => ({subjectError: 'The subject field must contain text.'}));
                }
                if(this.state.schoolLocationError){
                    this.setState(() => ({schoolLocationError: 'The school location field must contain text.'}));
                }
                if(this.state.schoolNameError){
                    this.setState(() => ({schoolNameError: 'The school name field must contain text.'}));
                }
                if(this.state.institutionIDError){
                    this.setState(() => ({institutionIDError: 'Enter a valid institution ID.'}));
                }
            }else{
                if(this.state.nameError){
                    this.setState(() => ({nameError: 'El campo del nombre debe contener texto.'}))
                }
                if(this.state.lastNameError){
                    this.setState(() => ({lastNameError: 'El campo del apellido debe contener texto.'}))
                }
                if(this.state.dateOfBirthError){
                    this.setState(() => ({dateOfBirthError: 'Escriba una fecha de nacimiento válida.'}));
                }
                if(this.state.timeEmployedError){
                    this.setState(() => ({timeEmployedError: 'Escriba una fecha de empleo válida.'}));
                }
                if(this.state.topicError){
                    this.setState(() => ({topicError: 'Escriba temas válidos.'}))
                }
                if(this.state.locationError){
                    this.setState(() => ({locationError: 'Escriba una dirección física válida.'}));
                }
                if(this.state.subjectError){
                    this.setState(() => ({subjectError: 'La materia del curso debe contener texto.'}));
                }
                if(this.state.schoolLocationError){
                    this.setState(() => ({schoolLocationError: 'La localización de la escuela debe contener texto'}));
                }
                if(this.state.schoolNameError){
                    this.setState(() => ({schoolNameError: 'El nombre de la escuela debe contener texto.'}));
                }
                if(this.state.institutionIDError){
                    this.setState(() => ({institutionIDError: 'Escriba una identificación de institución válida.'}));
                }
            }
        }
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
        var today=moment();
        var difference = today.diff(dateOfBirth, 'years');
        console.log(difference);
        //Check if the selected date of birth falls between 18-90 years ago. 
        if(dateOfBirth && (difference >= 18 && difference < 90)){
            this.setState(() => ({dateOfBirth: dateOfBirth, dateOfBirthError: ''}));
        }else{
            if(this.props.lang === 'English'){
                this.setState(() => ({dateOfBirth: dateOfBirth, dateOfBirthError: 'Enter a valid date of birth.'}));
            }else{
                this.setState(() => ({dateOfBirth: dateOfBirth, dateOfBirthError: 'Escriba una fecha de nacimiento valida.'}));
            }
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
        
            let j = 0;
            let errorCheck = false;
            for(j = 0; j < this.state.topicsTaught.length; j++){
                if(this.state.topicsTaught[j] && this.state.topicsTaught[j].match(/^\s+$/)){
                    if(this.props.lang === 'English'){
                        this.setState(() => ({topicError: 'Enter valid topics. '}));
                    }else{
                        this.setState(() => ({topicError: 'Escriba temas válidos.'})); 
                    }
                    errorCheck = true;
                    break;
                }
            }
            if(!errorCheck){
                this.setState(() => ({topicError: ''}));
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

    //Change applications boolean in local state
    onApplicationsChange = (e) => {
        const applications = this.state.applications;
        this.setState(() => ({applications: !applications}));
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
        var today=moment();
        var difference = today.diff(timeEmployed, 'years');
        var differenceToBirth = timeEmployed.diff(this.state.dateOfBirth, 'years');
        console.log('DIF TO BIRTH',differenceToBirth);
        //Check if the selected date of birth falls between 18-90 years ago. 
        if(timeEmployed && (difference >= 0 && difference < 90) && differenceToBirth > 18){
            this.setState(() => ({timeEmployed: timeEmployed, timeEmployedError: ''}));
        }else{
            if(this.props.lang === 'English'){
                this.setState(() => ({timeEmployed: timeEmployed, timeEmployedError: 'Enter a valid date of employment.'}));
            }else{
                this.setState(() => ({timeEmployed: timeEmployed, timeEmployedError: 'Escriba una fecha de empleo válida.'}));
            }
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
        this.setState(() => ({currPage: 1, progress: "10"}));
    }

    toPageTwo = (e) => {
        this.setState(() => ({currPage: 2, progress: "40"}));
    }

    toPageThree = (e) => {
        this.setState(() => ({currPage: 3, progress: "70"}));
    }

    toPageFour = (e) => {
        this.setState(() => ({currPage: 4, progress: "100"}));
    }

    //Submit registration information

    onSubmit = (e) => {
        e.preventDefault();
        //Display specific message if terms of use or privacy policy is not accepted.
        if(!this.state.termsOfUse || !this.state.privacyPolicy){
            this.setState(() => ({secError: true, globalError: false}));
        }
        //Display default error message if there are required fields left blank. 
        if(!this.state.name || !this.state.lastName || !this.state.subject || !this.state.topicsTaught[0] || !this.state.schoolName || !this.state.schoolLocation || (!this.state.english && !this.state.spanish)){
            this.setState(() => ({globalError: true, secError: false}));
        }else if(!(this.state.teachingStrategies || this.state.updatedMaterial || this.state.timeManagement || this.state.technologyIntegration || this.state.instructionAlignment) || !(this.state.moodle || this.state.googleClassroom || this.state.emailResource || this.state.books || this.state.socialMedia || this.state.projector || this.state.computer || this.state.tablet || this.state.stylus || this.state.internet || this.state.smartboard || this.state.smartpencil || this.state.speakers)){
            this.setState(() => ({globalError: true, secError: false}));
        }else if(this.state.nameError || this.state.lastNameError || this.state.dateOfBirthError || this.state.subjectError || this.state.topicError || this.state.schoolNameError || this.state.schoolLocationError || this.state.timeEmployedError){
            this.setState(() => ({globalError: true, secError: false}));
        }else{
            let topica = "";
            let topicb = "";
            let topicc = "";
            const topicsLength = this.state.topicsTaught.length;
            let i = 0;
            for(i; i < topicsLength; i++){
                if(i == 0){
                    topica = this.state.topicsTaught[0];
                }else if(i == 1){
                    topicb = this.state.topicsTaught[1];
                }else if(i == 2){
                    topicc = this.state.topicsTaught[2];
                }
            }

            this.setState(() => ({secError: false, globalError: false}));
            axios.post('https://beta.edvotech.com/api/register', {
                name: this.state.name,
                lastname: this.state.lastName,
                gender: this.state.gender,
                email: this.state.email,
                password: this.state.password,
                dob: moment(this.state.dateOfBirth).format("YYYY-MM-DD"),
                policies: true,
                teachersince: this.state.timeEmployed,
                education: this.state.levelOfEdu,
                english: this.state.english,
                spanish: this.state.spanish,
                strategies: this.state.teachingStrategies,
                material: this.state.updatedMaterial,
                timemanagement: this.state.timeManagement,
                tech: this.state.technologyIntegration,
                instructions: this.state.instructionAlignment,
                schoolname: this.state.schoolName,
                location: this.state.schoolLocation,
                schooltype: this.state.schoolType,
                moodle: this.state.moodle,
                googleclassroom: this.state.googleClassroom,
                emails: this.state.emailResource,
                books: this.state.books,
                applications: this.state.applications,
                socialmedia: this.state.socialMedia,
                projector: this.state.projector,
                computer: this.state.computer,
                tablet: this.state.tablet,
                stylus: this.state.stylus,
                internet: this.state.internet,
                smartboard: this.state.smartboard,
                smartpencil: this.state.smartpencil,
                speakers: this.state.speakers,
                teachersince: moment(this.state.timeEmployed).format("YYYY-MM-DD"),
                level: this.state.level,
                institutionID: this.state.institutionID, //Not being used currently
                class: {
                    subject: this.state.subject,
                    format: this.state.format,
                    language: this.state.language,
                    level: this.state.level,
                    groupsize: this.state.size,
                    topica: topica,
                    topicb: topicb,
                    topicc: topicc
                }
            },
            {headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }})
            .then(response =>{  
                localStorage.setItem('role','teacher');
                this.props.dispatch(setSuccessModal());
                this.props.history.replace('/teacher/settings/plans/payment');
            })
            .catch(error =>{
                if(error.response.status == 401 || error.response.status == 500){
                    this.props.dispatch(setFailureModal());
                    this.setState(() => ({registerInvalidInputs: false}));
                }
                else if(error.response.status == 403){
                    this.setState(() => ({registerInvalidInputs: true}));
            }});
        }
        }

    render(){
        return(
            <div>
            <div id="top"/>
            <div className="big-card">
            <form onSubmit={this.onSubmit}>
            {
                //Progress Bar
            }
            <div className="text-center">
            
            <Line percent={this.state.progress} strokeWidth="1.2" strokeColor="#5933AA" style={{marginTop: '0.2rem', width: '90%'}}/>
            {
                /* Progress bar numbers
            
            <div className="row" style={{marginBottom: '0', paddingBottom: '0', color: '#5933aa'}}>
                <div className="col-xs-3 col-sm-3">
                1
                </div>
                <div className="col-xs-3 col-sm-3">
                2
                </div>
                <div className="col-xs-3 col-sm-3">
                3
                </div>
                <div className="col-xs-3 col-sm-3">
                4
                </div>
            </div>
            
            */
            }

            </div>
            {
                //Page one
            }
            {this.state.currPage == 1 && <div>
                    <br/>
                    <div className="form__title">
                        {this.props.lang === 'English' ? 'General Information' : 'Información General'}
                        <hr className="break" style={{borderColor: '#5933AA'}} />
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-md-6">
                            {
                                //Name input field
                            }
                            <span className="req">*</span>
                            <label>{this.props.lang === 'English' ? 'Name' : 'Nombre'}:</label>
                            <input type = "text" className="form-control" placeholder = {this.props.lang === 'English' ? 'Name' : 'Nombre'} maxLength="100" value = {this.state.name} onChange = {this.onNameChange} onBlur={() => {
                                //Check if the name field only contains spaces.  
                                this.setState(() => ({name: this.state.name.trim()}));
                                if(this.state.name.match(/^\s+$/)){
                                    if(this.props.lang === 'English'){
                                        this.setState(() => ({nameError: 'The name field must contain text.'}));
                                    }else{
                                        this.setState(() => ({nameError: 'El campo del nombre debe contener texto.'})); 
                                    }
                                }else{
                                    this.setState(() => ({nameError: ''}));
                                }
                            }}/>
                            {
                                //Name error
                            }
                            {this.state.nameError && 
                                <div>
                                    <span className="text-danger"> 
                                        {this.state.nameError}
                                    </span>
                                    <br/>
                                </div>}
                            <br/>
                        </div>
                        <div className="col-md-6">
                            
                            {
                                //Last name input field
                            }
                            <span className="req">*</span>
                            <label>{this.props.lang === 'English' ? 'Last Name' : 'Apellido'}:</label>
                            <input type = "text" className="form-control" placeholder = {this.props.lang === 'English' ? 'Last Name' : 'Apellido'} maxLength="100" value = {this.state.lastName} onChange = {this.onLastNameChange} onBlur={() => {
                                //Check if the last name field only consists of spaces. 
                                this.setState(() => ({lastName: this.state.lastName.trim()}));
                                if(this.state.lastName.match(/^\s+$/)){
                                    if(this.props.lang === 'English'){
                                        this.setState(() => ({lastNameError: 'The last name field must contain text.'}));
                                    }else{
                                        this.setState(() => ({lastNameError: 'El campo del apellido debe contener texto.'})); 
                                    }
                                }else{
                                    this.setState(() => ({lastNameError: ''}));
                                }
                            }}
                            value={this.state.lastName} onChange={this.onLastNameChange}/>

                            {
                                //Last name error
                            }
                            {this.state.lastNameError && 
                                <div>
                                    <span className="text-danger"> 
                                        {this.state.lastNameError}
                                    </span>
                                    <br/>
                                </div>}
                            <br/>
                        </div>
                    </div>
                    {
                        //Gender radio selector
                    }  
                    <span className="req">*</span>
                    <label>{this.props.lang === 'English' ? 'Gender' : 'Género'}:</label>
                    <br/>
                        <label className="clickable radio__text">
                        <input type="radio" name="gender" value= "male" checked={this.state.gender === 'male'} onChange = {this.onGenderChange}/> {this.props.lang === 'English' ? 'Male' : 'Masculino'}
                        </label>
                        <br/>
                        <label className="clickable radio__text">
                        <input type="radio" name="gender" value= "female" checked={this.state.gender === 'female'} onChange = {this.onGenderChange}/> {this.props.lang === 'English' ? 'Female' : 'Femenino'}
                        </label>
                        <br/>
                    
                    {
                       //<input type="radio" name="gender" value= "other" checked={this.state.gender === 'other'} onChange = {this.onGenderChange}/> {this.props.lang === 'English' ? 'Other' : 'Otro'} <br/>
                    }

                    <br/>
                    {
                        //Date of birth selector
                    }
                    <span className="req">*</span>
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

                        <span style={{color: 'gray', fontSize: '1.2rem'}}>(MM/DD/{this.props.lang === 'English' ? 'YYYY' : 'AAAA'})</span>
                        <br/>
                        <DatePicker
                        className="form-control"
                        selected={this.state.dateOfBirth}
                        onChange={this.onDateChange}
                        maxDate={moment()}
                        />

                        {this.state.dateOfBirthError && 
                            <div>
                                <span className="text-danger"> 
                                    {this.state.dateOfBirthError}
                                </span>
                                <br/>
                            </div>}
                        <br/>
    
                    <br/>
                    {
                        //Level of education radio selector
                    }
                    <span className="req">*</span>
                    <label>{this.props.lang === 'English' ? 'Level of Education' : 'Nivel de Educación'}:</label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="radio" name="levelOfEdu" value= "AS" checked={this.state.levelOfEdu === 'AS'} onChange = {this.onLOEChange}/> {this.props.lang === 'English' ? 'Associate\'s Degree' : 'Grado Asociado'}
                    </label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="radio" name="levelOfEdu" value= "BSD" checked={this.state.levelOfEdu === 'BSD'} onChange = {this.onLOEChange}/> {this.props.lang === 'English' ? 'Bachellor\'s Degree' : 'Bachillerato'}
                    </label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="radio" name="levelOfEdu" value= "MSD" checked={this.state.levelOfEdu === 'MSD'} onChange = {this.onLOEChange}/> {this.props.lang === 'English' ? 'Master\'s Degree' : 'Maestría'}
                    </label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="radio" name="levelOfEdu" value= "PHD" checked={this.state.levelOfEdu === 'PHD'} onChange = {this.onLOEChange}/> {this.props.lang === 'English' ? 'Doctor of Philosophy' : 'Doctor en Filosofía'}
                    </label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="radio" name="levelOfEdu" value= "EDD" checked={this.state.levelOfEdu === 'EDD'} onChange = {this.onLOEChange}/>  {this.props.lang === 'English' ? 'Doctor of Education' : 'Doctor en Educación'}
                    </label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="radio" name="levelOfEdu" value= "NA" checked={this.state.levelOfEdu === 'NA'} onChange = {this.onLOEChange}/> {this.props.lang === 'English' ? 'None' : 'Ninguna'}
                    </label>
                    <br/>
                    <br/>
                    {
                        //Location of employment input field
                        /*
                    
                    <span className="req">*</span>
                    <label>{this.props.lang === 'English' ? 'Location of Employment' : 'Localización de Empleo'}:</label>
                    <input type="text" className="form-control" placeholder= {this.props.lang === 'English' ? 'Location' : 'Localización'} maxLength="150" value={this.state.location} onChange={this.onLocationChange} onBlur={() => {
                        //Check to see if address is only composed of spaces. 
                        if(this.state.location.match(/^\s+$/)){
                            if(this.props.lang === 'English'){
                                this.setState(() => ({locationError: 'Enter a valid address.'}));
                            }else{
                                this.setState(() => ({locationError: 'Escriba una dirección física válida.'})); 
                            }
                        }else{
                            this.setState(() => ({locationError: ''}));
                        }
                    }}/>
                    {this.state.locationError && 
                        <div>
                            <span className="text-danger"> 
                                {this.state.locationError}
                            </span>
                            <br/>
                        </div>}
                    <br/>
                        */
                    }
                {
                    //Button to change page to page 2
                }
                <a href={(!(this.state.name && this.state.lastName) || (this.state.nameError || this.state.lastNameError || this.state.dateOfBirthError)) ? "#" : "#top"}>
                    <button disabled={!(this.state.name && this.state.lastName) || (this.state.nameError || this.state.lastNameError || this.state.dateOfBirthError)} onClick={this.toPageTwo}>
                        
                            <div className="btn btn-item">
                                    {this.props.lang === 'English' ? 'Next' : 'Continuar'}
                            </div>
                
                    </button>
                </a>

                </div>}

                <br/>
                {
                    //Page two
                }
                {this.state.currPage == 2 && <div>
                    <div className="form__title">
                        {this.props.lang === 'English' ? 'Class Information' : 'Información del Curso'}
                        <hr className="break" style={{borderColor: '#5933AA'}} />
                    </div>
                    <br/>
                    {
                        //Class subject input field
                    }
                    <span className="req">*</span>
                    <label>{this.props.lang === 'English' ? 'Subject' : 'Materia'}:</label>
                    <input type="text"  className="form-control" placeholder= {this.props.lang === 'English' ? 'Subject' : 'Tema'} value={this.state.subject} onChange={this.onSubjectChange} onBlur={() => {
                        //Check to see if the subject is only composed of spaces.
                        this.setState(() => ({subject: this.state.subject.trim()})); 
                        if(this.state.subject.match(/^\s+$/)){
                            if(this.props.lang === 'English'){
                                this.setState(() => ({subjectError: 'The subject field must contain text.'}));
                            }else{
                                this.setState(() => ({subjectError: 'La materia del curso debe contener texto.'})); 
                            }
                        }else{
                            this.setState(() => ({subjectError: ''}));
                        }
                    }}/>
                    {this.state.subjectError && 
                        <div>
                            <span className="text-danger"> 
                                {this.state.subjectError}
                            </span>
                            <br/>
                        </div>}
                    <br/>
                    {
                        //Class format radio selector
                    }
                    <span className="req">*</span>
                    <label>{this.props.lang === 'English' ? 'Class Format' : 'Formato del Curso'}:</label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="radio" name="format" value= "classroom" checked={this.state.format === 'classroom'} onChange = {this.onFormatChange}/> {this.props.lang === 'English' ? 'Classroom' : 'Salón de Clases'}
                    </label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="radio" name="format" value= "blended" checked={this.state.format === 'blended'} onChange = {this.onFormatChange}/> {this.props.lang === 'English' ? 'Blended' : 'Mixto'}
                    </label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="radio" name="format" value= "online" checked={this.state.format === 'online'} onChange = {this.onFormatChange}/> {this.props.lang === 'English' ? 'Online' : 'En Línea'}
                    </label>
                    <br/>
                    <br/>
                    {
                        //Class language radio seelctor
                    }
                    <span className="req">*</span>
                    <label>{this.props.lang === 'English' ? 'Language' : 'Lenguaje'}:</label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="radio" name="lang" value= "spanish" checked={this.state.language === 'spanish'} onChange = {this.onLanguageChange}/> {this.props.lang === 'English' ? 'Spanish' : 'Español'}
                    </label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="radio" name="lang" value= "english" checked={this.state.language === 'english'} onChange = {this.onLanguageChange}/> {this.props.lang === 'English' ? 'English' : 'Inglés'}
                    </label>
                    <br/>
                    <br/>
                    {
                        //Class level radio selector
                    }
                    <span className="req">*</span>
                    <label>{this.props.lang === 'English' ? 'Level' : 'Nivel'}:</label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="radio" name="level" value= "Kindergarden - 3rd grade" checked={this.state.level === 'Kindergarden - 3rd grade'} onChange = {this.onLevelChange}/> {this.props.lang === 'English' ? 'Kindergarden - 3rd grade' : 'Kindergarden - 3er grado'}
                    </label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="radio" name="level" value= "4th - 6th grade" checked={this.state.level === '4th - 6th grade'} onChange = {this.onLevelChange}/> {this.props.lang === 'English' ? '4th - 6th grade' : '4to - 6to grado'}
                    </label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="radio" name="level" value= "7th - 8th grade" checked={this.state.level === '7th - 8th grade'} onChange = {this.onLevelChange}/> {this.props.lang === 'English' ? '7th - 8th grade' : '7mo - 8vo grado'}
                    </label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="radio" name="level" value= "9th - 12th grade" checked={this.state.level === '9th - 12th grade'} onChange = {this.onLevelChange}/> {this.props.lang === 'English' ? '9th - 12th grade' : '9no - 12mo grado'}
                    </label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="radio" name="level" value= "University / College" checked={this.state.level === 'University / College'} onChange = {this.onLevelChange}/> {this.props.lang === 'English' ? 'University/College' : 'Universidad/Colegio'}
                    </label>
                    <br/>
                    <br/>
                    {
                        //Class size radio selector
                    }
                    <span className="req">*</span>
                    <label>{this.props.lang === 'English' ? 'Group Size' : 'Tamaño de Grupo'}</label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="radio" name="size" value= "1 - 10" checked={this.state.size === '1 - 10'} onChange = {this.onSizeChange}/> 1 - 10
                    </label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="radio" name="size" value= "11 - 20" checked={this.state.size === '11 - 20'} onChange = {this.onSizeChange}/> 11 - 20
                    </label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="radio" name="size" value= "21 - 30" checked={this.state.size === '21 - 30'} onChange = {this.onSizeChange}/> 21 - 30 
                    </label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="radio" name="size" value= "31+" checked={this.state.size === '31+'} onChange = {this.onSizeChange}/> 31+
                    </label>
                    <br/>
                    <br/>
                    {
                        //Topics taught input field 
                    }
                    <span className="req">*</span>
                    <label>{this.props.lang === 'English' ? 'Topics Taught' : 'Temas del Curso'} (Max: 3):</label>
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
                            className="form-control"
                            placeholder = {this.props.lang === 'English' ? 'Topic' : 'Tema'}
                            style={{width: '50%', display: 'inline', marginRight: '1rem'}}
                            value={topic}
                            maxLength="50"
                            onChange={this.onTopicChange(index)}
                            onBlur={() => {
                                let topics = [...this.state.topicsTaught]
                                topics[index] = this.state.topicsTaught[index].trim();
                                this.setState(() => ({topicsTaught: topics}));
                                let j = 0;
                                let errorCheck = false;
                                for(j = 0; j < this.state.topicsTaught.length; j++){
                                    if(this.state.topicsTaught[j] && this.state.topicsTaught[j].match(/^\s+$/)){
                                        if(this.props.lang === 'English'){
                                            this.setState(() => ({topicError: 'Enter valid topics. '}));
                                        }else{
                                            this.setState(() => ({topicError: 'Escriba temas válidos.'})); 
                                        }
                                        errorCheck = true;
                                        break;
                                    }
                                }
                                if(!errorCheck){
                                    this.setState(() => ({topicError: ''}));
                                }
                            }

                            }
                            />
                            {
                                //Button to delete the topic (Minimum of 1). 
                            }
                            {this.state.topicsTaught.length > 1 && <div style={{display: 'inline'}}>
                            <button onClick={this.deleteTopic(index)}>
                                <span style={{color: '#b33a3a'}} title={this.props.lang === 'English' ? 'Delete topic' : 'Remover tema'}>
                                    <i className="fa fa-window-close fa-lg"></i>
                                </span>
                            </button>
                            </div>}
                        </span>
                    ))}

                    {this.state.topicError && 
                        <div>
                            <span className="text-danger"> 
                                {this.state.topicError}
                            </span>
                            <br/>
                        </div>}
                    <br/>

                    {
                        //Button to add a new topic field to the topics array. (Maximum of 3). 
                    }
                    {this.state.topicsTaught.length < 3 &&
                    <div>
                    <button onClick={this.addTopic} disabled={this.state.topicsTaught.length === 3}>
                        <div className="btn btn-item">
                            {this.props.lang === 'English' ? 'Add New Topic' : 'Añadir Tema Nuevo'}
                            <span style={{size: '50%', marginLeft: '0.5rem'}}><i className="fa fa-plus" aria-hidden="true"></i></span>
                        </div>
                    </button>
                    </div>
                    }
                    <br/>
                    <br/>
                    {
                        //Buttons to move to the previous and next pages
                    }
                    <a href="#top">
                        <button onClick={this.toPageOne}>
                            <div className="btn btn-item">
                                {this.props.lang === 'English' ? 'Back' : 'Regresar'}
                            </div>
                        </button>
                    </a>
                    
                    <a href={(!(this.state.subject && this.state.topicsTaught[0]) || (this.state.subjectError || this.state.topicError)) ? "#" : "#top"}>
                        <button disabled={!(this.state.subject && this.state.topicsTaught[0]) || (this.state.subjectError || this.state.topicError)} onClick={this.toPageThree}>
                            <div className="btn btn-item">
                                {this.props.lang === 'English' ? 'Next' : 'Continuar'}
                            </div>
                        </button>
                    </a>
                </div>}

                {
                    //Page three
                }
                {this.state.currPage == 3 && 
                <div>
                    <div className="form__title">
                        {this.props.lang === 'English' ? 'School Information' : 'Información de Escuela'}
                        <hr className="break" style={{borderColor: '#5933AA'}} />
                    </div>
                    <br/>
                    {
                        //School name input field
                    }
                    <span className="req">*</span>
                    <label>{this.props.lang === 'English' ? 'School Name' : 'Nombre de Escuela'}:</label>
                    <input type="text" className="form-control" placeholder= {this.props.lang === 'English' ? 'School Name' : 'Nombre de Escuela'} value={this.state.schoolName} onChange={this.onSchoolNameChange} onBlur={() => {
                        //Check to see if the subject is only composed of spaces.
                        this.setState(() => ({schoolName: this.state.schoolName.trim()})); 
                        if(this.state.schoolName.match(/^\s+$/)){
                            if(this.props.lang === 'English'){
                                this.setState(() => ({schoolNameError: 'The school name field must contain text.'}));
                            }else{
                                this.setState(() => ({schoolNameError: 'El nombre de la escuela debe contener texto.'})); 
                            }
                        }else{
                            this.setState(() => ({schoolNameError: ''}));
                        }
                    }}/>
                    {this.state.schoolNameError && 
                        <div>
                            <span className="text-danger"> 
                                {this.state.schoolNameError}
                            </span>
                            <br/>
                        </div>}
                    <br/>
                    

                    {
                        //School location input field
                    }
                    <span className="req">*</span>
                    <label>{this.props.lang === 'English' ? 'School Location' : 'Localización de su Escuela'}:</label>
                    <input type="text" className="form-control" placeholder= {this.props.lang === 'English' ? 'School Location' : 'Localización de su Escuela'} value={this.state.schoolLocation} onChange={this.onSchoolLocationChange} onBlur={() => {
                        //Check to see if the subject is only composed of spaces. 
                        this.setState(() => ({schoolLocation: this.state.schoolLocation.trim()}));
                        if(this.state.schoolLocation.match(/^\s+$/)){
                            if(this.props.lang === 'English'){
                                this.setState(() => ({schoolLocationError: 'The school location field must contain text.'}));
                            }else{
                                this.setState(() => ({schoolLocationError: 'El campo de la localización de la escuela debe contener texto'})); 
                            }
                        }else{
                            this.setState(() => ({schoolLocationError: ''}));
                        }
                    }}/>
                    {this.state.schoolLocationError && 
                        <div>
                            <span className="text-danger"> 
                                {this.state.schoolLocationError}
                            </span>
                            <br/>
                        </div>}
                    <br/>

                    {
                        /*
                        //Institution ID input field
                    
                    <label>{this.props.lang === 'English' ? 'Institution ID (Optional)' : 'Identificación de institución (Opcional)'}:</label>
                    <input type="text" className="form-control" placeholder= {this.props.lang === 'English' ? 'Institution ID' : 'Identificación de institución'} value={this.state.institutionID} onChange={this.onInstitutionIDChange} onBlur={() => {
                        //Check if institution ID field matches expected format. 
                        this.setState(() => ({institutionID: this.state.institutionID.trim()}));
                        if(!this.state.institutionID.match(/^[a-zA-Z0-9\|]*$/)){
                            if(this.props.lang === 'English'){
                                this.setState(() => ({institutionIDError: 'Enter a valid institution ID.'}));
                            }else{
                                this.setState(() => ({institutionIDError: 'Escriba una identificación de institución valida.'})); 
                            }
                        }else{
                            this.setState(() => ({institutionIDError: ''}));
                        }
                    }}
                    value = {this.state.institutionID} onChange={this.onInstitutionIDChange}/>

                    {
                        //Institution ID error
                    }
                    {this.state.institutionIDError && 
                        <div>
                            <span className="text-danger"> 
                                {this.state.institutionIDError}
                            </span>
                            <br/>
                        </div>}
                    <br/>
                    */
                    }

                    {
                        //School system radio selector
                    }
                    <span className="req">*</span>
                    <label>{this.props.lang === 'English' ? 'School System' : 'Sistema Educativo'}:</label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="radio" name="system" value= "public" checked={this.state.schoolType === 'public'} onChange = {this.onSchoolTypeChange}/> {this.props.lang === 'English' ? 'Public' : 'Público'}
                    </label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="radio" name="system" value= "private" checked={this.state.schoolType === 'private'} onChange = {this.onSchoolTypeChange}/> {this.props.lang === 'English' ? 'Private' : 'Privado'}
                    </label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="radio" name="system" value= "independent" checked={this.state.schoolType === 'independent'} onChange = {this.onSchoolTypeChange}/> {this.props.lang === 'English' ? 'Independent' : 'Independiente'}
                    </label>
                    <br/>
                    <br/>
                    {
                        //Resources owned checkboxes
                    }
                    <span className="req">*</span>
                    <label>{this.props.lang === 'English' ? 'What resources do you use in your school?' : '¿Qué recursos utiliza en su escuela?'}</label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="checkbox" name="resource" checked={this.state.moodle === true} onChange={this.onMoodleChange}/> Moodle 
                    </label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="checkbox" name="resource" checked={this.state.googleClassroom === true} onChange={this.onGoogleClassroomChange}/> Google Classroom 
                    </label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="checkbox" name="resource" checked={this.state.emailResource === true} onChange={this.onEmailResourceChange}/> Emails 
                    </label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="checkbox" name="resource" checked={this.state.books === true} onChange={this.onBooksChange}/> {this.props.lang === 'English' ? 'Books' : 'Libros'} 
                    </label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="checkbox" name="resource" checked={this.state.applications === true} onChange={this.onApplicationsChange}/> {this.props.lang === 'English' ? 'Applications' : 'Aplicaciones'} 
                    </label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="checkbox" name="resource" checked={this.state.socialMedia === true} onChange={this.onSocialMediaChange}/> {this.props.lang === 'English' ? 'Social Media' : 'Redes Sociales'} 
                    </label>
                    <br/>
                    <br/>
                    {
                        //Accessible resources checkboxes
                    }
                    <span className="req">*</span>
                    <label>{this.props.lang === 'English' ? 'Which resources do you have access to?' : '¿A cuáles de estos recursos tiene acceso en su escuela?'}</label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="checkbox" name="resource" checked={this.state.projector === true} onChange={this.onProjectorChange}/> {this.props.lang === 'English' ? 'Projector' : 'Proyector'} 
                    </label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="checkbox" name="resource" checked={this.state.computer === true} onChange={this.onComputerChange}/> {this.props.lang === 'English' ? 'Computer' : 'Computadora'} 
                    </label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="checkbox" name="resource" checked={this.state.tablet === true} onChange={this.onTabletChange}/> {this.props.lang === 'English' ? 'Tablet' : 'Tableta'} 
                    </label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="checkbox" name="resource" checked={this.state.stylus === true} onChange={this.onStylusChange}/> {this.props.lang === 'English' ? 'Stylus' : 'Lápiz Digital'} 
                    </label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="checkbox" name="resource" checked={this.state.internet === true} onChange={this.onInternetChange}/> Internet 
                    </label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="checkbox" name="resource" checked={this.state.smartboard === true} onChange={this.onSmartBoardChange}/> {this.props.lang === 'English' ? 'Smart Board' : 'Pizarra Inteligente'} 
                    </label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="checkbox" name="resource" checked={this.state.smartpencil === true} onChange={this.onSmartPencilChange}/> {this.props.lang === 'English' ? 'Smart Pencil' : 'Lápiz Inteligente'} 
                    </label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="checkbox" name="resource" checked={this.state.speakers === true} onChange={this.onSpeakersChange}/> {this.props.lang === 'English' ? 'Speakers' : 'Bocinas'} 
                    </label>
                    <br/>
                    <br/>
                    {
                        //Buttons to go to the previous and next pages. 
                    }
                    <a href="#top">
                        <button onClick={this.toPageTwo}>
                            <div className="btn btn-item">
                                {this.props.lang === 'English' ? 'Back' : 'Regresar'}
                            </div>
                        </button>
                    </a>

                    <a href={(!(this.state.schoolName && this.state.schoolLocation && (this.state.moodle || this.state.googleClassroom || this.state.emailResource || this.state.books || this.state.applications || this.state.socialMedia) && (this.state.projector || this.state.computer || this.state.tablet || this.state.stylus || this.state.internet || this.state.smartboard || this.state.smartpencil || this.state.speakers)) || (this.state.schoolNameError || this.state.schoolLocationError)) ? "#" : "#top"}>
                    <button disabled={!(this.state.schoolName && this.state.schoolLocation && (this.state.moodle || this.state.googleClassroom || this.state.emailResource || this.state.books || this.state.applications || this.state.socialMedia) && (this.state.projector || this.state.computer || this.state.tablet || this.state.stylus || this.state.internet || this.state.smartboard || this.state.smartpencil || this.state.speakers)) || (this.state.schoolNameError || this.state.schoolLocationError)} onClick={this.toPageFour}>
                        <div className="btn btn-item">
                            {this.props.lang === 'English' ? 'Next' : 'Continuar'}
                        </div>
                    </button>
                </a>
                </div>}

                {
                    //Page four
                }
                {this.state.currPage == 4 && <div>
                    <div className="form__title">
                        {this.props.lang === 'English' ? 'Profile' : 'Perfil'}
                        <hr className="break" style={{borderColor: '#5933AA'}} />
                    </div>
                    <br/>

                    {
                        //Date selector for employment date input field. 
                    }
                    <span className="req">*</span>
                    <label>{this.props.lang === 'English' ? 'Teacher Since' : 'Educador Desde'}:</label>
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

                    <span style={{color: 'gray', fontSize: '1.2rem'}}>(MM/DD/{this.props.lang === 'English' ? 'YYYY' : 'AAAA'})</span>
                    <br/>
                    <DatePicker
                    selected={this.state.timeEmployed}
                    className="form-control"
                    onChange={this.onEmployedDateChange}
                    maxDate={moment()}
                    />

                    {this.state.timeEmployedError && 
                        <div>
                            <span className="text-danger"> 
                                {this.state.timeEmployedError}
                            </span>
                            <br/>
                        </div>}
                    <br/>

                    {
                        //Known languages checkbox selector
                    }
                    <span className="req">*</span>
                    <label>{this.props.lang === 'English' ? 'Which language(s) do you understand?' : '¿Qué idioma(s) usted entiende?'}:</label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="checkbox" name="preflang" value= "spanish" checked={this.state.spanish === true} onChange = {this.onSpanishChange}/> {this.props.lang === 'English' ? 'Spanish' : 'Español'}
                    </label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="checkbox" name="preflang" value= "english" checked={this.state.english === true} onChange = {this.onEnglishChange}/> {this.props.lang === 'English' ? 'English' : 'Inglés'} 
                    </label>
                    <br/>
                    <br/>

                    {
                        //Challenges checkbox selector
                    }
                    <span className="req">*</span>
                    <label>{this.props.lang === 'English' ? 'What are your challenges?' : '¿Cúales son sus retos?'}:</label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="checkbox" name="resource" checked={this.state.teachingStrategies === true} onChange={this.onTeachingStrategiesChange}/> {this.props.lang === 'English' ? 'Teaching strategies' : 'Estrategias de enseñanza'}
                    </label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="checkbox" name="resource" checked={this.state.updatedMaterial === true} onChange={this.onUpdatedMaterialChange}/> {this.props.lang === 'English' ? 'Updated material' : 'Material actualizado'} 
                    </label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="checkbox" name="resource" checked={this.state.timeManagement === true} onChange={this.onTimeManagementChange}/> {this.props.lang === 'English' ? 'Time management' : 'Manejo del tiempo'}
                    </label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="checkbox" name="resource" checked={this.state.technologyIntegration === true} onChange={this.onTechnologyIntegrationChange}/> {this.props.lang === 'English' ? 'Technology integration' : 'Integración de tecnologia'}
                    </label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="checkbox" name="resource" checked={this.state.instructionAlignment === true} onChange={this.onInstructionAlignmentChange}/> {this.props.lang === 'English' ? 'Instructional alignment' : 'Alineación curricular'}
                    </label>
                    <br/>
                    <br/>

                    <span className="req">*</span>
                    <label className="clickable radio__text">
                    <input type="checkbox" name="termsOfUse" checked={this.state.termsOfUse === true} onChange={this.onTermsChange}/> {this.props.lang === 'English' ? 'I have read and accept the ' : 'He leído y acepto los '} <a href="https://beta.edvotech.com/static/pages/tos.html"> {this.props.lang === 'English' ? 'Terms of Use' : 'Términos de Uso'}</a> 
                    </label>
                    <br/>
                    <span className="req">*</span>
                    <label className="clickable radio__text">
                    <input type="checkbox" name="privacyPolicy" checked={this.state.privacyPolicy === true} onChange={this.onPrivacyChange}/> {this.props.lang === 'English' ? 'I have read and accept the ' : 'He leído y acepto la '} <a href="https://beta.edvotech.com/static/pages/privacy.html"> {this.props.lang === 'English' ? 'Privacy Policy' : 'Póliza de Privacidad'}</a>
                    </label>
                    <br/>
                    <br/>
                    {
                        //Error message is displayed if the Terms of Use or Privacy Policy is not accepted when trying to submit the form. 
                    }
                    {this.state.secError === true && 
                    <div className="text-danger">
                        {this.props.lang === 'English' ? <p>You must accept the Terms of Use and Privacy Policy before completing your registration.</p> : <p>Debe aceptar los Términos de Uso y la Póliza de Privacidad antes de completar su registración.</p>}
                    </div>}
                    {this.state.registerInvalidInputs === true && 
                    <div className="text-danger">
                        {this.props.lang === 'English' ? <p>Provided input was not valid</p> : <p>Algunos datos provistos no son invalidos.</p>}
                    </div>}
                    {
                        //Error message is displayed if required fields are left blank. 
                    }
                    {this.state.globalError === true && 
                    <div className="text-danger">
                        {this.props.lang === 'English' ? <p>Please fill all the required fields before completing your registration.</p> : <p>Por favor, llene todos los campos requeridos antes de completar su registración.</p>}
                    </div>}
                    
                    {
                        //Buttons to return to the previous page and to submit the registration form. 
                    }
                    <a href="#top">
                        <button onClick={this.toPageThree}>
                            <div className="btn btn-item">
                                {this.props.lang === 'English' ? 'Back' : 'Regresar'}
                            </div>
                        </button>
                    </a>

                    <button disabled={!((this.state.english || this.state.spanish) && (this.state.teachingStrategies || this.state.technologyIntegration || this.state.updatedMaterial || this.state.instructionAlignment || this.state.timeManagement) && this.state.termsOfUse && this.state.privacyPolicy) || (this.state.timeEmployedError)} onClick={this.onSubmit}>
                        <div className="btn btn-item">
                            {this.props.lang === 'English' ? 'Submit' : 'Enviar'}
                        </div>
                    </button>

                </div>}
                </form>
            </div>
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
export default withRouter(connect(mapStateToProps)(RegistrationForm));