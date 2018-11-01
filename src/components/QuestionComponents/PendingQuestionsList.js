import React from 'react';
import { connect } from 'react-redux';
import PendingQuestionsListItem from './PendingQuestionsListItem';
import uuid from 'uuid';
import Pagination from 'react-js-pagination';

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
                <h3>Pending Questions</h3>
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
                    <p>There are currently no questions pending answers.</p>
                }
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        questions: state.questions
    }
};

export default connect(mapStateToProps)(PendingQuestionsList);


