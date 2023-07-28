module.exports = (req, res, data, statuscode = 200) => {
    res.status(statuscode).json(data);
};