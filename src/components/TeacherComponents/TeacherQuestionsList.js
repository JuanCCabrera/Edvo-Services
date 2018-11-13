import React from 'react';
import {connect} from 'react-redux';
import Pagination from 'react-js-pagination';
import uuid from 'uuid';
import TeacherQuestionListItem from './TeacherQuestionListItem';
import getVisibleTeacherQuestions from '../../selectors/teacherQuestions';
import { loadTeacherQuestion } from '../../actions/teacherQuestions';
import axios from 'axios';
import auth0Client from '../../Auth';

class TeacherQuestionsList extends React.Component{
    constructor(props){
        super(props);
        this.pageSlice = 1;
        this.itemsPerPage = 3;
        this.currentPage = 1;
        this.state = {
            activePage: 1,
            displayedQuestions: []
        }
    }

    componentWillMount(){
        axios.get('http://localhost:3000/teacher/questions',
        {
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` ,'Content-Type': 'application/json' }})
        .then(response => {
            response.data.questions.forEach(element => {
                console.log("RATE QUESIONS FOR TEACHER: ", element);
                this.props.dispatch(loadTeacherQuestion({question: element.question, askedDate: element.askeddate, 
                subject: element.subject, userId: element.userid, answer: element.answer, rate: element.rate}));
            });
        });
        this.currentPage = 1;
        const initialPageQuestions = this.props.question.slice(0,this.itemsPerPage);
        this.setState({activePage: 1, displayedQuestions: initialPageQuestions});
    }

    componentDidUpdate(prevProps){
        if(prevProps.question !== this.props.question){
            if(this.state.displayedQuestions.length === 1 && this.currentPage !== 1){
                this.handlePageChange(this.currentPage-1);
            }else{
                this.handlePageChange(this.currentPage);
            }
        }

        if(prevProps.filters !== this.props.filters){
            this.handlePageChange(1);
        }
        
    }

    handlePageChange = (pageNumber) => {
        const startIndex = (pageNumber-1)*this.itemsPerPage;
        this.currentPage = pageNumber;
        let endIndex = (pageNumber)*this.itemsPerPage;
        if(((pageNumber)*this.itemsPerPage) > this.props.question.length){
            endIndex = this.props.question.length;
        }
        const displayedQuestions = this.props.question.slice(startIndex, endIndex);
        this.setState(() => ({activePage: pageNumber, displayedQuestions: displayedQuestions}));
    };

    render(){
        return(
            <div>
                {this.state.displayedQuestions.map((question) => {
                    return <TeacherQuestionListItem key={uuid()} question={question}/>
                })}
                <br/>

                {(this.props.question.length !== 0) &&
                    <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.itemsPerPage}
                    totalItemsCount={this.props.question.length}
                    onChange={this.handlePageChange}
                    />
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

const mapStateToProps = (state) => {
    return{
        question: getVisibleTeacherQuestions(state.teacherQuestions.teacherQuestions, state.teacherQuestionsFilters),
        filters: state.teacherQuestionsFilters,
        lang: state.language.lang
    }
}

export default connect(mapStateToProps)(TeacherQuestionsList);