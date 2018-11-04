export const loadClass = (
    {
        userId = '',
        classInfoId = '',
        subject = '',
        format = '',
        language = '',
        level = '',
        groupSize = '',
        topicA = '',
        topicB = '',
        topicC = '',
    } = {}) => {
        return {
            type: 'LOAD_CLASS',
            class: {
                userId,
                classInfoId,
                subject,
                format,
                language,
                level,
                groupSize,
                topicA,
                topicB,
                topicC
            }
        }
};

export const removeClass = ({classInfoId} = {}) => {
    return {
        type: 'REMOVE_CLASS',
        classInfoId: classInfoId
    }
};
