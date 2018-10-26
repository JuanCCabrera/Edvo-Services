import React from 'react';
import {Link} from 'react-router-dom';

const RecommendationButtonList = (props) => (
    <div>
        <br/>
        <Link to={"/recommendations/assign"}>Assign</Link>
        <br/>
        <Link to={"/recommendations/create"}>Create</Link>
        <br/>
        <Link to={"/recommendations/manage"}>Manage</Link>
    </div>
);

export default RecommendationButtonList;