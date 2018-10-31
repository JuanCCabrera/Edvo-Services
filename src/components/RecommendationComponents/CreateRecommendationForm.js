import React from 'react';
import {connect} from 'react-redux';

class CreateRecommendationForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: props.reco ? props.reco.title : '',
            multimedia: props.reco ? props.reco.multimedia : '',
            header: props.reco ? props.reco.header : '',
            description: props.reco ? props.reco.description : '',

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
            location: props.reco ? props.reco.location : '',
            subject: props.reco ? props.reco.subject : '',
            language: props.reco ? props.reco.language : 'spanish',
            type: props.reco ? props.reco.type : 'event',
            schoolType: props.reco ? props.reco.schoolType : 'public',
            format: props.reco ? props.reco.format : 'classroom',
            level: props.reco ? props.reco.level : 'first',
            size: props.reco ? props.reco.size : 'small',

            question: props.reco ? props.reco.question : '',
            choices: props.reco ? props.reco.choices : ['', ''],
            correctOption: props.reco ? props.reco.correctOption : -1
       };
    }
    //Change Handlers

    onTitleChange = (e) => {
        const title = e.target.value;
        this.setState(() => ({title}));
    }

    onMultimediaChange = (e) => {
        const multimedia = e.target.value;
        this.setState(() => ({multimedia}));
    }

    onHeaderChange = (e) => {
        const header = e.target.value;
        this.setState(() => ({header}));
    }

    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({description}));
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
        let topics = [...this.state.topics]
        topics[i] = e.target.value;
        this.setState(() => ({topics: topics}));
    }

    deleteTopic = i => e => {
        e.preventDefault();
        if(this.state.topics.length > 1){
            let topics = [
                ...this.state.topics.slice(0,i),
                ...this.state.topics.slice(i+1)
            ];
            this.setState(() => ({topics}));
        }
    }

    addTopic = (e) => {
        e.preventDefault();
        if(this.state.topics.length < 3){
            let topics = this.state.topics.concat(['']);
            this.setState(() => ({topics}));
        }
    }

    setCorrectOption = (choiceIndex) => (e) => {
        e.preventDefault();
        this.setState(() => ({correctOption: choiceIndex}));
    }

    onChoiceChange = i => e => {
        let choices = [...this.state.choices]
        choices[i] = e.target.value;
        this.setState(() => ({choices}));
    }

    deleteChoice = i => e => {
        e.preventDefault();
        if(this.state.choices.length > 2){
            let choices = [
                ...this.state.choices.slice(0,i),
                ...this.state.choices.slice(i+1)
            ];
            this.setState(() => ({choices}));
            this.setState(() => ({correctOption: -1}));
        }
    }

    addChoice = (e) => {
        e.preventDefault();
        if(this.state.choices.length < 4){
            let choices = this.state.choices.concat(['']);
            this.setState(() => ({choices}));
        }
    }

    onTypeChange = (e) => {
        const type = e.target.value;
        this.setState(() => ({type}));
    }

    onSchoolTypeChange = (e) => {
        const schoolType = e.target.value;
        this.setState(() => ({schoolType}));
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

    onTeachingStrategiesChange = (e) => {
        const teachingStrategies = this.state.teachingStrategies;
        this.setState(() => ({teachingStrategies: !teachingStrategies}))
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

    onQuestionChange = (e) => {
        const question = e.target.value;
        this.setState(() => ({question}));
    }

    //Submit

    onSubmit = (e) => {
        e.preventDefault();
        //TO-DO: Add error checking
        this.props.onSubmit(this.state);
    }

    render(){
        return(
            <div>
            <form onSubmit={this.onSubmit}>
                <br/>

                <label>Title:</label>
                <input type="text" placeholder = "Title" value = {this.state.title} onChange={this.onTitleChange}/>

                <br/>
                <label>Header:</label>
                <input type="text" placeholder = "Header" value = {this.state.header} onChange={this.onHeaderChange}/>

                <br/>
                <label>Description:</label>
                <input type = "text" placeholder = "Description" value = {this.state.description} onChange = {this.onDescriptionChange}/>

                <br/>
                <label>Insert Video or Image Link:</label>
                <input type="text" placeholder = "Multimedia" value = {this.state.multimedia} onChange={this.onMultimediaChange}/>

                <br/>
                <label>Question: </label>
                <input type="text" placeholder = "Question" value = {this.state.question} onChange={this.onQuestionChange}/>

                <br/>
                <label>Options (Max: 4):</label>
                {this.state.choices.map((choice, index) => (
                    <span key={index}>
                        <br/>
                        <input
                        type = "text"
                        placeholder = "Choice"
                        value={choice}
                        onChange={this.onChoiceChange(index)}
                        />
                        <button onClick={this.deleteChoice(index)}>X</button>
                        <button onClick={this.setCorrectOption(index)} disabled={this.state.correctOption === index}>Correct Answer</button>
                    </span>
                ))}
                <br/>
                <button onClick={this.addChoice} disabled={this.state.choices.length === 4}>Add New Option</button>

                <br/>
                <label>Categories:</label>
                <br/>
                <input type="checkbox" name="resource" checked={this.state.teachingStrategies === true} onChange={this.onTeachingStrategiesChange}/> Teaching Strategies <br/>
                <input type="checkbox" name="resource" checked={this.state.updatedMaterial === true} onChange={this.onUpdatedMaterialChange}/> Updated Material <br/>
                <input type="checkbox" name="resource" checked={this.state.timeManagement === true} onChange={this.onTimeManagementChange}/> Time Management <br/>
                <input type="checkbox" name="resource" checked={this.state.technologyIntegration === true} onChange={this.onTechnologyIntegrationChange}/> Technology Integration <br/>
                <input type="checkbox" name="resource" checked={this.state.instructionAlignment === true} onChange={this.onInstructionAlignmentChange}/> Instruction Alignment <br/>
                
                <br/>
                <label>Type: </label>
                <br/>
                <input type="radio" name="type" value= "event" checked={this.state.type === 'event'} onChange = {this.onTypeChange}/> Event
                <input type="radio" name="type" value= "book" checked={this.state.type === 'book'} onChange = {this.onTypeChange}/> Book
                <input type="radio" name="type" value= "tour" checked={this.state.type === 'tour'} onChange = {this.onTypeChange}/> Tour 
                <input type="radio" name="type" value= "concept" checked={this.state.type === 'concept'} onChange = {this.onTypeChange}/> Concept
                <input type="radio" name="type" value= "material" checked={this.state.type === 'material'} onChange = {this.onTypeChange}/> Material

                <br/>
                <label>Subject:</label>
                <input type="text" placeholder="Subject" value={this.state.subject} onChange={this.onSubjectChange}/>

                <br/>
                <label>Class Format:</label>
                <br/>
                <input type="radio" name="format" value= "classroom" checked={this.state.format === 'classroom'} onChange = {this.onFormatChange}/> Classroom
                <input type="radio" name="format" value= "blended" checked={this.state.format === 'blended'} onChange = {this.onFormatChange}/> Blended
                <input type="radio" name="format" value= "online" checked={this.state.format === 'online'} onChange = {this.onFormatChange}/> Online
                
                <br/>
                <label>School System:</label>
                <br/>
                <input type="radio" name="system" value= "public" checked={this.state.schoolType === 'public'} onChange = {this.onSchoolTypeChange}/> Public
                <input type="radio" name="system" value= "private" checked={this.state.schoolType === 'private'} onChange = {this.onSchoolTypeChange}/> Private
                <input type="radio" name="system" value= "independent" checked={this.state.schoolType === 'independent'} onChange = {this.onSchoolTypeChange}/> Independent
                                
                <br/>
                <label>Level:</label>
                <br/>
                <input type="radio" name="level" value= "first" checked={this.state.level === 'first'} onChange = {this.onLevelChange}/> Kindergarden - 3rd grade<br/>
                <input type="radio" name="level" value= "second" checked={this.state.level === 'second'} onChange = {this.onLevelChange}/> 4th - 6th grade<br/>
                <input type="radio" name="level" value= "third" checked={this.state.level === 'third'} onChange = {this.onLevelChange}/> 7th - 8th grade <br/>
                <input type="radio" name="level" value= "fourth" checked={this.state.level === 'fourth'} onChange = {this.onLevelChange}/> 9th - 12th grade<br/>
                <input type="radio" name="level" value= "fifth" checked={this.state.level === 'fifth'} onChange = {this.onLevelChange}/> University / College<br/>
                <input type="radio" name="level" value= "other" checked={this.state.level === 'other'} onChange = {this.onLevelChange}/> Other <br/>

                <br/>
                <label>Group Size</label>
                <br/>
                <input type="radio" name="size" value= "small" checked={this.state.size === 'small'} onChange = {this.onSizeChange}/> 1 - 10
                <input type="radio" name="size" value= "medium" checked={this.state.size === 'medium'} onChange = {this.onSizeChange}/> 11 - 20
                <input type="radio" name="size" value= "large" checked={this.state.size === 'large'} onChange = {this.onSizeChange}/> 21 - 30
                <input type="radio" name="size" value= "xlarge" checked={this.state.size === 'xlarge'} onChange = {this.onSizeChange}/> 31+ 
                
                <br/>
                <label>Topics (Max: 3):</label>
                {this.state.topics.map((topic, index) => (
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
                <button onClick={this.addTopic} disabled={this.state.topics.length === 3}>Add New Topic</button>

                <br/>
                <label>Resources</label>
                <br/>
                <input type="checkbox" name="resource" checked={this.state.moodle === true} onChange={this.onMoodleChange}/> Moodle <br/>
                <input type="checkbox" name="resource" checked={this.state.googleClassroom === true} onChange={this.onGoogleClassroomChange}/> Google Classroom <br/>
                <input type="checkbox" name="resource" checked={this.state.emailResource === true} onChange={this.onEmailResourceChange}/> Emails <br/>
                <input type="checkbox" name="resource" checked={this.state.books === true} onChange={this.onBooksChange}/> Books <br/>
                <input type="checkbox" name="resource" checked={this.state.socialMedia === true} onChange={this.onSocialMediaChange}/> Social Media <br/>
                <input type="checkbox" name="resource" checked={this.state.projector === true} onChange={this.onProjectorChange}/> Projector <br/>
                <input type="checkbox" name="resource" checked={this.state.computer === true} onChange={this.onComputerChange}/> Computer <br/>
                <input type="checkbox" name="resource" checked={this.state.tablet === true} onChange={this.onTabletChange}/> Tablet <br/>
                <input type="checkbox" name="resource" checked={this.state.stylus === true} onChange={this.onStylusChange}/> Stylus <br/>
                <input type="checkbox" name="resource" checked={this.state.internet === true} onChange={this.onInternetChange}/> Internet <br/>
                <input type="checkbox" name="resource" checked={this.state.smartboard === true} onChange={this.onSmartBoardChange}/> Smart Board <br/>
                <input type="checkbox" name="resource" checked={this.state.smartpencil === true} onChange={this.onSmartPencilChange}/> Smart Pencil <br/>
                <input type="checkbox" name="resource" checked={this.state.speakers === true} onChange={this.onSpeakersChange}/> Speakers <br/>

                <br/>
                <label>Language:</label>
                <br/>
                <input type="radio" name="lang" value= "spanish" checked={this.state.language === 'spanish'} onChange = {this.onLanguageChange}/> Spanish<br/>
                <input type="radio" name="lang" value= "english" checked={this.state.language === 'english'} onChange = {this.onLanguageChange}/> English<br/>

                <br/>
                <button onClick={this.onSubmit}>Submit</button>
            </form>
            </div>
        );
    }
}

export default connect()(CreateRecommendationForm);