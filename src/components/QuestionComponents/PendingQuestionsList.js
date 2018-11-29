import React from 'react';
import { connect } from 'react-redux';
import PendingQuestionsListItem from './PendingQuestionsListItem';
import uuid from 'uuid';
import Pagination from 'react-js-pagination';
import axios from 'axios';
import { reset, loadQuestion } from '../../actions/question';
import getVisibleQuestions from '../../selectors/questions';
import auth0Client from '../../Auth';
import { setLoadingModal } from '../../actions/loadingModal';
import { setFailureModal } from '../../actions/failureModal';
import {resetQuestionsList} from '../../actions/question';

/**
 * The Pending Questions list contains a list of all questions created by users which are pending answers by the Edvo Tech staff. 
 */
class PendingQuestionsList extends React.Component {
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


    //Configure initial local state values, including the list of questions to display on the first page. 
    componentWillMount(){ 
        this.props.dispatch(setLoadingModal());
        this.props.dispatch(resetQuestionsList());       
        axios.get('https://beta.edvotech.com/api/'+auth0Client.getRole()+'/staff/questions',
        {
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` ,'Content-Type': 'application/json' }})
        .then(response => {
            response.data.questions.forEach(element => {
                this.props.dispatch(loadQuestion({question: element.question, askedDate: element.askeddate, 
                subject: element.subject, userId: element.userid}));
            });
            this.props.dispatch(setLoadingModal());
        }).catch(error => {
            this.props.dispatch(setLoadingModal());
            this.props.dispatch(setFailureModal());
        });    
        this.pageSlice = Math.ceil(this.props.questions.length/this.itemsPerPage);
        this.currentPage = 1;
        const displayedQuestions = this.props.questions.slice(0,this.itemsPerPage);
        this.setState({activePage: 1, displayedQuestions: displayedQuestions});
    }

    //Update page when component updates. 
    componentDidUpdate(prevProps){
        //Move to the previous page if there are no items remaining on the current page.
        if(prevProps.questions !== this.props.questions){
            if(this.state.displayedQuestions.length === 0 && this.currentPage !== 1){
                this.handlePageChange(this.currentPage-1);
            }else{
                this.handlePageChange(this.currentPage);
            }
        }

        //Go to the first page if filters are modified. 
        if(prevProps.filters !== this.props.filters){
            this.handlePageChange(1);
        }
    }

    //Change pages and display new list of items on new page. 
    handlePageChange = (pageNumber) => {
        const startIndex = (pageNumber-1)*this.itemsPerPage;
        this.currentPage = pageNumber;
        let endIndex = (pageNumber)*this.itemsPerPage;
        //Limit amount of items displayed on last page based on length of the original array. 
        if(((pageNumber)*this.itemsPerPage) > this.props.questions.length){
            endIndex = this.props.questions.length;
        }
        
        //Slice original array to obtain list of items to display
        const displayedQuestions = this.props.questions.slice(startIndex, endIndex);
        //Modify local state
        this.setState(() => ({activePage: pageNumber, displayedQuestions: displayedQuestions}));
    };

    render(){
        return (
            <div>
            {
                //Pending Questions List
            }
                {this.state.displayedQuestions.map((question) => {
                    return <PendingQuestionsListItem key={uuid()} question={question}/>
                })}
                <br/>
            {
                //Pagination component
            }
                <div className="text-center">
                {(this.props.questions.length > 5) &&
                    <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.itemsPerPage}
                    totalItemsCount={this.props.questions.length}
                    onChange={this.handlePageChange}
                    />
                }
                </div>
            {
                //If there are no elements in the Pending Questions list, then a message specifying this is shown. 
            }
                
                    {(this.props.questions.length === 0) &&
                        
                        (this.props.lang === 'English' ? 
                        <div className="close-empty-message-card">
                            {this.props.allQuestions.length > 0 ? 
                            <p>There are no questions which match the given parameters.</p>
                            :
                            <p>There are no questions pending answers.</p>
                            }
                        </div> : 
                        <div className="close-empty-message-card">
                            {this.props.allQuestions.length > 0 ? 
                            <p>No hay preguntas que cumplen con los parámetros dados.</p>
                            :
                            <p>No hay preguntas con respuestas pendientes.</p>
                            }
                        </div>)
                    }
            </div>
        );
    }
};

//Map set of filtered questions, question filters data and current language state to component properties. 
const mapStateToProps = (state) => {
    return {
        allQuestions: state.questions,
        questions: getVisibleQuestions(state.questions, state.questionsFilters),
        filters: state.questionsFilters,
        lang: state.language.lang
    }
};

//Connect component to controller. 
export default connect(mapStateToProps)(PendingQuestionsList);


