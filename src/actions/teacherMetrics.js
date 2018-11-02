//Load Teacher Metrics
export const loadTeacherMetrics = ({
        daysInPlatform = 0,
        TrecoID = '',
        Ttitle = '',
        Theader = '',
        Tlocation = '',
        Tdescription = '',
        Tmultimedia = '',
        Tdate = '',
        Trating = 0,
        MRrecoID = '',
        MRtitle = '',
        MRheader = '',
        MRlocation = '',
        MRdescription = '',
        MRmultimedia = '',
        MRdate = '',
        MRrating = 0
} = {}) => {
    
    return{
        type: 'LOAD_TEACHER_METRICS',
        daysInPlatform: daysInPlatform,
        topRecommendations: {
            recoID: TrecoID,
            title: Ttitle,
            header: Theader,
            location: Tlocation,
            description: Tdescription,
            multimedia: Tmultimedia,
            date: Tdate,
            rating: Trating
        },
        mostRecentRecommendations: {
            recoID: MRrecoID,
            title: MRtitle,
            header: MRheader,
            location: MRlocation,
            description: MRdescription,
            multimedia: MRmultimedia,
            date: MRdate,
            rating: MRrating
        }
    }
}
