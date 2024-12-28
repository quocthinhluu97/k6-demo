const WorkLoadConfig = {
    DEBUG: [
        { duration: '10s', target: 1 }
    ],
    SMOKE: [
        {duration: '5s', target: 10},
        {duration: '30s', target: 10},
        {duration: '5s', target: 0},

    ]
};

export default WorkLoadConfig