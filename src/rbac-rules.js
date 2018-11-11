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
      "admin-recommendations-manage",
      "admin:recommendations-add",
      "admin:recommendations-assign",
      "admin:recommendations-modify",
      "admin:questions-manage",
      "admin:questions-answer",
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
      "admin-recommendations-manage",
      "admin:recommendations-add",
      "admin:recommendations-assign",
      "admin:recommendations-modify",
      "admin:questions-manage",
      "admin:questions-answer",
      "admin-users"
    ]
  }
};

export default rules;
