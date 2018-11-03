import React from 'react';
import {connect} from 'react-redux';
import Pagination from 'react-js-pagination';
import uuid from 'uuid';
import TeacherQuestionListItem from './TeacherQuestionListItem';

class FavoriteTeacherQuestionsList extends React.Component{
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
        question: state.teacherQuestions.teacherQuestions.filter((question) => question.favorite === true),
        lang: state.language.lang
    }
}

export default connect(mapStateToProps)(FavoriteTeacherQuestionsList);