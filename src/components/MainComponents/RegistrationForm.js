import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import { connect } from 'react-redux';
import axios from 'axios';
import auth0Client from '../../Auth';
import { Redirect, BrowserRouter, Route } from 'react-router-dom';

class RegistrationForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            props: props,
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
                this.state.props.history.replace('/teacher/home');
            })
            .catch(error =>{
                this.state.props.history.replace('/');
            });
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
                    <label>{this.props.lang === 'English' ? 'Password' : 'Contraseña'}:</label>
                    <input type="password" placeholder = "Password" value = {this.state.password} onChange={this.onPasswordChange}/>
    
                    <br/>
                    <label>{this.props.lang === 'English' ? 'Confirm Password' : 'Reingresar Contraseña'}:</label>
                    <input type="password" placeholder = "Confirm Password" value = {this.state.confirmPassword} onChange={this.onConfirmPasswordChange}/>
    
                    <br/>
                    <label>{this.props.lang === 'English' ? 'Name' : 'Nombre'}:</label>
                    <input type = "text" placeholder = "Name" value = {this.state.name} onChange = {this.onNameChange}/>
    
                    <br/>
                    <label>{this.props.lang === 'English' ? 'Last Name' : 'Apellido'}:</label>
                    <input type = "text" placeholder = "Last Name" value = {this.state.lastName} onChange = {this.onLastNameChange}/>
    
                    <br/>   
                    <label>{this.props.lang === 'English' ? 'Gender' : 'Género'}:</label>
                    <br/>
                        <input type="radio" name="gender" value= "male" checked={this.state.gender === 'male'} onChange = {this.onGenderChange}/> {this.props.lang === 'English' ? 'Male' : 'Masculino'}<br/>
                        <input type="radio" name="gender" value= "female" checked={this.state.gender === 'female'} onChange = {this.onGenderChange}/> {this.props.lang === 'English' ? 'Female' : 'Femenino'}<br/>
                    {
                       //<input type="radio" name="gender" value= "other" checked={this.state.gender === 'other'} onChange = {this.onGenderChange}/> {this.props.lang === 'English' ? 'Other' : 'Otro'} <br/>
                    }

                    <br/>
                    <label>{this.props.lang === 'English' ? 'Date of Birth' : 'Fecha de Nacimiento'}:</label>
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
                    <label>{this.props.lang === 'English' ? 'Level of Education' : 'Nivel de Educación'}:</label>
                    <br/>
                    <input type="radio" name="levelOfEdu" value= "AS" checked={this.state.levelOfEdu === 'AS'} onChange = {this.onLOEChange}/> {this.props.lang === 'English' ? 'Associate\'s Degree' : 'Grado Asociado'}<br/>
                    <input type="radio" name="levelOfEdu" value= "BSD" checked={this.state.levelOfEdu === 'BSD'} onChange = {this.onLOEChange}/> {this.props.lang === 'English' ? 'Bachellor\'s Degree' : 'Bachillerato'}<br/>
                    <input type="radio" name="levelOfEdu" value= "MSD" checked={this.state.levelOfEdu === 'MSD'} onChange = {this.onLOEChange}/> {this.props.lang === 'English' ? 'Master\'s Degree' : 'Maestría'}<br/>
                    <input type="radio" name="levelOfEdu" value= "PHD" checked={this.state.levelOfEdu === 'PHD'} onChange = {this.onLOEChange}/> {this.props.lang === 'English' ? 'Doctor of Philosophy' : 'Doctor en Filosofía'}<br/>
                    <input type="radio" name="levelOfEdu" value= "EDD" checked={this.state.levelOfEdu === 'EDD'} onChange = {this.onLOEChange}/>  {this.props.lang === 'English' ? 'Doctor of Education' : 'Doctor en Educación'}<br/>
                    <input type="radio" name="levelOfEdu" value= "NA" checked={this.state.levelOfEdu === 'NA'} onChange = {this.onLOEChange}/> {this.props.lang === 'English' ? 'None' : 'Ninguna'}<br/>

                    <br/>
                    <label>{this.props.lang === 'English' ? 'Location of Employment' : 'Localización de Empleo'}:</label>
                        <input type="text" placeholder="Location" value={this.state.location} onChange={this.onLocationChange}/>
    
                <br/>
                <button onClick={this.toPageTwo}>{this.props.lang === 'English' ? 'Next' : 'Continuar'}</button>
                </div>}

                <br/>
                {this.state.currPage == 2 && <div>
                    <h2> {this.props.lang === 'English' ? 'Class Information' : 'Información de Clase'} </h2>
                    <br/>
                    <label>{this.props.lang === 'English' ? 'Subject' : 'Tema'}:</label>
                    <input type="text" placeholder="Subject" value={this.state.subject} onChange={this.onSubjectChange}/>

                    <br/>
                    <label>{this.props.lang === 'English' ? 'Class Format' : 'Formato de Clase'}:</label>
                    <br/>
                    <input type="radio" name="format" value= "classroom" checked={this.state.format === 'classroom'} onChange = {this.onFormatChange}/> {this.props.lang === 'English' ? 'Classroom' : 'Salón de Clases'}<br/>
                    <input type="radio" name="format" value= "blended" checked={this.state.format === 'blended'} onChange = {this.onFormatChange}/> {this.props.lang === 'English' ? 'Blended' : 'Mixto'}<br/>
                    <input type="radio" name="format" value= "online" checked={this.state.format === 'online'} onChange = {this.onFormatChange}/> {this.props.lang === 'English' ? 'Online' : 'En Línea'} <br/>
                
                    <br/>
                    <label>{this.props.lang === 'English' ? 'Language' : 'Lenguaje'}:</label>
                    <br/>
                    <input type="radio" name="lang" value= "spanish" checked={this.state.language === 'spanish'} onChange = {this.onLanguageChange}/> {this.props.lang === 'English' ? 'Spanish' : 'Español'}<br/>
                    <input type="radio" name="lang" value= "english" checked={this.state.language === 'english'} onChange = {this.onLanguageChange}/> {this.props.lang === 'English' ? 'English' : 'Inglés'}<br/>
                    
                    <br/>
                    <label>{this.props.lang === 'English' ? 'Level' : 'Nivel'}:</label>
                    <br/>
                    <input type="radio" name="level" value= "Kindergarden - 3rd grade" checked={this.state.level === 'Kindergarden - 3rd grade'} onChange = {this.onLevelChange}/> {this.props.lang === 'English' ? 'Kindergarden - 3rd grade' : 'Kindergarden - 3er grado'}<br/>
                    <input type="radio" name="level" value= "4th - 6th grade" checked={this.state.level === '4th - 6th grade'} onChange = {this.onLevelChange}/> {this.props.lang === 'English' ? '4th - 6th grade' : '4to - 6to grado'}<br/>
                    <input type="radio" name="level" value= "7th - 8th grade" checked={this.state.level === '7th - 8th grade'} onChange = {this.onLevelChange}/> {this.props.lang === 'English' ? '7th - 8th grade' : '7mo - 8vo grado'} <br/>
                    <input type="radio" name="level" value= "9th - 12th grade" checked={this.state.level === '9th - 12th grade'} onChange = {this.onLevelChange}/> {this.props.lang === 'English' ? '9th - 12th grade' : '9no - 12mo grado'}<br/>
                    <input type="radio" name="level" value= "University / College" checked={this.state.level === 'University / College'} onChange = {this.onLevelChange}/> {this.props.lang === 'English' ? 'University/College' : 'Universidad/Colegio'}<br/>

                    <br/>
                    <label>{this.props.lang === 'English' ? 'Group Size' : 'Tamaño de Grupo'}</label>
                    <br/>
                    <input type="radio" name="size" value= "1 - 10" checked={this.state.size === '1 - 10'} onChange = {this.onSizeChange}/> 1 - 10<br/>
                    <input type="radio" name="size" value= "11 - 20" checked={this.state.size === '11 - 20'} onChange = {this.onSizeChange}/> 11 - 20<br/>
                    <input type="radio" name="size" value= "21 - 30" checked={this.state.size === '21 - 30'} onChange = {this.onSizeChange}/> 21 - 30 <br/>
                    <input type="radio" name="size" value= "31+" checked={this.state.size === '31+'} onChange = {this.onSizeChange}/> 31+<br/>
                    
                    <label>{this.props.lang === 'English' ? 'Topics Taught' : 'Tópicos de Clase'} (Max: 3):</label>
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
                    <button onClick={this.addTopic} disabled={this.state.topicsTaught.length === 3}>{this.props.lang === 'English' ? 'Add New Topic' : 'Añadir Tópico Nuevo'}</button>

                    <br/>
                    <button onClick={this.toPageOne}>{this.props.lang === 'English' ? 'Back' : 'Regresar'}</button> <button onClick={this.toPageThree}>{this.props.lang === 'English' ? 'Next' : 'Continuar'}</button>
                </div>}

                {this.state.currPage == 3 && <div>
                    <h2>{this.props.lang === 'English' ? 'School Information' : 'Información de Escuela'}</h2>
                    <br/>
                    <label>{this.props.lang === 'English' ? 'School Name' : 'Nombre de Escuela'}:</label>
                    <input type="text" placeholder="School Name" value={this.state.schoolName} onChange={this.onSchoolNameChange}/>

                    <br/>
                    <label>{this.props.lang === 'English' ? 'School Location' : 'Localización de Escuela'}:</label>
                    <input type="text" placeholder="School Location" value={this.state.schoolLocation} onChange={this.onSchoolLocationChange}/>

                    <br/>
                    <label>{this.props.lang === 'English' ? 'Institution ID (Optional)' : 'Identificación de institución (Opcional)'}:</label>
                    <input type="text" placeholder="Institution ID" value={this.state.institutionID} onChange={this.onInstitutionIDChange}/>

                    <br/>
                    <label>{this.props.lang === 'English' ? 'School System' : 'Sistema Educativo'}:</label>
                    <br/>
                    <input type="radio" name="system" value= "public" checked={this.state.schoolType === 'public'} onChange = {this.onSchoolTypeChange}/> {this.props.lang === 'English' ? 'Public' : 'Público'}<br/>
                    <input type="radio" name="system" value= "private" checked={this.state.schoolType === 'private'} onChange = {this.onSchoolTypeChange}/> {this.props.lang === 'English' ? 'Private' : 'Privado'}<br/>
                    <input type="radio" name="system" value= "independent" checked={this.state.schoolType === 'independent'} onChange = {this.onSchoolTypeChange}/> {this.props.lang === 'English' ? 'Independent' : 'Independiente'} <br/>
                    
                    <br/>
                    <label>{this.props.lang === 'English' ? 'What resources do you use in your school?' : '¿Qué recursos utiliza en su escuela?'}</label>
                    <br/>
                    <input type="checkbox" name="resource" checked={this.state.moodle === true} onChange={this.onMoodleChange}/> Moodle <br/>
                    <input type="checkbox" name="resource" checked={this.state.googleClassroom === true} onChange={this.onGoogleClassroomChange}/> Google Classroom <br/>
                    <input type="checkbox" name="resource" checked={this.state.emailResource === true} onChange={this.onEmailResourceChange}/> Emails <br/>
                    <input type="checkbox" name="resource" checked={this.state.books === true} onChange={this.onBooksChange}/> {this.props.lang === 'English' ? 'Books' : 'Libros'} <br/>
                    <input type="checkbox" name="resource" checked={this.state.socialMedia === true} onChange={this.onSocialMediaChange}/> {this.props.lang === 'English' ? 'Social Media' : 'Medios Sociales'} <br/>
                    
                    <br/>
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
                    <button onClick={this.toPageTwo}>{this.props.lang === 'English' ? 'Back' : 'Regresar'}</button> <button onClick={this.toPageFour}>{this.props.lang === 'English' ? 'Next' : 'Continuar'}</button>
                </div>}

                {this.state.currPage == 4 && <div>
                    <h2>{this.props.lang === 'English' ? 'Profile' : 'Perfil'}</h2>
                    <br/>

                    <label>{this.props.lang === 'English' ? 'Employed Since' : 'Empleado Desde'}:</label>
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
                    <label>{this.props.lang === 'English' ? 'Known Languages' : 'Lenguajes Conocidos'}:</label>
                    <br/>
                    <input type="checkbox" name="preflang" value= "spanish" checked={this.state.spanish === true} onChange = {this.onSpanishChange}/> {this.props.lang === 'English' ? 'Spanish' : 'Español'}<br/>
                    <input type="checkbox" name="preflang" value= "english" checked={this.state.english === true} onChange = {this.onEnglishChange}/> {this.props.lang === 'English' ? 'English' : 'Inglés'} <br/>
                    
                    <br/>
                    <label>{this.props.lang === 'English' ? 'Challenges' : 'Retos'}:</label>
                    <br/>
                    <input type="checkbox" name="resource" checked={this.state.teachingStrategies === true} onChange={this.onTeachingStrategiesChange}/> {this.props.lang === 'English' ? 'Teaching Strategies' : 'Estrategias de Enseñanza'} <br/>
                    <input type="checkbox" name="resource" checked={this.state.updatedMaterial === true} onChange={this.onUpdatedMaterialChange}/> {this.props.lang === 'English' ? 'Updated Material' : 'Material Actualizado'} <br/>
                    <input type="checkbox" name="resource" checked={this.state.timeManagement === true} onChange={this.onTimeManagementChange}/> {this.props.lang === 'English' ? 'Time Management' : 'Manejo del Tiempo'} <br/>
                    <input type="checkbox" name="resource" checked={this.state.technologyIntegration === true} onChange={this.onTechnologyIntegrationChange}/> {this.props.lang === 'English' ? 'Technology Integration' : 'Integración de Tecnologia'} <br/>
                    <input type="checkbox" name="resource" checked={this.state.instructionAlignment === true} onChange={this.onInstructionAlignmentChange}/> {this.props.lang === 'English' ? 'Instructional Alignment' : 'Alineamiento de Instrucción'} <br/>

                    <br/>
                    <button onClick={this.toPageThree}>{this.props.lang === 'English' ? 'Back' : 'Regresar'}</button> <button onClick={this.onSubmit}>Submit</button>
                </div>}
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.language.lang
    }
}
export default connect(mapStateToProps)(RegistrationForm);