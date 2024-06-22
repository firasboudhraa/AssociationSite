const success = (res, data, code = 200) => {
    res.status(code).json(data)
};


module.exports = {
    success
}