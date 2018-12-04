import React from 'react';
import { connect } from 'react-redux';
import PendingQuizzesListItem from './PendingQuizzesListItem';
import uuid from 'uuid';
import axios from 'axios';
import auth0Client from '../../Auth';
import { createQuiz, reset } from '../../actions/quiz';
import {setLoadingModal} from '../../actions/loadingModal';
import { setFailureModal } from '../../actions/failureModal';

/**
 * Pending quizzes list displayed in Teacher Quizzes page. 
 */
class PendingQuizzesList extends React.Component {
    constructor(props){
        super(props);
        this.pageSlice = 1;
        this.itemsPerPage = 5; //Number of questions displayed per page. 
        this.currentPage = 1;   //Current page
        this.state = {
            activePage: 1,
            displayedQuestions: []
        }
    }
    

    //Load quiz information on component mount. 
    componentWillMount(){  
        //Set loading modal
        this.props.dispatch(setLoadingModal());   
        //Get quiz information from database.    
        axios.get('https://beta.edvotech.com/api/teacher/quizzes',
        {
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
        })
        .then(response => {
            //Unload quiz information from controller. 
            this.props.dispatch(reset());
            //Format quiz data for controller. 
            response.data.quizzes.forEach(element => {
                let correctChoices = {}
                let questions = []
                let questionsObject = {
                    questions: []
                }
                element.questions.forEach(question => {
                    let questionObject = {
                        questionid: '',
                        choices: [],
                        questionstring: question.question,
                        recommendation: ''
                    }
                    //Save question ID
                    questionObject.questionid = question.quizquestionid;
                    //Save related recommendation. 
                    questionObject.recommendation = question.recommendationtitle
                    //Save choices. 
                    question.choices.forEach(choice => {
                        let choiceObject = {
                            choiceid: choice.choiceid,
                            choice: choice.choice
                        }
                        //Gnerate array of correct answers. 
                        if(choice.correctanswer)
                            correctChoices[choice.quizquestionid] = choice.choiceid;
                        questionObject.choices.push(choiceObject);
                    })
                    questionsObject.questions.push(questionObject);
                })
                //Load quiz information to central controller if 12 questions were received. 
                if(questionsObject.questions.length == 12)
                    this.props.dispatch(createQuiz({correctChoices: correctChoices, quizID: element.quizid, quizDate: element.created, score: element.score, questions: questionsObject}));

                });
            //Clear loading modal. 
            this.props.dispatch(setLoadingModal());
        }).catch(error => {
            //Clear loading modal. 
            this.props.dispatch(setLoadingModal());
            if(error.response.status >= 500){
                //Set failure modal on error. 
                this.props.dispatch(setFailureModal());
            }
        });
        
        //Determine quizzes to show in first page of the quiz list. 
        this.currentPage = 1;
        const displayedQuizzes = this.props.quizzes.slice(0,this.itemsPerPage);
        this.setState({activePage: 1, displayedQuizzes: displayedQuizzes});
    }

    //Update page when component updates. 
    componentDidUpdate(prevProps){
        //Move to the previous page if there are no items remaining on the current page.
        if(prevProps.quizzes !== this.props.quizzes){
            if(this.state.displayedQuizzes.length === 0 && this.currentPage !== 1){
                this.handlePageChange(this.currentPage-1);
            }else{
                this.handlePageChange(this.currentPage);
            }
        }
    }

    //Change pages and display new list of items on new page. 
    handlePageChange = (pageNumber) => {
        const startIndex = (pageNumber-1)*this.itemsPerPage;
        this.currentPage = pageNumber;
        let endIndex = (pageNumber)*this.itemsPerPage;
        //Limit amount of items displayed on last page based on length of the original array. 
        if(((pageNumber)*this.itemsPerPage) > this.props.quizzes.length){
            endIndex = this.props.quizzes.length;
        }
        
        //Slice original array to obtain list of items to display
        const displayedQuizzes = this.props.quizzes.slice(startIndex, endIndex);
        //Modify local state
        this.setState(() => ({activePage: pageNumber, displayedQuizzes: displayedQuizzes}));
    };

    render(){
        return (
            <div>
            {
                //Pending Quizzes list items.
            }
                
                {this.state.displayedQuizzes.map((quiz) => {
                    return <PendingQuizzesListItem key={quiz} quiz={quiz}/>
                })}

                {
                    //Pagination component
                }
                    <div className="text-center">
                    {(this.props.quizzes.length > 5) &&
                        <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.itemsPerPage}
                        totalItemsCount={this.props.questions.length}
                        onChange={this.handlePageChange}
                        />
                    }
                    </div>

                {
                    //Message displayed if there are no items in the list. 
                }
                
                    {(this.props.quizzes.length === 0) && (this.props.lang === 'English' ?
                        <div className="close-empty-message-card">
                            <p>You do not have any quizzes yet.</p>
                        </div>
                        :
                        <div className="close-empty-message-card">
                            <p>Usted no tiene pruebas disponibles.</p>
                        </div>
                    )}
            </div>
        );
    }
};

//Map quiz information and language settings to component properties. 
const mapStateToProps = (state) => {
    return {
        lang: state.language.lang,
        quizzes: state.quizzes
    }
};

//Connect component to central controller. 
export default connect(mapStateToProps)(PendingQuizzesList);


