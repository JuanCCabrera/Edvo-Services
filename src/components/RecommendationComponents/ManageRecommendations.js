import React from 'react';
import ManageRecommendationsList from './ManageRecommendationsList';
import RecommendationButtonList from './RecommendationButtonList';
import RecommendationsFilters from '../Filters/RecommendationsFilters';
import Can from '../../Can';
import auth0Client from '../../Auth';
import {Redirect} from 'react-router-dom';

const ManageRecommendations = (props) => (
    <Can
    role={auth0Client.getRole()}
    perform="admin:recommendations-manage"
    yes={() => (
    <div>
        <RecommendationButtonList/>
        <RecommendationsFilters/>
        <ManageRecommendationsList/>
    </div>
                             )}
                             no={() => <Redirect to="/" />}
                           />
);

export default ManageRecommendations;