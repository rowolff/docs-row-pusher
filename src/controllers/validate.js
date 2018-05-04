const validate = {
  request: (req, res) =>
    new Promise((resolve, reject) => {
      if (req.body.title && req.body.error) {
        resolve({ message: 'No validation errors' });
      } else {
        reject(new Error('validation error'));
      }
    }),
};

export default validate;
