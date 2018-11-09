import React from 'react';
import { connect } from 'react-redux';
import PendingQuestionsListItem from './PendingQuestionsListItem';
import uuid from 'uuid';
import Pagination from 'react-js-pagination';
import axios from 'axios';
import { loadQuestion } from '../../actions/question';
import getVisibleQuestions from '../../selectors/questions';

class PendingQuestionsList extends React.Component {
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
        axios.get('http://localhost:8081/staff/questions')
        .then(response => {
            response.data.forEach(element => {
                this.props.dispatch(loadQuestion({question: element.question, askedDate: element.askedDate, 
                subject: element.subject, userId: element.userId}));
            });
        });

        this.pageSlice = Math.ceil(this.props.questions.length/this.itemsPerPage);
        this.currentPage = 1;
        const displayedQuestions = this.props.questions.slice(0,this.itemsPerPage);
        this.setState({activePage: 1, displayedQuestions: displayedQuestions});
    }

    componentDidUpdate(prevProps){
        if(prevProps.questions !== this.props.questions){
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
        if(((pageNumber)*this.itemsPerPage) > this.props.questions.length){
            endIndex = this.props.questions.length;
        }
        const displayedQuestions = this.props.questions.slice(startIndex, endIndex);
        this.setState(() => ({activePage: pageNumber, displayedQuestions: displayedQuestions}));
    };

    render(){
        return (
            <div>
                <h3>{this.props.lang === 'English' ? 'Pending Questions' : 'Preguntas Pendientes'}</h3>
                {this.state.displayedQuestions.map((question) => {
                    return <PendingQuestionsListItem key={uuid()} question={question}/>
                })}
                <br/>
                {(this.props.questions.length !== 0) &&
                    <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.itemsPerPage}
                    totalItemsCount={this.props.questions.length}
                    onChange={this.handlePageChange}
                    />
                }
                {(this.props.questions.length === 0) &&
                    (this.props.lang === 'English' ? 
                    <div>
                        <p>There are no questions pending answers.</p>
                    </div> : 
                    <div>
                        <p>No hay preguntas con respuestas pendientes.</p>
                    </div>)
                }
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        questions: getVisibleQuestions(state.questions, state.questionsFilters),
        filters: state.questionsFilters,
        lang: state.language.lang
    }
};

export default connect(mapStateToProps)(PendingQuestionsList);


