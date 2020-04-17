const ApiHelper = module.exports;

ApiHelper.createApiRes = (req, res, message, resData) => {
	res.send({message, data: resData})
};
