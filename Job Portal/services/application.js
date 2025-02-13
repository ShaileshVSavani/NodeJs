const Application = require("../model/application");

const ApplicationService = {
  getAll: async (query) => {
    let app = await Application.find(query);
    return app;
  },
  create: async (payload) => {
    let app = await Application.create(payload);
    return app;
  },
  update: async (id, payload) => {
    let app = await Application.findByIdAndUpdate(id, payload);
    return app;
  },
  getByUserId: async (userId) => {
    let app = await Application.find({userId: userId});
    return app;
  },
  getByJobId: async (jobId) => {
    let app = await Application.find({jobId: jobId});
    return app;
  }
};

module.exports = ApplicationService;