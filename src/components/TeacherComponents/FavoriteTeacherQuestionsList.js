import React from 'react';
import {connect} from 'react-redux';
import Pagination from 'react-js-pagination';
import uuid from 'uuid';
import TeacherQuestionListItem from './TeacherQuestionListItem';

/**
 * List of questions marked as favorites. This list is available in the Teacher Questions page. 
 */
class FavoriteTeacherQuestionsList extends React.Component{
    constructor(props){
        super(props);
        this.pageSlice = 1;
        this.itemsPerPage = 3; //Number of questions shown per page
        this.currentPage = 1;   //Current page
        this.state = {
            activePage: 1,
            displayedQuestions: []
        }
    }

    //Configure local state when component will be loaded. This sets the initial list displayed on the first page. 
    componentWillMount(){
        this.currentPage = 1;
        const initialPageQuestions = this.props.question.slice(0,this.itemsPerPage);
        this.setState({activePage: 1, displayedQuestions: initialPageQuestions});
    }

    //Modify list on component update
    componentDidUpdate(prevProps){
        //If component was modified...
        if(prevProps.question !== this.props.question){
            //If there are no recommendations displayed on the current page...
            if(this.state.displayedQuestions.length === 1 && this.currentPage !== 1){
                //Go to the previous page
                this.handlePageChange(this.currentPage-1);
            }else{
                //Refresh the current page
                this.handlePageChange(this.currentPage);
            }
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
        //Slice original list of favorite questions to obtain the list corresponding to the current page. 
        const displayedQuestions = this.props.question.slice(startIndex, endIndex);
        //Set new list in local state.
        this.setState(() => ({activePage: pageNumber, displayedQuestions: displayedQuestions}));
    };

    render(){
        return(
            <div>
            {
                //Items of the favorite questions list. 
            }
                {this.state.displayedQuestions.map((question) => {
                    return <TeacherQuestionListItem key={uuid()} question={question}/>
                })}
                <br/>

                {
                    //Pagination component
                }
                {(this.props.question.length > 3) &&
                    <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.itemsPerPage}
                    totalItemsCount={this.props.question.length}
                    onChange={this.handlePageChange}
                    />
                }
                {
                    //Message displayed if there are no items in the favorite questions list. 
                }
                {(this.props.question.length === 0) && (this.props.lang === 'English' ?
                    <div>
                        <p>There are no favorite questions available.</p>
                    </div>
                    :
                    <div>
                        <p>No hay preguntas favoritas disponibles.</p>
                    </div>
                )}
            </div>
        )
    }
}

//Map favorite questions and current language state to the component properties. 
const mapStateToProps = (state) => {
    return{
        question: state.teacherQuestions.teacherQuestions.filter((question) => question.favorite === true),
        lang: state.language.lang
    }
}

//Connect component to the controller. 
export default connect(mapStateToProps)(FavoriteTeacherQuestionsList);