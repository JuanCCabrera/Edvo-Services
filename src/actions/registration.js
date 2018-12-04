//Contact Action Generators
import axios from 'axios';
import {withRouter} from 'react-router-dom';

/**
 * sendRegistration - Action which posts user information to the database once registration has been completed. 
 * @param {*} param0 - Object containing a user's registration data. This includes their email, password, password confirmation, name, last name, gender
 * date of birth, level of education, location, class subject, class format, class language, class level, class group size, class topics, school name, school location,
 * school type, a list of boolean school resources, the date of first employment as a teacher, the user's preferred language, and a boolean list of challenge categories applicable to the user. 
 */
export const sendRegistration = (
    {
        email = '',
        password = '',
        confirmPassword = '',
        name = '',
        lastName = '',
        gender = 'male',
        dateOfBirth = moment(),
        calendarFocused = false,
        levelOfEdu = 'AS',
        location = '',
        pageOneError = '',

        subject = '',
        format = 'classroom',
        language = 'spanish',
        level = 'first',
        size = 'small',
        topicsTaught = [''],
        pageTwoError = '',

        schoolName = '',
        schoolLocation = '',
        institutionID = '',
        schoolType = 'public',
        moodle = false,
        googleClassroom = false,
        emailResource = false,
        books = false,
        socialMedia = false,
        projector = false,
        computer = false,
        tablet = false,
        stylus = false,
        internet = false,
        smartboard = false,
        smartpencil = false,
        speakers = false,
        pageThreeError = '',

        timeEmployed = moment(),
        employedCalendarFocused = false,
        preferredLanguage = 'spanish',
        teachingStrategies = false,
        updatedMaterial = false,
        timeManagement = false,
        technologyIntegration = false,
        instructionAlignment = false,
        pageFourError = '',

        globalError = '',

        currPage = 1
    } = {}) => {
    axios.post('http://localhost:8081/registration', {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        name: name,
        lastName: lastName,
        gender: gender,
        dateOfBirth: dateOfBirth,
        calendarFocused: calendarFocused,
        levelOfEdu: levelOfEdu,
        location: location,
        pageOneError: pageOneError,

        subject: subject,
        format: format,
        language: language,
        level: level,
        size: size,
        topicsTaught: topicsTaught,
        pageTwoError: pageTwoError,

        schoolName: schoolName,
        schoolLocation: schoolLocation,
        institutionID: institutionID,
        schoolType: schoolType,
        moodle: moodle,
        googleClassroom: googleClassroom,
        emailResource: emailResource,
        books: books,
        socialMedia: socialMedia,
        projector: projector,
        computer: computer,
        tablet: tablet,
        stylus: stylus,
        internet: internet,
        smartboard: smartboard,
        smartpencil: smartpencil,
        speakers: speakers,
        pageThreeError: pageThreeError,

        timeEmployed: timeEmployed,
        employedCalendarFocused: employedCalendarFocused,
        preferredLanguage: preferredLanguage,
        teachingStrategies: teachingStrategies,
        updatedMaterial: updatedMaterial,
        timeManagement: timeManagement,
        technologyIntegration: technologyIntegration,
        instructionAlignment: instructionAlignment,
        pageFourError: pageFourError,

        globalError: globalError,

        currPage: currPage
    }).then((response)=>{
            
                
    });
    return {
    type: 'SEND_LOGIN_FORM',
        login: {
            email: email,
            password: password
        }
    }
};