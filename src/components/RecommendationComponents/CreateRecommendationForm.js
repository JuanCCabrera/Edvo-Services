import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import auth0Client from '../../Auth';
import Can from '../../Can';
import {Redirect} from 'react-router-dom';
import { setSuccessModal } from '../../actions/successModal';
import { setEditModal } from '../../actions/editModal';

/**
 * Form used to create a new recommendation which can then be assigned to a user of the Teacher type. 
 */
class CreateRecommendationForm extends React.Component{
    constructor(props){
        //Each recommendation must contain a title, header, description, class information (class subject, topics, language, level, type, school type, class format, class level, class size, a quiz question and at least two possible answers for the question.)
        super(props);
        this.state = {
            props: props,
            title: props.reco ? props.reco.title : '',
            titleError: '',
            multimedia: props.reco ? props.reco.multimedia : '',
            header: props.reco ? props.reco.header : '',
            headerError: '',

            description: props.reco ? props.reco.description : '',
            descriptionError: '',

            teachingStrategies: props.reco ? props.reco.teachingStrategies : false,
            updatedMaterial: props.reco ? props.reco.updatedMaterial : false,
            timeManagement: props.reco ? props.reco.timeManagement : false,
            technologyIntegration: props.reco ? props.reco.technologyIntegration : false,
            instructionAlignment: props.reco ? props.reco.instructionAlignment : false,

            moodle: props.reco ? props.reco.moodle : false,
            googleClassroom: props.reco ? props.reco.googleClassroom : false,
            emailResource: props.reco ? props.reco.emailResource : false,
            books: props.reco ? props.reco.books : false,
            socialMedia: props.reco ? props.reco.socialMedia : false,
            projector: props.reco ? props.reco.projector : false,
            computer: props.reco ? props.reco.computer : false,
            tablet: props.reco ? props.reco.tablet : false,
            stylus: props.reco ? props.reco.stylus : false,
            internet: props.reco ? props.reco.internet : false,
            smartboard: props.reco ? props.reco.smartboard : false,
            smartpencil: props.reco ? props.reco.smartpencil : false,
            speakers: props.reco ? props.reco.speakers : false,
            
            topics: props.reco ? props.reco.topics : [''],
            topicError: '',

            location: props.reco ? props.reco.location : '',
            locationError: '',

            subject: props.reco ? props.reco.subject : '',
            subjectError: '',

            language: props.reco ? props.reco.language : 'spanish',
            type: props.reco ? props.reco.type : 'event',
            schoolType: props.reco ? props.reco.schoolType : 'public',
            format: props.reco ? props.reco.format : 'classroom',
            level: props.reco ? props.reco.level : 'Kindergarden - 3rd grade',
            size: props.reco ? props.reco.size : '1 - 10',

            question: props.reco ? props.reco.question : '',
            questionError: '',

            choices: props.reco ? props.reco.choices : ['', ''],
            choiceError: '',

            correctOption: props.reco ? props.reco.correctOption : -1,
            creationError: false
       };
    }
    //Change Handlers

    componentDidUpdate(prevProps, prevState){
        if(prevProps !== this.props){
            if(this.props.lang === 'English'){
                if(this.state.titleError){
                    this.setState(() => ({titleError: 'The title field must contain text.'}));
                }
                if(this.state.headerError){
                    this.setState(() => ({headerError: 'The header field must contain text'}));
                }
                if(this.state.descriptionError){
                    this.setState(() => ({descriptionError: 'The content field must contain text.'}));
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
                if(this.state.questionError){
                    this.setState(() => ({questionError: 'The question field must contain text.'}));
                }
                if(this.state.choiceError){
                    this.setState(() => ({choiceError: 'Enter valid options.'}));
                }
            }else{
                if(this.state.titleError){
                    this.setState(() => ({titleError: 'El título debe contener texto.'}))
                }
                if(this.state.headerError){
                    this.setState(() => ({headerError: 'La descripción debe contener texto.'}))
                }
                if(this.state.questionError){
                    this.setState(() => ({questionError: 'El contenido debe contener texto.'}))
                }
                if(this.state.topicError){
                    this.setState(() => ({topicError: 'Escriba temas válidos.'}))
                }
                if(this.state.locationError){
                    this.setState(() => ({locationError: 'Escriba una dirección física válida.'}));
                }
                if(this.state.subjectError){
                    this.setState(() => ({subjectError: 'El tema del curso debe contener texto.'}));
                }
                if(this.state.choiceError){
                    this.setState(() => ({choiceError: 'Escriba opciones válidas.'}));
                }
            }
        }
    }

    //Change Title in local state
    onTitleChange = (e) => {
        const title = e.target.value;
        this.setState(() => ({title}));
    }

    //Change multimedia element in local state
    onMultimediaChange = (e) => {
        const multimedia = e.target.value;
        this.setState(() => ({multimedia}));
    }

    //Change header in local state
    onHeaderChange = (e) => {
        const header = e.target.value;
        this.setState(() => ({header}));
    }

    //Change description in local state
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({description}));
    }

    //Change location in local state
    onLocationChange = (e) => {
        const location = e.target.value;
        this.setState(() => ({location}));
    }

    //Change subject in local state
    onSubjectChange = (e) => {
        const subject = e.target.value;
        this.setState(() => ({subject}));
    }

    //Change format in local state
    onFormatChange = (e) => {
        const format = e.target.value;
        this.setState(() => ({format}));
    }

    //Change language in local state
    onLanguageChange = (e) => {
        const language = e.target.value;
        this.setState(() => ({language}));
    }

    //Change level in local state
    onLevelChange = (e) => {
        const level = e.target.value;
        this.setState(() => ({level}));
    }

    //Change size in local state
    onSizeChange = (e) => {
        const size = e.target.value;
        this.setState(() => ({size}));
    }

    //Change topics in local state
    onTopicChange = i => e => {
        let topics = [...this.state.topics]
        topics[i] = e.target.value;
        this.setState(() => ({topics: topics}));

        let errorCheck = false;
        let j = 0;
        //Check to see if description is only composed of spaces. 
        for(j = 0; j < this.state.topics.length; j++){
            if(this.state.topics[j] && this.state.topics[j].match(/^\s+$/)){
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

    //Delete topic from the array of listed topics for a class. 
    deleteTopic = i => e => {
        e.preventDefault();
        //There must always be at least one topic
        if(this.state.topics.length > 1){
            //Slice element from topics array
            let topics = [
                ...this.state.topics.slice(0,i),
                ...this.state.topics.slice(i+1)
            ];
            this.setState(() => ({topics}));
        }
    }

    //Add a new topic to the list of topics in the local state. 
    addTopic = (e) => {
        e.preventDefault();
        //There is a maximum of three topics that can be listed from a class. 
        if(this.state.topics.length < 3){
            let topics = this.state.topics.concat(['']);
            this.setState(() => ({topics}));
        }
    }

    //Change correctOption in local state
    setCorrectOption = (choiceIndex) => (e) => {
        console.log(choiceIndex);
        e.preventDefault();
        this.setState(() => ({correctOption: choiceIndex}));
    }

    //Change choices in local state
    onChoiceChange = i => e => {
        let choices = [...this.state.choices]
        choices[i] = e.target.value;
        

        this.setState(() => ({choices}));

        let errorCheck = false;
        let j = 0;
        //Check to see if option(choice) is only composed of spaces. 
        for(j = 0; j < this.state.choices.length; j++){
            if(this.state.choices[j] && this.state.choices[j].match(/^\s+$/)){
                if(this.props.lang === 'English'){
                    this.setState(() => ({choiceError: 'Enter valid options.'}));
                }else{
                    this.setState(() => ({choiceError: 'Escriba opciones válidas.'})); 
                }
                errorCheck = true;
                break;
            }
        }

        if(!errorCheck){
            this.setState(() => ({choiceError: ''}));
        }
    }


    //Delete choice from local state array. 
    deleteChoice = i => e => {
        e.preventDefault();
        //There must always be at least two choices to answer a question. 
        if(this.state.choices.length > 2){
            //Slice removed choice from the list of choices. 
            let choices = [
                ...this.state.choices.slice(0,i),
                ...this.state.choices.slice(i+1)
            ];
            this.setState(() => ({choices}));
            this.setState(() => ({correctOption: -1}));
        }
    }

    //Add choice to the list of choices in the local state. 
    addChoice = (e) => {
        e.preventDefault();
        //There can only be a maximum of four choices per quiz question. 
        if(this.state.choices.length < 4){
            let choices = this.state.choices.concat(['']);
            this.setState(() => ({choices}));
        }
    }

    //Change type in local state
    onTypeChange = (e) => {
        const type = e.target.value;
        this.setState(() => ({type}));
    }

    //Change school type in local state
    onSchoolTypeChange = (e) => {
        const schoolType = e.target.value;
        this.setState(() => ({schoolType}));
    }

    //Change moodle in local state
    onMoodleChange = (e) => {
        const moodle = this.state.moodle;
        this.setState(() => ({moodle: !moodle}))
    }

    //Change googleClassroom in local state. 
    onGoogleClassroomChange = (e) => {
        const googleClassroom = this.state.googleClassroom;
        this.setState(() => ({googleClassroom: !googleClassroom}));
    }

    //Change emailResource in local state
    onEmailResourceChange = (e) => {
        const emailResource = this.state.emailResource;
        this.setState(() => ({emailResource: !emailResource}));
    }

    //Change books in local state
    onBooksChange = (e) => {
        const books = this.state.books;
        this.setState(() => ({books: !books}));
    }

    //Change socialMedia in local state
    onSocialMediaChange = (e) => {
        const socialMedia = this.state.socialMedia;
        this.setState(() => ({socialMedia: !socialMedia}));
    }

    //Change projector in local state
    onProjectorChange = (e) => {
        const projector = this.state.projector;
        this.setState(() => ({projector: !projector}));
    }

    //Change computer in local state
    onComputerChange = (e) => {
        const computer = this.state.computer;
        this.setState(() => ({computer: !computer}));
    }

    //Change tablet in local state
    onTabletChange = (e) => {
        const tablet = this.state.tablet;
        this.setState(() => ({tablet: !tablet}));
    }

    //Change stylus in local state
    onStylusChange = (e) => {
        const stylus = this.state.stylus;
        this.setState(() => ({stylus: !stylus}));
    }

    //Change internet in local state
    onInternetChange = (e) => {
        const internet = this.state.internet;
        this.setState(() => ({internet: !internet}));
    }

    //Change smartboard in local state
    onSmartBoardChange = (e) => {
        const smartboard = this.state.smartboard;
        this.setState(() => ({smartboard: !smartboard}));
    }

    //Change smartpencil in local state
    onSmartPencilChange = (e) => {
        const smartpencil = this.state.smartpencil;
        this.setState(() => ({smartpencil: !smartpencil}));
    }

    //Change speakers in local state
    onSpeakersChange = (e) => {
        const speakers = this.state.speakers;
        this.setState(() => ({speakers: !speakers}));
    }

    //Change teachingStrategies in local state
    onTeachingStrategiesChange = (e) => {
        const teachingStrategies = this.state.teachingStrategies;
        this.setState(() => ({teachingStrategies: !teachingStrategies}))
    }

    //Change updatedMaterial in local state
    onUpdatedMaterialChange = (e) => {
        const updatedMaterial = this.state.updatedMaterial;
        this.setState(() => ({updatedMaterial: !updatedMaterial}));
    }

    //Change timeManagement in local state
    onTimeManagementChange = (e) => {
        const timeManagement = this.state.timeManagement;
        this.setState(() => ({timeManagement: !timeManagement}));
    }

    //Change technologyIntegration in local state
    onTechnologyIntegrationChange = (e) => {
        const technologyIntegration = this.state.technologyIntegration;
        this.setState(() => ({technologyIntegration: !technologyIntegration}));
    }

    //Change instructionAlignment in local state
    onInstructionAlignmentChange = (e) => {
        const instructionAlignment = this.state.instructionAlignment;
        this.setState(() => ({instructionAlignment: !instructionAlignment}));
    }

    //Change question in local state
    onQuestionChange = (e) => {
        const question = e.target.value;
        this.setState(() => ({question}));
    }

    //Submit

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
            //Set error message if there are any required fields which are not filled upon submission. 
        if (!this.state.title || !this.state.header || !this.state.description || !this.state.question || (!this.state.choices[0] && !this.state.choices[1]) || !this.state.subject || !this.state.topics[0]){
            this.setState(() => ({creationError: true}));
            //If checkboxes are empty...
        }else if(!(this.state.teachingStrategies || this.state.updatedMaterial || this.state.timeManagement || this.state.technologyIntegration || this.state.instructionAlignment) && !(this.state.moodle || this.state.googleClassroom || this.state.emailResource || this.state.books || this.state.socialMedia || this.state.projector || this.state.computer || this.state.tablet || this.state.stylus || this.state.internet || this.state.smartboard || this.state.smartpencil || this.state.speakers)){
            this.setState(() => ({creationError: true}));
            //If a regex check fails...
        }else if(this.state.titleError || this.state.headerError || this.state.descriptionError || this.state.locationError || this.state.topicError || this.state.subjectError || this.state.questionError || this.state.choiceError){
            this.setState(() => ({creationError: true}));
        }else{
            this.setState(() => ({creationError: false}));
            console.log("TOKEN: ",auth0Client.getIdToken());
        axios.post('http://localhost:3000/admin/recommendations/create', {
            usertype: auth0Client.getRole(),
            title: this.state.title,
            multimedia: this.state.multimedia,
            header: this.state.header,
            description: this.state.description,

            strategies: this.state.teachingStrategies,
            material: this.state.updatedMaterial,
            timemanagement: this.state.timeManagement,
            tech: this.state.technologyIntegration,
            instructions: this.state.instructionAlignment,

            moodle: this.state.moodle,
            google: this.state.googleClassroom,
            emails: this.state.emailResource,
            books: this.state.books,
            socialmedia: this.state.socialMedia,
            projector: this.state.projector,
            computer: this.state.computer,
            tablet: this.state.tablet,
            stylus: this.state.stylus,
            internet: this.state.internet,
            smartboard: this.state.smartboard,
            smartpencil: this.state.smartpencil,
            speakers: this.state.speakers,
            
            topics: this.state.topics,
            location: '',
            subject: this.state.subject,
            spanish: true, 
            english: true,
            type: this.state.type,
            schooltype: this.state.schoolType,
            format: this.state.format,
            level: this.state.level,
            size: this.state.size,

            question: this.state.question,
            choices: this.state.choices,
            correctoption: this.state.correctOption
        },
            {
                headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` ,'Content-Type': 'application/json' }})
            .then(response =>{
                console.log("PROPS1: ",this.state.props);
                this.state.props.history.replace('/teacher/home');
            })
            .catch(error =>{
                console.log("ERROR IN CREATE RECOM: ", error);
                this.state.props.history.replace('/');
            });
        
            if(this.props.isEdit){
                this.props.dispatch(setEditModal());
            }else{
                this.props.dispatch(setSuccessModal());
            }
            this.props.onSubmit(this.state);
        }
    }

    render(){
        return(
            <Can
            role={auth0Client.getRole()}
            perform="admin:recommendations-add"
            yes={() => (
            <div>
                <div>
                <form onSubmit={this.onSubmit}>
                    <br/>

                    {
                        //Recommendation title input field
                    }
                    
                    <span className="req">*</span>
                    <label>{this.props.lang === 'English' ? 'Title' : 'Título'}:</label>
                    <input type="text" maxLength="200" placeholder = {this.props.lang === 'English' ? 'Title' : 'Título'} className="form-control" style={{width: '50%'}} value = {this.state.title} onChange={this.onTitleChange} onBlur={() => {
                        //Check to see if title is only composed of spaces. 
                        if(this.state.title.match(/^\s+$/)){
                            if(this.props.lang === 'English'){
                                this.setState(() => ({titleError: 'The title must contain text.'}));
                            }else{
                                this.setState(() => ({titleError: 'El título debe contener texto.'})); 
                            }
                        }else{
                            this.setState(() => ({titleError: ''}));
                        }
                    }}/>
                    {this.state.titleError && 
                        <div>
                            <span className="text-danger"> 
                                {this.state.titleError}
                            </span>
                            <br/>
                        </div>}
                    <br/>
                    {
                        //Recommendation header input field
                    }
                    
                    <span className="req">*</span>
                    <label>{this.props.lang === 'English' ? 'Description' : 'Descripción'}:</label>
                    <br/>
                    <span style={{color: 'gray', fontSize: '1.2rem'}}>{this.props.lang === 'English' ? 'Length' : 'Largo'}: {this.state.header.length}/200</span>
                    <br/>
                    <textarea type="text" maxLength="200" rows="2" placeholder = {this.props.lang === 'English' ? 'Description' : 'Descripción'} className="form-control" value = {this.state.header} onChange={this.onHeaderChange} onBlur={() => {
                        //Check to see if header is only composed of spaces. 
                        if(this.state.header.match(/^\s+$/)){
                            if(this.props.lang === 'English'){
                                this.setState(() => ({headerError: 'The header must contain text.'}));
                            }else{
                                this.setState(() => ({headerError: 'La descripción debe contener texto.'})); 
                            }
                        }else{
                            this.setState(() => ({headerError: ''}));
                        }
                    }}/>
                    {this.state.headerError && 
                        <div>
                            <span className="text-danger"> 
                                {this.state.headerError}
                            </span>
                            <br/>
                        </div>}
                    <br/>

                    {
                        //Recommendation description input field
                    }
                    
                    <span className="req">*</span>
                    <label>{this.props.lang === 'English' ? 'Content' : 'Contenido'}:</label>
                    <br/>
                    <span style={{color: 'gray', fontSize: '1.2rem'}}>{this.props.lang === 'English' ? 'Length' : 'Largo'}: {this.state.description.length}/5000</span>
                    <br/>
                    <textarea type = "text" rows="5" maxLength="5000" placeholder = {this.props.lang === 'English' ? 'Content' : 'Contenido'} className="form-control" value = {this.state.description} onChange = {this.onDescriptionChange} onBlur={() => {
                        //Check to see if description is only composed of spaces. 
                        if(this.state.description.match(/^\s+$/)){
                            if(this.props.lang === 'English'){
                                this.setState(() => ({descriptionError: 'The content must contain text.'}));
                            }else{
                                this.setState(() => ({descriptionError: 'El contenido debe contener texto.'})); 
                            }
                        }else{
                            this.setState(() => ({descriptionError: ''}));
                        }
                    }}/>
                    {this.state.descriptionError && 
                        <div>
                            <span className="text-danger"> 
                                {this.state.descriptionError}
                            </span>
                            <br/>
                        </div>}
                    <br/>

                    {
                        //Recommendation location input field
                    }
                    <label>{this.props.lang === 'English' ? 'Location (Optional)' : 'Localización (Opcional)'}:</label>
                    <input type = "text" maxLength="150" placeholder = {this.props.lang === 'English' ? 'Location' : 'Localización'} className="form-control" value = {this.state.location} onChange = {this.onLocationChange} onBlur={() => {
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

                    {
                        //Multimedia input field
                    }
                    <label>{this.props.lang === 'English' ? 'Insert Video or Image Link (Optional)' : 'Inserte Enlace de Vídeo o Imagen (Opcional)'}:</label>
                    <input type="text" placeholder = "Multimedia" className="form-control" value = {this.state.multimedia} onChange={this.onMultimediaChange}/>

                    <br/>
                    {
                        //Quiz question input field
                    }
                    
                    <span className="req">*</span>
                    <label>{this.props.lang === 'English' ? 'Question' : 'Pregunta'}: </label>
                    <input type="text" maxLength="700" disabled={this.props.isEdit} className="form-control" placeholder = {this.props.lang === 'English' ? 'Question' : 'Pregunta'} value = {this.state.question} onChange={this.onQuestionChange} onBlur={() => {
                        //Check to see if description is only composed of spaces. 
                        if(this.state.question.match(/^\s+$/)){
                            if(this.props.lang === 'English'){
                                this.setState(() => ({questionError: 'The question field must contain text.'}));
                            }else{
                                this.setState(() => ({questionError: 'La pregunta debe contener texto.'})); 
                            }
                        }else{
                            this.setState(() => ({questionError: ''}));
                        }
                    }}/>
                    {this.state.questionError && 
                        <div>
                            <span className="text-danger"> 
                                {this.state.questionError}
                            </span>
                            <br/>
                        </div>}
                    <br/>

                    {
                        //Choices to answer quiz question
                    }
                    
                    <span className="req">*</span>
                    <label>{this.props.lang === 'English' ? 'Options' : 'Opciones'} (Max: 4):</label>
                    {this.state.choices.map((choice, index) => (
                        <span key={index}>
                            <br/>
                            <input
                            type = "text"
                            placeholder = {this.props.lang === 'English' ? 'Option' : 'Opción'}
                            className="form-control"
                            style={{width: '50%', display: 'inline', marginRight: '1rem'}}
                            value={choice}
                            disabled={this.props.isEdit}
                            maxLength="400"
                            onChange={this.onChoiceChange(index)}
                            />
                            
                            {this.state.correctOption === index && <div style={{display: 'inline-block', marginLeft: '0.3rem'}}>
                                <span style={{color: 'green', width: '1rem'}}><i className="fa fa-check-circle" aria-hidden="true"></i></span>
                            </div>}

                            {this.state.choices.length > 2 && <div style={{display: 'inline'}}>
                            <button disabled={this.props.isEdit} onClick={this.deleteChoice(index)}>
                                <span style={{fontSize: '1.8rem', width: '1rem', verticalAlign: 'center'}}>
                                    <i className="fa fa-window-close"></i>
                                </span>
                            </button>
                            </div>
                            }

                            <br/>
                            <button disabled={this.props.isEdit} onClick={this.setCorrectOption(index)} disabled={this.state.correctOption === index}>
                            <div className="btn btn-item btn-pad">
                                {this.props.lang === 'English' ? 'Mark As Correct Answer' : 'Marcar Como Contestación Correcta'}
                            </div>

                            </button>

                        </span>
                    ))}
                    
                    
                    {this.state.choiceError && 
                        <div>
                            <span className="text-danger"> 
                                {this.state.choiceError}
                            </span>
                            <br/>
                        </div>}
                    <br/>

                    {
                        //Add Choice button
                    }
                    {this.state.choices.length < 4 && 
                    <div>
                    <button onClick={this.addChoice} disabled={this.state.choices.length === 4 || this.props.isEdit}>
                        <div className="btn btn-item">
                            {this.props.lang === 'English' ? 'Add New Option ' : 'Añadir Nueva Opción '} 
                            <span style={{size: '50%', marginLeft: '0.5rem'}}><i className="fa fa-plus" aria-hidden="true"></i></span>
                        </div>
                    </button>
                    <br/>
                    </div>}
                    {
                        //<button onClick={() => this.setState(() => ({correctOption: -1}))}>{this.props.lang === 'English' ? 'Clear Selection of Correct Answer' : 'Deshacer Seleccion de Contestacion Correcta'}</button>
                    }
                    <br/>
                    {
                        //Categories checkbox selector
                    }
                    
                    <span className="req">*</span>
                    <label>{this.props.lang === 'English' ? 'Challenge Categories' : 'Categorías de Retos'}:</label>
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
                    {
                        //Type radio button selector
                    }
                    
                    <span className="req">*</span>
                    <label>{this.props.lang === 'English' ? 'Type' : 'Tipo'}: </label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="radio" name="type" value= "event" checked={this.state.type === 'event'} onChange = {this.onTypeChange}/> {this.props.lang === 'English' ? 'Event' : 'Evento'}
                    </label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="radio" name="type" value= "book" checked={this.state.type === 'book'} onChange = {this.onTypeChange}/> {this.props.lang === 'English' ? 'Book' : 'Libro'}
                    </label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="radio" name="type" value= "tour" checked={this.state.type === 'tour'} onChange = {this.onTypeChange}/> {this.props.lang === 'English' ? 'Tour' : 'Excursión'} 
                    </label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="radio" name="type" value= "concept" checked={this.state.type === 'concept'} onChange = {this.onTypeChange}/> {this.props.lang === 'English' ? 'Concept' : 'Concepto'} 
                    </label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="radio" name="type" value= "material" checked={this.state.type === 'material'} onChange = {this.onTypeChange}/> {this.props.lang === 'English' ? 'New Material' : 'Material Nuevo'} 
                    </label>
                    <br/>
                    <hr/>
                    {
                        //Class subject input field
                    }
                    
                    <span className="req">*</span>
                    <label>{this.props.lang === 'English' ? 'Subject' : 'Tema'} :</label>
                    <input type="text" maxLength="100" placeholder={this.props.lang === 'English' ? 'Subject' : 'Tema'} className="form-control" style={{width: '50%'}} value={this.state.subject} onChange={this.onSubjectChange} onBlur={() => {
                        //Check to see if description is only composed of spaces. 
                        if(this.state.subject.match(/^\s+$/)){
                            if(this.props.lang === 'English'){
                                this.setState(() => ({subjectError: 'The subject field must contain text.'}));
                            }else{
                                this.setState(() => ({subjectError: 'El tema del curso debe contener texto.'})); 
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
                        //Class format radio button selector
                    }
                    
                    <span className="req">*</span>
                    <label>{this.props.lang === 'English' ? 'Class Format' : 'Formato de Clase'} :</label>
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
                        //School system radio button selector
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
                        //Level radio button selector
                    }
                    
                    <span className="req">*</span>
                    <label>{this.props.lang === 'English' ? 'Level' : 'Nivel'}:</label>
                    <br/>
                    
                    <label className="clickable radio__text">
                    <input type="radio" name="level" value= "Kindergarden - 3rd grade" checked={this.state.level === 'Kindergarden - 3rd grade'} onChange = {this.onLevelChange}/> {this.props.lang === 'English' ? 'Kindergarden - 3rd grade' : 'Kindergarden - 3er grado'}<br/>
                    </label>
                    <br/>
                    
                    <label className="clickable radio__text">
                    <input type="radio" name="level" value= "4th - 6th grade" checked={this.state.level === '4th - 6th grade'} onChange = {this.onLevelChange}/> {this.props.lang === 'English' ? '4th - 6th grade' : '4to - 6to grado'}<br/>
                    </label>
                    <br/>
                    
                    <label className="clickable radio__text">
                    <input type="radio" name="level" value= "7th - 8th grade" checked={this.state.level === '7th - 8th grade'} onChange = {this.onLevelChange}/> {this.props.lang === 'English' ? '7th - 8th grade' : '7mo - 8vo grado'} <br/>
                    </label>
                    <br/>
                    
                    <label className="clickable radio__text">
                    <input type="radio" name="level" value= "9th - 12th grade" checked={this.state.level === '9th - 12th grade'} onChange = {this.onLevelChange}/> {this.props.lang === 'English' ? '9th - 12th grade' : '9no - 12mo grado'}<br/>
                    </label>
                    <br/>
                    
                    <label className="clickable radio__text">
                    <input type="radio" name="level" value= "University / College" checked={this.state.level === 'University / College'} onChange = {this.onLevelChange}/> {this.props.lang === 'English' ? 'University/College' : 'Universidad/Colegio'}<br/>
                    </label>
                    <br/>
                    <br/>
                    {
                        //Group size radio button selector
                    }
                    
                    <span className="req">*</span>
                    <label>{this.props.lang === 'English' ? 'Group Size' : 'Tamaño de Grupo'}</label>
                    <br/>
                    
                    <label className="clickable radio__text">
                    <input type="radio" name="size" value= "1 - 10" checked={this.state.size === '1 - 10'} onChange = {this.onSizeChange}/> 1 - 10<br/>
                    </label>
                    <br/>
                    
                    <label className="clickable radio__text">
                    <input type="radio" name="size" value= "11 - 20" checked={this.state.size === '11 - 20'} onChange = {this.onSizeChange}/> 11 - 20<br/>
                    </label>
                    <br/>

                    <label className="clickable radio__text">
                    <input type="radio" name="size" value= "21 - 30" checked={this.state.size === '21 - 30'} onChange = {this.onSizeChange}/> 21 - 30 <br/>
                    </label>
                    <br/>
                    
                    <label className="clickable radio__text">
                    <input type="radio" name="size" value= "31+" checked={this.state.size === '31+'} onChange = {this.onSizeChange}/> 31+<br/>
                    </label>
                    <br/>
                    <br/>
                    {
                        //Class topics input field
                    }
                    
                    <span className="req">*</span>
                    <label>{this.props.lang === 'English' ? 'Class Topics' : 'Temas del Curso'} (Max: 3):</label>
                    {this.state.topics.map((topic, index) => (
                        <span key={index}>
                            <br/>
                            <input
                            type = "text"
                            className="form-control"
                            style={{width: '50%', display: 'inline', marginRight: '1rem'}}
                            placeholder = {this.props.lang === 'English' ? 'Topic' : 'Tema'}
                            value={topic}
                            maxLength="50"
                            onChange={this.onTopicChange(index)}
                            />
                            {this.state.topics.length > 1 && <div style={{display: 'inline'}}>
                            <button onClick={this.deleteTopic(index)}>
                                <span>
                                    <i className="fa fa-window-close"></i>
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
                        //Add New Topic button
                    }
                    {this.state.topics.length < 3 && 
                    <div>
                    <button onClick={this.addTopic} disabled={this.state.topics.length === 3}>
                        <div className="btn btn-item">
                            {this.props.lang === 'English' ? 'Add New Topic' : 'Añadir Tema Nuevo'}
                            <span style={{size: '50%', marginLeft: '0.5rem'}}><i className="fa fa-plus" aria-hidden="true"></i></span>
                        </div>
                    </button>
                    <br/>
                    </div>}
                    <br/>
                    {
                        //Resources checkbox input field
                    }
                    
                    <span className="req">*</span>
                    <label>{this.props.lang === 'English' ? 'Resources' : 'Recursos'}</label>
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
                    <input type="checkbox" name="resource" checked={this.state.socialMedia === true} onChange={this.onSocialMediaChange}/> {this.props.lang === 'English' ? 'Social Media' : 'Medios Sociales'} 
                    </label>
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
                    <input type="checkbox" name="resource" checked={this.state.stylus === true} onChange={this.onStylusChange}/> Stylus
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
                        //Language radio button selector
                    }
                    
                    <span className="req">*</span>
                    <label>{this.props.lang === 'English' ? 'Language' : 'Lenguaje'}:</label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="radio" name="lang" value= "spanish" checked={this.state.language === 'spanish'} onChange = {this.onLanguageChange}/> {this.props.lang === 'English' ? 'Spanish' : 'Español'}<br/>
                    </label>
                    <br/>
                    <label className="clickable radio__text">
                    <input type="radio" name="lang" value= "english" checked={this.state.language === 'english'} onChange = {this.onLanguageChange}/> {this.props.lang === 'English' ? 'English' : 'Inglés'}<br/>
                    </label>
                    <br/>
                    <br/>
                    {
                        //Error message displayed when field is submitted without having all required fields. 
                    }
                    {this.state.creationError === true && 
                        <div className="text-danger">
                            {this.props.lang === 'English' ? <p>Please fill all required fields before saving the recommendation.</p> : <p>Por favor, llene todos los campos requeridos antes de guardar la recomendación.</p>}
                        </div>}
                    
                    <br/>
                    {
                        //Submit button
                    }
                    <button onClick={this.onSubmit}>
                        <div className="btn btn-item">
                            {this.props.lang === 'English' ? 'Submit' : 'Enviar'}
                        </div>
                    </button>
                </form>
                </div>
            </div>
                                 )}
                                 no={() => <Redirect to="/" />}
                               />
        );
    }
}

//Map the current language state to the component properties. 
const mapStateToProps = (state, props) => {
    
    return {
        lang: state.language.lang
    }
}

//Connect the component to the controller. 
export default connect(mapStateToProps)(CreateRecommendationForm);