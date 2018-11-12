import React from 'react';
import {connect} from 'react-redux';

/**
 * Form used to create a new recommendation which can then be assigned to a user of the Teacher type. 
 */
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
            level: props.reco ? props.reco.level : 'Kindergarden - 3rd grade',
            size: props.reco ? props.reco.size : '1 - 10',

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

                <label>{this.props.lang === 'English' ? 'Title' : 'Título'}:</label>
                <input type="text" placeholder = "Title" value = {this.state.title} onChange={this.onTitleChange}/>

                <br/>
                <label>{this.props.lang === 'English' ? 'Header' : 'Encabezamiento'}:</label>
                <input type="text" placeholder = "Header" value = {this.state.header} onChange={this.onHeaderChange}/>

                <br/>
                <label>{this.props.lang === 'English' ? 'Description' : 'Descripción'}:</label>
                <input type = "text" placeholder = "Description" value = {this.state.description} onChange = {this.onDescriptionChange}/>

                <br/>
                <label>{this.props.lang === 'English' ? 'Location' : 'Localización'}:</label>
                <input type = "text" placeholder = "Location" value = {this.state.location} onChange = {this.onLocationChange}/>

                <br/>
                <label>{this.props.lang === 'English' ? 'Insert Video or Image Link' : 'Inserte Enlace de Vídeo o Imagen'}:</label>
                <input type="text" placeholder = "Multimedia" value = {this.state.multimedia} onChange={this.onMultimediaChange}/>

                <br/>
                <label>{this.props.lang === 'English' ? 'Question' : 'Pregunta'}: </label>
                <input type="text" disabled={this.props.isEdit} placeholder = "Question" value = {this.state.question} onChange={this.onQuestionChange}/>

                <br/>
                <label>{this.props.lang === 'English' ? 'Options' : 'Opciones'} (Max: 4):</label>
                {this.state.choices.map((choice, index) => (
                    <span key={index}>
                        <br/>
                        <input
                        type = "text"
                        placeholder = "Choice"
                        value={choice}
                        disabled={this.props.isEdit}
                        onChange={this.onChoiceChange(index)}
                        />
                        <button disabled={this.props.isEdit} onClick={this.deleteChoice(index)}>X</button>
                        <button disabled={this.props.isEdit} onClick={this.setCorrectOption(index)} disabled={this.state.correctOption === index}>{this.props.lang === 'English' ? 'Correct Answer' : 'Contestación Correcta'}</button>
                    </span>
                ))}
                <br/>
                <button onClick={this.addChoice} disabled={this.state.choices.length === 4 || this.props.isEdit}>{this.props.lang === 'English' ? 'Add New Option' : 'Añadir Nueva Opción'}</button>
                {
                    //<button onClick={() => this.setState(() => ({correctOption: -1}))}>{this.props.lang === 'English' ? 'Clear Selection of Correct Answer' : 'Deshacer Seleccion de Contestacion Correcta'}</button>
                }
                <br/>
                <label>{this.props.lang === 'English' ? 'Categories' : 'Categorías'}:</label>
                <br/>
                <input type="checkbox" name="resource" checked={this.state.teachingStrategies === true} onChange={this.onTeachingStrategiesChange}/> {this.props.lang === 'English' ? 'Teaching Strategies' : 'Estrategias de Enseñanza'} <br/>
                <input type="checkbox" name="resource" checked={this.state.updatedMaterial === true} onChange={this.onUpdatedMaterialChange}/> {this.props.lang === 'English' ? 'Updated Material' : 'Material Actualizado'} <br/>
                <input type="checkbox" name="resource" checked={this.state.timeManagement === true} onChange={this.onTimeManagementChange}/> {this.props.lang === 'English' ? 'Time Management' : 'Manejo del Tiempo'} <br/>
                <input type="checkbox" name="resource" checked={this.state.technologyIntegration === true} onChange={this.onTechnologyIntegrationChange}/> {this.props.lang === 'English' ? 'Technology Integration' : 'Integración de Tecnologia'} <br/>
                <input type="checkbox" name="resource" checked={this.state.instructionAlignment === true} onChange={this.onInstructionAlignmentChange}/> {this.props.lang === 'English' ? 'Instructional Alignment' : 'Alineamiento de Instrucción'} <br/>
                
                <br/>
                <label>{this.props.lang === 'English' ? 'Type' : 'Tipo'}: </label>
                <br/>
                <input type="radio" name="type" value= "event" checked={this.state.type === 'event'} onChange = {this.onTypeChange}/> {this.props.lang === 'English' ? 'Event' : 'Evento'}
                <input type="radio" name="type" value= "book" checked={this.state.type === 'book'} onChange = {this.onTypeChange}/> {this.props.lang === 'English' ? 'Book' : 'Libro'}
                <input type="radio" name="type" value= "tour" checked={this.state.type === 'tour'} onChange = {this.onTypeChange}/> {this.props.lang === 'English' ? 'Tour' : 'Excursión'} 
                <input type="radio" name="type" value= "concept" checked={this.state.type === 'concept'} onChange = {this.onTypeChange}/> {this.props.lang === 'English' ? 'Concept' : 'Concepto'} 
                <input type="radio" name="type" value= "material" checked={this.state.type === 'material'} onChange = {this.onTypeChange}/> {this.props.lang === 'English' ? 'New Material' : 'Material Nuevo'} 

                <br/>
                <label>{this.props.lang === 'English' ? 'Subject' : 'Tema'} :</label>
                <input type="text" placeholder="Subject" value={this.state.subject} onChange={this.onSubjectChange}/>

                <br/>
                <label>{this.props.lang === 'English' ? 'Class Format' : 'Formato de Clase'} :</label>
                <br/>
                <input type="radio" name="format" value= "classroom" checked={this.state.format === 'classroom'} onChange = {this.onFormatChange}/> {this.props.lang === 'English' ? 'Classroom' : 'Salón de Clases'} 
                <input type="radio" name="format" value= "blended" checked={this.state.format === 'blended'} onChange = {this.onFormatChange}/> {this.props.lang === 'English' ? 'Blended' : 'Mixto'}
                <input type="radio" name="format" value= "online" checked={this.state.format === 'online'} onChange = {this.onFormatChange}/> {this.props.lang === 'English' ? 'Online' : 'En Línea'}
                
                <br/>
                <label>{this.props.lang === 'English' ? 'School System' : 'Sistema Educativo'}:</label>
                <br/>
                <input type="radio" name="system" value= "public" checked={this.state.schoolType === 'public'} onChange = {this.onSchoolTypeChange}/> {this.props.lang === 'English' ? 'Public' : 'Público'}
                <input type="radio" name="system" value= "private" checked={this.state.schoolType === 'private'} onChange = {this.onSchoolTypeChange}/> {this.props.lang === 'English' ? 'Private' : 'Privado'}
                <input type="radio" name="system" value= "independent" checked={this.state.schoolType === 'independent'} onChange = {this.onSchoolTypeChange}/> {this.props.lang === 'English' ? 'Independent' : 'Independiente'}
                                
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
                
                <br/>
                <label>{this.props.lang === 'English' ? 'Class Topics' : 'Tópicos de Clase'} (Max: 3):</label>
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
                <button onClick={this.addTopic} disabled={this.state.topics.length === 3}>{this.props.lang === 'English' ? 'Add New Topic' : 'Añadir Tópico Nuevo'}</button>

                <br/>
                <label>{this.props.lang === 'English' ? 'Resources' : 'Recursos'}</label>
                <br/>
                <input type="checkbox" name="resource" checked={this.state.moodle === true} onChange={this.onMoodleChange}/> Moodle <br/>
                <input type="checkbox" name="resource" checked={this.state.googleClassroom === true} onChange={this.onGoogleClassroomChange}/> Google Classroom <br/>
                <input type="checkbox" name="resource" checked={this.state.emailResource === true} onChange={this.onEmailResourceChange}/> Emails <br/>
                <input type="checkbox" name="resource" checked={this.state.books === true} onChange={this.onBooksChange}/> {this.props.lang === 'English' ? 'Books' : 'Libros'} <br/>
                <input type="checkbox" name="resource" checked={this.state.socialMedia === true} onChange={this.onSocialMediaChange}/> {this.props.lang === 'English' ? 'Social Media' : 'Medios Sociales'} <br/>
                <input type="checkbox" name="resource" checked={this.state.projector === true} onChange={this.onProjectorChange}/> {this.props.lang === 'English' ? 'Projector' : 'Proyector'} <br/>
                <input type="checkbox" name="resource" checked={this.state.computer === true} onChange={this.onComputerChange}/> {this.props.lang === 'English' ? 'Computer' : 'Computadora'} <br/>
                <input type="checkbox" name="resource" checked={this.state.tablet === true} onChange={this.onTabletChange}/> {this.props.lang === 'English' ? 'Tablet' : 'Tableta'} <br/>
                <input type="checkbox" name="resource" checked={this.state.stylus === true} onChange={this.onStylusChange}/> Stylus <br/>
                <input type="checkbox" name="resource" checked={this.state.internet === true} onChange={this.onInternetChange}/> Internet <br/>
                <input type="checkbox" name="resource" checked={this.state.smartboard === true} onChange={this.onSmartBoardChange}/> {this.props.lang === 'English' ? 'Smart Board' : 'Pizarra Inteligente'} <br/>
                <input type="checkbox" name="resource" checked={this.state.smartpencil === true} onChange={this.onSmartPencilChange}/> {this.props.lang === 'English' ? 'Smart Pencil' : 'Lápiz Inteligente'} <br/>
                <input type="checkbox" name="resource" checked={this.state.speakers === true} onChange={this.onSpeakersChange}/> {this.props.lang === 'English' ? 'Speakers' : 'Bocinas'} <br/>

                <br/>
                <label>{this.props.lang === 'English' ? 'Language' : 'Lenguaje'}:</label>
                <br/>
                <input type="radio" name="lang" value= "spanish" checked={this.state.language === 'spanish'} onChange = {this.onLanguageChange}/> {this.props.lang === 'English' ? 'Spanish' : 'Español'}<br/>
                <input type="radio" name="lang" value= "english" checked={this.state.language === 'english'} onChange = {this.onLanguageChange}/> {this.props.lang === 'English' ? 'English' : 'Inglés'}<br/>

                <br/>
                <button onClick={this.onSubmit}>{this.props.lang === 'English' ? 'Submit' : 'Enviar'}</button>
            </form>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    
    return {
        lang: state.language.lang
    }
}

export default connect(mapStateToProps)(CreateRecommendationForm);