import React from 'react';
import {connect} from 'react-redux';
import SchoolListItem from './SchoolListItem';
import Pagination from 'react-js-pagination';
import axios from 'axios';
import {addSchool, unloadInstitutions} from '../actions/school';
import uuid from 'uuid';
import auth0Client from '../Auth';

import getVisibleSchools from '../selectors/schools';
import { setLoadingModal } from '../actions/loadingModal';
import { setFailureModal } from '../actions/failureModal';

/**
 * List of schools displayed in AppSchools page. 
 */
class SchoolList extends React.Component{
    constructor(props){
        super(props);
        this.pageSlice = 1;
        this.itemsPerPage = 5;  //Schools displayed per page
        this.currentPage = 1;   //Current page
        //State contains the page being viewed and the list of schools that is visible in that page. 
        this.state = {
            activePage: 1,
            displayedSchools: []
        }
    }
    
    //Configure state when component is about to be mounted. 
    componentWillMount(){
        //Change UUID for InsitutionID when DB connection is made
        //send to action
        this.props.dispatch(setLoadingModal());
        axios.get('https://beta.edvotech.com/api/admin/settings/institutions',{
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }})
        .then(response => {
            console.log("REPSONSE: ", response);
            response.data.institutions.forEach(element => {
                this.props.dispatch(addSchool({id: element.institutionid, name: element.name , 
                    location: element.location, type: element.type, 
                    numAccounts: element.accounts}));
            });
            this.props.dispatch(setLoadingModal());
        }).catch(error => {
            this.props.dispatch(setLoadingModal());
            this.props.dispatch(setFailureModal());
        });
        this.pageSlice = Math.ceil(this.props.schools.length/this.itemsPerPage);
        this.currentPage = 1;
        const initialPageUsers = this.props.schools.slice(0,this.itemsPerPage);
        this.setState({activePage: 1, displayedSchools: initialPageUsers});
    }

    componentWillUnmount(){
        this.props.dispatch(unloadInstitutions());
    }

    //Update page when component updates. 
    componentDidUpdate(prevProps){
        //Move to the previous page if there are no items remaining on the current page.
        if(prevProps.schools !== this.props.schools){
            if(this.state.displayedSchools.length === 1 && this.currentPage !== 1){
                this.handlePageChange(this.currentPage-1);
            }else{
                this.handlePageChange(this.currentPage);
            }
        }

        //Move to first page if a filter is modified. 
        if(prevProps.filters !== this.props.filters){
            this.handlePageChange(1);
        }
    }

    //Change pages and display new list of items on new page. 
    handlePageChange = (pageNumber) => {
        this.currentPage = pageNumber;
        const startIndex = (pageNumber-1)*this.itemsPerPage;
        let endIndex = (pageNumber)*this.itemsPerPage;
        //Limit the amount of items shown on the last page depending on the length of the original item array. 
        if(((pageNumber)*this.itemsPerPage) > this.props.schools.length){
            endIndex = this.props.schools.length;
        }
        //Slice original array to obtain list of items to display. 
        const displayedSchools = this.props.schools.slice(startIndex, endIndex);
        //Modify local state
        this.setState(() => ({activePage: pageNumber, displayedSchools: displayedSchools}));
    };

    render(){
        return(
            <div>
                {
                    //List of schools
                }
                {this.state.displayedSchools.map((school) => {
                    return <SchoolListItem key={school.id} school={school}/>
                })}
                <br/>

                {
                    //Pagination component
                }
                <div className="text-center">
                {(this.props.schools.length > 5) &&
                    <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.itemsPerPage}
                    totalItemsCount={this.props.schools.length}
                    onChange={this.handlePageChange}
                    />
                }
                </div>
                {
                    //Message shown if there are no items on the list
                }
                    {(this.props.schools.length === 0) && (this.props.lang === 'English' ?
                        <div className="close-empty-message-card">
                            <p>There are no registered institutions to manage.</p>
                        </div>
                        :
                        <div className="close-empty-message-card">
                            <p>No hay instituciones registradas para administrar.</p>
                        </div>
                    )
                    }
            </div>
        )
    }
}

//Map filtered list of schools, school filter data and the current language state to the component properties. 
const mapStateToProps = (state) => {
    return{
        schools: getVisibleSchools(state.schools, state.schoolFilters),
        filters: state.schoolFilters,
        lang: state.language.lang
    }
}

//Connect the component to the controller. 
export default connect(mapStateToProps)(SchoolList);