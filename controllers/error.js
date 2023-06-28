exports.get404 = (req, res, next) => {
    res.status(404).json({ message: 'Page not found' });
}

exports.get500 = (error, req, res, next) => {
    const data = error.data;
    res.status(error.statusCode || 500).json({ message: error.message, data: data });
}