const respond = {
  message: (req, res) =>
    new Promise(resolve => {
      const returnMessage = {
        status: res.statusCode,
        message: res.statusMessage,
        addedAt: res.addedAt,
        data: req.body,
      };
      resolve(returnMessage);
    }),
};

export default respond;
