import React from 'react';
import {Link} from 'react-router-dom';

/**
 * 404 Page Not Found 
 * Shows Navigation Link to main page. 
 */
const NotFoundPage = () => (
    <div>
        404 - <Link to="/">Go home</Link>
    </div>
);

export default NotFoundPage;