/**
 * getVisibleTeacherQuestions - Returns a list of teacher questions which only include the input filtering text in their subject or question body. 
 * The returned list also matches the read filtering category. If the 'all' options is selected, then no additional filtering is made. If the 'read' option
 * is selected, then only quesitons which have been read are returned. If the 'not read' option is selected, then questions which have not been read are returned. 
 * All elements in the list are automatically sorted based on the selected sorting category (date or rating). 
 * 
 * @param {*} teacherQuestions - List of all questions available in the Teacher Questions page.  
 * @param {*} param1 - Text filter input, type sorting category (date or rating), and read filter category (all, read or not read)
 */
const getVisibleTeacherQuestions = (teacherQuestions, {text, checkType, read}) => {
    return teacherQuestions.filter((question) => {
        const questionMatch = question.question.toLowerCase().includes(text.toLowerCase());
        const subjectMatch = question.subject.toLowerCase().includes(text.toLowerCase());
        let typeCheck = true;
        if(read !== 'all'){
            if(read === 'read' && !question.read){
                typeCheck = false;
            }else if(read === 'not_read' && question.read){
                typeCheck =  false;
            }
        }
        return (questionMatch || subjectMatch) && typeCheck;
    }).sort((a,b) => {
        if(checkType === 'rate'){
            return a.rate < b.rate ? 1 : -1;
        }
    });
};

export default getVisibleTeacherQuestions;