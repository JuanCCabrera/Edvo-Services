import React from 'react';
import { connect } from 'react-redux';
import PendingQuizzesListItem from './PendingQuizzesListItem';
import uuid from 'uuid';
import axios from 'axios';
import auth0Client from '../../Auth';
import { createQuiz, reset } from '../../actions/quiz';
import {setLoadingModal} from '../../actions/loadingModal';

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
    

    componentWillMount(){  
        this.props.dispatch(setLoadingModal());      
        axios.get('https://beta.edvotech.com/api/teacher/quizzes',
        {
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
        })
        .then(response => {
            this.props.dispatch(reset());
            console.log("REPSONSE OF QUIZ: ", response);
            let correctChoices = {}
            let questions = []
            let questionsObject = {
                questions: []
            }
            response.data.quizzes.forEach(element => {
                element.questions.forEach(question => {
                    let questionObject = {
                        questionid: '',
                        choices: [],
                        questionstring: question.question,
                        recommendation: ''
                    }
                    questionObject.questionid = question.quizquestionid;
                    questionObject.recommendation = question.recommendationtitle
                    question.choices.forEach(choice => {
                        let choiceObject = {
                            choiceid: choice.choiceid,
                            choice: choice.choice
                        }
                        if(choice.correctanswer)
                            correctChoices[choice.quizquestionid] = choice.choiceid;
                        questionObject.choices.push(choiceObject);
                    })
                    questionsObject.questions.push(questionObject);
                })
                this.props.dispatch(createQuiz({correctChoices: correctChoices, quizID: element.quizid, quizDate: element.created, score: element.score, questions: questionsObject}))
                console.log("CORRECT ANSEWRS ARE: ", correctChoices);
                console.log("QUESTION OBJECT IS: ", questionsObject);
                });
        });
        this.props.dispatch(setLoadingModal());
        
        this.pageSlice = Math.ceil(this.props.quizzes.length/this.itemsPerPage);
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
                
                {console.log("PROPS?: ", this.props) }
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

const mapStateToProps = (state) => {
    return {
        quizzes: state.quizzes
    }
};

export default connect(mapStateToProps)(PendingQuizzesList);


