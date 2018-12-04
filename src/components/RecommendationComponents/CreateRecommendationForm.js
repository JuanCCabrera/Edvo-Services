import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import auth0Client from '../../Auth';
import Can from '../../Can';
import {Redirect, withRouter} from 'react-router-dom';
import { setSuccessModal } from '../../actions/successModal';
import { setEditModal } from '../../actions/editModal';
import { setFailureModal } from '../../actions/failureModal';
//WYSIWYG
import { EditorState, convertFromRaw, convertToRaw, ContentState } from 'draft-js';
import { Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

/**
 * Form used to create a new recommendation which can then be assigned to a user of the Teacher type. 
 */
class CreateRecommendationForm extends React.Component{
    constructor(props){
        //Each recommendation must contain a title, header, 
        //description, class information (class subject, topics, language, level, 
        //type, school type, class format, class level, class size, a quiz question 
        //and at least two possible answers for the question.)
        super(props);
        
        this.state = {
            recomid: props.reco ? props.reco.id : '',
            editorState: props.reco ? EditorState.createWithContent(ContentState.createFromBlockArray(
                htmlToDraft(props.reco.description).contentBlocks)) : EditorState.createEmpty(),
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
            applications: props.reco ? props.reco.applications : false,
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
            spanish: props.reco ? props.reco.spanish == "spanish" ? true: false : false,
            english: props.reco ? props.reco.english == "english" ? true: false : false,
            
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

            choices: props.reco ? props.reco.choices : ['', '', ''],
            choiceError: '',

            correctOption: props.reco ? props.reco.correctOption : -1,
            active: props.reco ? props.reco.active : true,
            creationError: false
       };
    }

    //Redirect user to the Manage Recommendations page if user attempts to enter the page by using a custom URL. 
    componentWillMount(){
        if(!this.props.reco && this.props.isEdit){
            this.props.history.replace('/recommendations/manage');
        }
    }
    //Change Handlers

    //Update error messages if language setting is changed. 
    componentDidUpdate(prevProps, prevState){
        if(prevProps !== this.props){
            if(this.props.lang === 'English'){
                if(this.state.titleError){
                    this.setState(() => ({titleError: 'The title field must contain text.'}));
                }
                if(this.state.headerError){
                    this.setState(() => ({headerError: 'The header field must contain text.'}));
                }
                if(this.state.descriptionError){
                    this.setState(() => ({descriptionError: 'The content field must contain text.'}));
                }
                if(this.state.topicError){
                    this.setState(() => ({topicError: 'Topics must contain text.'}));
                }
                if(this.state.locationError){
                    this.setState(() => ({locationError: 'The address must contain text.'}));
                }
                if(this.state.subjectError){
                    this.setState(() => ({subjectError: 'The subject field must contain text.'}));
                }
                if(this.state.questionError){
                    this.setState(() => ({questionError: 'The question field must contain text.'}));
                }
                if(this.state.choiceError){
                    this.setState(() => ({choiceError: 'Options must contain text.'}));
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
                    this.setState(() => ({topicError: 'Los temas deben contener texto.'}))
                }
                if(this.state.locationError){
                    this.setState(() => ({locationError: 'La dirección física debe contener texto.'}));
                }
                if(this.state.subjectError){
                    this.setState(() => ({subjectError: 'El tema del curso debe contener texto.'}));
                }
                if(this.state.choiceError){
                    this.setState(() => ({choiceError: 'Las opciones deben contener texto.'}));
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

        //Validate topics when one is deleted
        let j = 0;
        let errorCheck = false;
        for(j = 0; j < this.state.topics.length; j++){
            //Check if topic exists and if the topic has only white space. 
            if(this.state.topics[j] && this.state.topics[j].match(/^\s+$/)){
                if(this.props.lang === 'English'){
                    this.setState(() => ({topicError: 'Topics must contain text.'}));
                }else{
                    this.setState(() => ({topicError: 'Los temas deben contener texto.'})); 
                }
                errorCheck = true;
                break;
            }
        }
        //Clear error if no errors are present in the class topics. 
        if(!errorCheck){
            this.setState(() => ({topicError: ''}));
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
        e.preventDefault();
        this.setState(() => ({correctOption: choiceIndex}));
    }

    //Change choices in local state
    onChoiceChange = i => e => {
        let choices = [...this.state.choices]
        choices[i] = e.target.value;
        this.setState(() => ({choices: choices}));
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

    //Change applications boolean in local state
    onApplicationsChange = (e) => {
        const applications = this.state.applications;
        this.setState(() => ({applications: !applications}));
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

    onChange = (editorState) => {
        
        const html = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
        //Update editorState with current editor content. 
        this.setState({editorState});
    }

    //Submit

    onSubmit = (e) => {
        e.preventDefault();
            //Set error message if there are any required fields which are not filled upon submission. 
        if (!this.state.title || !this.state.header || !this.state.editorState || !(this.props.isEdit || this.state.question) || !this.state.subject || !this.state.topics[0] || (!this.props.isEdit && (!this.state.choices[0] || !this.state.choices[1] || !this.state.choices[2]))){
            this.setState(() => ({creationError: true}));
            //If checkboxes are empty, generate an error
        }else if(!(this.state.teachingStrategies || this.state.updatedMaterial || this.state.timeManagement || this.state.technologyIntegration || this.state.instructionAlignment) || !(this.state.moodle || this.state.googleClassroom || this.state.emailResource || this.state.books || this.state.socialMedia || this.state.projector || this.state.computer || this.state.tablet || this.state.stylus || this.state.internet || this.state.smartboard || this.state.smartpencil || this.state.speakers)){
            this.setState(() => ({creationError: true}));
            //If a regex check fails, generate an error
        }else if(this.state.titleError || this.state.headerError || this.state.descriptionError || this.state.locationError || this.state.topicError || this.state.subjectError || this.state.questionError || this.state.choiceError){
            this.setState(() => ({creationError: true}));
            //If no quiz options is selected as the correct option, generate an error. 
        }else if(this.state.correctOption == -1){
            this.setState(() => ({creationError: true}));
        //Otherwise, clear errors and post information to database. 
        }else{
            this.setState(() => ({creationError: false}));
            let choicesWithAnswer = []

            //Format quiz choices for database handling. 
            for(var i=0; i<3 ; i++){
                if(this.state.correctOption == i)
                    choicesWithAnswer.push({choice: this.state.choices[i], correctanswer: true})
                else                    
                    choicesWithAnswer.push({choice: this.state.choices[i], correctanswer: false})            }

            //Determine type of route to be used (recommendation creation or recommendation modification). 
            const createModify = this.props.isEdit ? "modify" : "create"
            
        axios.post('https://beta.edvotech.com/api/'+auth0Client.getRole()+'/recommendations/'+createModify, {
            usertype: auth0Client.getRole(),
            recomid: this.state.recomid,
            title: this.state.title,
            multimedia: "",
            header: this.state.header,
            description: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),

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
            topica: this.state.topics[0] == undefined ? "" : this.state.topics[0],
            topicb: this.state.topics[1] == undefined ? "" : this.state.topics[1],
            topicc: this.state.topics[2] == undefined ? "" : this.state.topics[2],
            
            location: this.state.location,
            subject: this.state.subject,
            spanish: this.state.language == "spanish" ? true : false,
            english: this.state.language == "english" ? true : false,
            type: this.state.type,
            schooltype: this.state.schoolType,
            format: this.state.format,
            level: this.state.level,
            size: this.state.size,
            applications: this.state.applications,

            question: this.state.question,
            choices: choicesWithAnswer,
            active: this.state.active
        },
            {
                headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` ,'Content-Type': 'application/json' }})
            .then(response =>{
                //If recommendation is being edited, set the edit modal. 
                if(this.props.isEdit){
                    this.props.dispatch(setEditModal());
                }else{
                    //If recommendation is being created, set the success modal. 
                    this.props.dispatch(setSuccessModal());
                }
                //Redirect user to Manage Recommendations page. 
                this.props.history.push('/recommendations/manage');
            })
            .catch(error =>{
                //Set failure modal on error. 
                this.props.dispatch(setFailureModal());
            });
            
            this.props.onSubmit(this.state);
        }
    }



    render(){
        return(
            //Authenticate user information to grant access to the Create Recommendations page. 
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
                        //Check to see if title is only composed of white space.
                        this.setState(() => ({title: this.state.title.trim()})); 
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
                    {
                        //Title error
                    }
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
                    <span style={{color: 'gray', fontSize: '1.2rem'}}>{this.props.lang === 'English' ? 'Characters' : 'Caracteres'} {this.state.header.length}/200</span>
                    <br/>
                    <textarea type="text" maxLength="200" rows="2" placeholder = {this.props.lang === 'English' ? 'Description' : 'Descripción'} className="form-control" value = {this.state.header} onChange={this.onHeaderChange} onBlur={() => {
                        //Check to see if header is only composed of spaces.
                        this.setState(() => ({header: this.state.header.trim()})); 
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
                    {
                        //Header error message.
                    }
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
                    <Editor 
                    type = "text" 
                    placeholder = {this.props.lang === 'English' ? 'Content' : 'Contenido'}
                    editorState={this.state.editorState} 
                    onEditorStateChange={this.onChange}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                    />
                    {
                        //Description error message. 
                    }
                    {this.state.descriptionError && 
                        <div>
                            <span className="text-danger"> 
                                {this.state.descriptionError}
                            </span>
                            <br/>
                        </div>}
                    <br/>
                    <br/>

                    {
                        //Recommendation location input field
                    }
                    <label>{this.props.lang === 'English' ? 'Location (Optional)' : 'Localización (Opcional)'}:</label>
                    <input type = "text" maxLength="150" placeholder = {this.props.lang === 'English' ? 'Location' : 'Localización'} className="form-control" value = {this.state.location} onChange = {this.onLocationChange} onBlur={() => {
                        //Check to see if address is only composed of white space. 
                        this.setState(() => ({location: this.state.location.trim()}));
                        if(this.state.location.match(/^\s+$/)){
                            if(this.props.lang === 'English'){
                                this.setState(() => ({locationError: 'The address must contain text.'}));
                            }else{
                                this.setState(() => ({locationError: 'La dirección física debe contener texto.'})); 
                            }
                        }else{
                            this.setState(() => ({locationError: ''}));
                        }
                    }}/>
                    {
                        //Location error
                    }
                    {this.state.locationError && 
                        <div>
                            <span className="text-danger"> 
                                {this.state.locationError}
                            </span>
                            <br/>
                        </div>}

                    <br/>
                    {
                        //Quiz question input field
                    }
                    
                    <span className="req">*</span>
                    <label>{this.props.lang === 'English' ? 'Question' : 'Pregunta'}: </label>
                    <input type="text" maxLength="700" disabled={this.props.isEdit} className="form-control" placeholder = {this.props.lang === 'English' ? 'Question' : 'Pregunta'} value = {this.state.question} onChange={this.onQuestionChange} onBlur={() => {
                        //Check to see if quiz question is only composed of white space or if it only contains special characters. 
                        this.setState(() => ({question: this.state.question.trim()}));
                        if(this.state.question.match(/^\s+$/) || this.state.question.trim().match(/^[\¿|\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|\s]*$/)){
                            if(this.props.lang === 'English'){
                                this.setState(() => ({questionError: 'The question field must contain text.'}));
                            }else{
                                this.setState(() => ({questionError: 'La pregunta debe contener texto.'})); 
                            }
                        //Clear error
                        }else{
                            this.setState(() => ({questionError: ''}));
                        }
                    }}/>
                    {
                        //Quiz question error message. 
                    }
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
                    <label>{this.props.lang === 'English' ? 'Options' : 'Opciones'}:</label>
                    {
                        //Map all quiz question choices in the choices array. 
                    }
                    {this.state.choices.map((choice, index) => (
                        <span key={index}>
                            <br/>
                            <input
                            type = "text"
                            placeholder = {this.props.lang === 'English' ? 'Option' : 'Opción'}
                            className="form-control"
                            style={{width: '50%', display: 'inline', marginRight: '1rem'}}
                            value={choice}
                            //question choices input fields are disabled if recommendation is being modified. 
                            disabled={this.props.isEdit}
                            maxLength="400"
                            onChange={this.onChoiceChange(index)}
                            onKeyDown={(event) => {
                                //Do not allow the user to use the ENTER key in these fields. 
                                if (event.which == 13 || event.keyCode == 13) {
                                    event.preventDefault();
                                }
                            }
                            }
                            //Validation for quiz choices. 
                            onBlur={() => {
                                let choices = [...this.state.choices]
                                //Trim user input
                                choices[index] = this.state.choices[index].trim();
                                //Add user input to list of choices.
                                this.setState(() => ({choices: choices}));
                                let j = 0;
                                let errorCheck = false;
                                for(j = 0; j < this.state.choices.length; j++){
                                    //If choice is empty or is only composed of white spaces. 
                                    if(this.state.choices[j] && this.state.choices[j].match(/^\s+$/)){
                                        if(this.props.lang === 'English'){
                                            this.setState(() => ({choiceError: 'Options must contain text.'}));
                                        }else{
                                            this.setState(() => ({choiceError: 'Las opciones deben contener texto.'})); 
                                        }
                                        errorCheck = true;
                                        break;
                                    }
                                }
                                //If the field is left empty, display error. 
                                if(!this.state.choices[index]){
                                    if(this.props.lang === 'English'){
                                        this.setState(() => ({choiceError: 'Options must contain text.'}));
                                    }else{
                                        this.setState(() => ({choiceError: 'Las opciones deben contener texto.'})); 
                                    }
                                    errorCheck = true;
                                }
                                //Clear error if validation was successful. 
                                if(!errorCheck){
                                    this.setState(() => ({choiceError: ''}));
                                }
                            }
                            }
                            />
                            
                            {
                                //Checkmark icon used to mark a the correct quiz question choice. 
                            }
                            {this.state.correctOption === index && <div style={{display: 'inline-block', marginLeft: '0.3rem'}}>
                                <span style={{color: 'green'}}><i className="fa fa-check-circle fa-lg" aria-hidden="true"></i></span>
                            </div>}

                            <br/>
                            {
                                //Button to set the correct quiz question choice. 
                            }
                            <button disabled={this.props.isEdit} onClick={this.setCorrectOption(index)} disabled={this.state.correctOption === index}>
                            <div className="btn btn-item btn-pad">
                                {this.props.lang === 'English' ? 'Mark As Correct Answer' : 'Marcar Como Contestación Correcta'}
                            </div>

                            </button>

                        </span>
                    ))}
                    
                    {
                        //Quiz question choice error message. 
                    }
                    {this.state.choiceError && 
                        <div>
                            <span className="text-danger"> 
                                {this.state.choiceError}
                            </span>
                            <br/>
                        </div>}
                    <br/>

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
                    <label>{this.props.lang === 'English' ? 'Subject' : 'Materia'} :</label>
                    <input type="text" maxLength="100" placeholder={this.props.lang === 'English' ? 'Subject' : 'Materia'} className="form-control" style={{width: '50%'}} value={this.state.subject} onChange={this.onSubjectChange} onBlur={() => {
                        //Check to see if description is only composed of spaces. 
                        this.setState(() => ({subject: this.state.subject.trim()}));
                        if(this.state.subject.match(/^\s+$/)){
                            if(this.props.lang === 'English'){
                                this.setState(() => ({subjectError: 'The subject field must contain text.'}));
                            }else{
                                this.setState(() => ({subjectError: 'La materia del curso debe contener texto.'})); 
                            }
                        //Clear error
                        }else{
                            this.setState(() => ({subjectError: ''}));
                        }
                    }}/>
                    {
                        //Class subject error message. 
                    }
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
                    {
                        //Map class topics in the topics array. 
                    }
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
                            onKeyDown={(event) => {
                                //Do not allow user to press the ENTER key while using this input field. 
                                if (event.which == 13 || event.keyCode == 13) {
                                    //code to execute here
                                    event.preventDefault();
                                }
                            }
                            }
                            //Validate input data on focus change. 
                            onBlur={() => {
                                    let topics = [...this.state.topics]
                                    //Trim topic data. 
                                    topics[index] = this.state.topics[index].trim();
                                    //Add topic data to local state. 
                                    this.setState(() => ({topics: topics}));
                                    let j = 0;
                                    let errorCheck = false;
                                    for(j = 0; j < this.state.topics.length; j++){
                                        //Check if topic exists and if it is composed only of white space. 
                                        if(this.state.topics[j] && this.state.topics[j].match(/^\s+$/)){
                                            if(this.props.lang === 'English'){
                                                this.setState(() => ({topicError: 'Topics must contain text.'}));
                                            }else{
                                                this.setState(() => ({topicError: 'Los temas deben contener texto.'})); 
                                            }
                                            errorCheck = true;
                                            break;
                                        }
                                    }
                                    //Clear error if validation was successful. 
                                    if(!errorCheck){
                                        this.setState(() => ({topicError: ''}));
                                    }
                                }
                            }
                            />
                            {
                                //Button to delete topic
                            }
                            {this.state.topics.length > 1 && <div style={{display: 'inline'}}>
                            <button onClick={this.deleteTopic(index)}>
                                <span title={this.props.lang === 'English' ? 'Delete topic' : 'Remover tema'} className="hoverColors" style={{color: '#9f0000'}}>
                                    <i className="fa fa-window-close fa-lg"></i>
                                </span>
                            </button>
                            </div>}
                        </span>
                    ))}

                    {
                        //Topics error message
                    }
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
                    <input type="checkbox" name="resource" checked={this.state.applications === true} onChange={this.onApplicationsChange}/> {this.props.lang === 'English' ? 'Applications' : 'Aplicaciones'} 
                    </label>
                    <br/>

                    <label className="clickable radio__text">
                    <input type="checkbox" name="resource" checked={this.state.socialMedia === true} onChange={this.onSocialMediaChange}/> {this.props.lang === 'English' ? 'Social Media' : 'Redes Sociales'} 
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
                            {this.props.lang === 'English' ? <p>Please fill all required fields and choose a correct quiz answer before saving the recommendation.</p> : <p>Por favor, llene todos los campos requeridos y escoja la contestación correcta de la prueba antes de guardar la recomendación.</p>}
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
                                 //Redirect user to login page if not authorized. 
                                 no={() => <Redirect to="/login" />}
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
export default withRouter(connect(mapStateToProps)(CreateRecommendationForm));