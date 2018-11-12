import React from 'react';
import {connect} from 'react-redux';
import SchoolListItem from './SchoolListItem';
import Pagination from 'react-js-pagination';
import axios from 'axios';
import {addSchool, unloadInstitutions} from '../actions/school';
import uuid from 'uuid';
import auth0Client from '../Auth';

import getVisibleSchools from '../selectors/schools';

class SchoolList extends React.Component{
    constructor(props){
        super(props);
        this.pageSlice = 1;
        this.itemsPerPage = 1;
        this.currentPage = 1;
        this.state = {
            activePage: 1,
            displayedSchools: []
        }
    }

    componentWillMount(){
        //Change UUID for InsitutionID when DB connection is made
        //send to action
        axios.get('http://localhost:3000/admin/settings/institutions',{
            headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }})
        .then(response => {
            console.log("REPSONSE: ", response);
            response.data.institutions.forEach(element => {
                this.props.dispatch(addSchool({id: element.institutionid, name: element.name , 
                    location: element.location, type: element.type, 
                    numAccounts: element.accounts}));
            });
                
            
        
        });
        this.pageSlice = Math.ceil(this.props.schools.length/this.itemsPerPage);
        this.currentPage = 1;
        const initialPageUsers = this.props.schools.slice(0,this.itemsPerPage);
        this.setState({activePage: 1, displayedSchools: initialPageUsers});
    }

    componentWillUnmount(){
        this.props.dispatch(unloadInstitutions());
    }

    componentDidUpdate(prevProps){
        if(prevProps.schools !== this.props.schools){
            if(this.state.displayedSchools.length === 1 && this.currentPage !== 1){
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
        this.currentPage = pageNumber;
        const startIndex = (pageNumber-1)*this.itemsPerPage;
        let endIndex = (pageNumber)*this.itemsPerPage;
        if(((pageNumber)*this.itemsPerPage) > this.props.schools.length){
            endIndex = this.props.schools.length;
        }
        const displayedSchools = this.props.schools.slice(startIndex, endIndex);
        this.setState(() => ({activePage: pageNumber, displayedSchools: displayedSchools}));
    };

    render(){
        return(
            <div>
                <h3>{this.props.lang === 'English' ? 'Institutions' : 'Instituciones'}</h3>
                {this.state.displayedSchools.map((school) => {
                    return <SchoolListItem key={school.id} school={school}/>
                })}
                <br/>

                {(this.props.schools.length !== 0) &&
                    <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.itemsPerPage}
                    totalItemsCount={this.props.schools.length}
                    onChange={this.handlePageChange}
                    />
                }
                {(this.props.schools.length === 0) && (this.props.lang === 'English' ?
                    <div>
                        <p>There are no registered institutions to manage.</p>
                    </div>
                    :
                    <div>
                        <p>No hay instituciones registradas para administrar.</p>
                    </div>
                )
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        schools: getVisibleSchools(state.schools, state.schoolFilters),
        filters: state.schoolFilters,
        lang: state.language.lang
    }
}

export default connect(mapStateToProps)(SchoolList);