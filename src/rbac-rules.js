const rules = {
  school: {
    static: [
      "school:home",
      "school:settings"
    ]
  },
  mentor: {
    static: [
      "mentor:home",
      "mentor:settings",
      "mentor:recommendations-add",
      "mentor:recommendations-assign",
      "mentor:questions-view",
      "mentor:questions-answer"
    ]
  },
  teacher: {
    static: [
      "teacher:home",
      "teacher:settings",
      "teacher:recommendations-view",
      "teacher:questions-view",
      "teacher:quizzes-view"
  ]
  },
  admin: {
    static: [
      "admin:home",
      "admin:settings",
      "admin:recommendations-add",
      "admin:recommendations-assign",
      "admin:questions-view",
      "admin:questions-answer",
      "admin-users"
    ]
  }
};

export default rules;
