import React from 'react';

/**
 * Footer displayed in every page of the applicaiton.
 * Contains links to Edvo Tech's social media pages and a copyright notice. 
 */
const Footer = () => (
    <div className="edvo-footer footer">
        <div className="container">
            <div className="row">
                <div className="col-sm text-center mb-3">
                    {
                        //Link to facebook page
                    }
                    <a href='https://www.facebook.com/EdvoTech/' target='_blank'><i className="text-white fab fa-facebook-square fa-3x"></i></a>
                
                    {
                        //Link to LinkedIn page
                    }
                    <a href='https://www.linkedin.com/company/edvotech/' target='_blank'><i className="text-white ml-3 mr-3 fab fa-linkedin-in fa-3x"></i></a>
              
                    {
                        //Link to Instagram page
                    }
                    <a href='https://www.instagram.com/edvotech/' target='_blank'><i className="text-white ml-3 mr-3 fab fa-instagram fa-3x"></i></a>
                </div>
            </div>
            <div className="row">
                    <div className="col-sm text-center mb-5 text-white">
                        {
                            //Copyright notice
                        }
                        <p>© 2018 Edvotech.com</p>
                    </div>
                </div>
        </div>
    </div>
);

export default Footer;