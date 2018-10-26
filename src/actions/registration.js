//Contact Action Generators
import axios from 'axios';
import {withRouter} from 'react-router-dom';

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
            if(response.status == 201)
                console.log("USER REGISTERED");
    });
    return {
    type: 'SEND_LOGIN_FORM',
        login: {
            email: email,
            password: password
        }
    }
};