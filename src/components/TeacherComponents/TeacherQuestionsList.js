import React from 'react';
import {connect} from 'react-redux';
import Pagination from 'react-js-pagination';
import uuid from 'uuid';
import TeacherQuestionListItem from './TeacherQuestionListItem';
import getVisibleTeacherQuestions from '../../selectors/teacherQuestions';
import { addFavoriteQuestion, loadTeacherQuestion } from '../../actions/teacherQuestions';
import { setLoadingModal } from '../../actions/loadingModal';
import axios from 'axios';
import auth0Client from '../../Auth';
import moment from 'moment';

/**
 * List of questions a teacher has asked. This list is available in the Teacher Questions page. 
 */
class TeacherQuestionsList extends React.Component{
    constructor(props){
        super(props);
        this.pageSlice = 1;
        this.itemsPerPage = 5; //Number of questions shown per page
        this.currentPage = 1;   //Current page
        this.state = {
            activePage: 1,
            displayedQuestions: []
        }
    }

    //Configure local state when component will be loaded. This sets the initial list displayed on the first page. 
    componentWillMount(){
        this.props.dispatch(setLoadingModal());
        axios.get('https://beta.edvotech.com/api/teacher/questions',
        {
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` ,'Content-Type': 'application/json' }})
        .then(response => {
            response.data.questions.forEach(element => {
                console.log("RATE QUESIONS FOR TEACHER: ", element);
                this.props.dispatch(loadTeacherQuestion({question: element.question, askedDate: element.askeddate, 
                subject: element.subject, favorite: element.favorite, userId: element.userid, answer: element.answer, rate: element.rate, read: element.read}));
                if(element.favorite == true){
                    console.log("FAVORITE QUESTION: ???", element);
                    this.props.dispatch(addFavoriteQuestion({askedDate: element.askeddate}));
                }
            });
            this.props.dispatch(setLoadingModal());
        });
        this.currentPage = 1;
        const initialPageQuestions = this.props.question.slice(0,this.itemsPerPage);
        this.setState({activePage: 1, displayedQuestions: initialPageQuestions});
    }
    
    //Modify list on component update
    componentDidUpdate(prevProps){
        //If component was modified...
        if(prevProps.question !== this.props.question){
            //If there are no recommendations displayed on the current page...
            if(this.state.displayedQuestions.length === 0 && this.currentPage !== 1){
                //Go to previous page
                this.handlePageChange(this.currentPage-1);
            }else{
                //Refresh current page
                this.handlePageChange(this.currentPage);
            }
        }

        //Go to first page if filters are modified. 
        if(prevProps.filters !== this.props.filters){
            this.handlePageChange(1);
        }
        
    }
    //Change list page and show new list items
    handlePageChange = (pageNumber) => {
        const startIndex = (pageNumber-1)*this.itemsPerPage;
        this.currentPage = pageNumber;
        let endIndex = (pageNumber)*this.itemsPerPage;
        //Limit items displayed on last page based on the length of the full list of elements. 
        if(((pageNumber)*this.itemsPerPage) > this.props.question.length){
            endIndex = this.props.question.length;
        }
        //Slice original list of questions to obtain the list corresponding to the current page. 
        const displayedQuestions = this.props.question.slice(startIndex, endIndex);
        //Set new list in local state
        this.setState(() => ({activePage: pageNumber, displayedQuestions: displayedQuestions}));
    };

    render(){
        return(
            <div>
            {
                //Items of the Teacher Questions List
            }
                {this.state.displayedQuestions.map((question) => {
                    return <TeacherQuestionListItem key={uuid()} question={question}/>
                })}
                <br/>

                {
                    //Pagination component
                }
                
                <div className="text-center">
                {(this.props.question.length > 5) &&
                    <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.itemsPerPage}
                    totalItemsCount={this.props.question.length}
                    onChange={this.handlePageChange}
                    />
                }
                </div>
                {
                    //Message displayed if there are no items in the list. 
                }
                {(this.props.question.length === 0) && (this.props.lang === 'English' ?
                    <div>
                        <p>There are no available questions.</p>
                    </div>
                    :
                    <div>
                        <p>No hay preguntas disponibles.</p>
                    </div>
                )}
            </div>
        )
    }
}

//Map filtered list of questions, filter data and current language state to the component properties. 
const mapStateToProps = (state) => {
    return{
        question: getVisibleTeacherQuestions(state.teacherQuestions.teacherQuestions, state.teacherQuestionsFilters),
        filters: state.teacherQuestionsFilters,
        lang: state.language.lang
    }
}

//Connect component to the controller. 
export default connect(mapStateToProps)(TeacherQuestionsList);