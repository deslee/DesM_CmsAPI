module.exports = {
	routes: {
		api: 		'/api',		// url for the server's basic api
		secure_api: '/auth',	// url for the server's secure api
	},

	log: false,

	mongo_url: 'mongodb://localhost:27017/cms', // url for the mongo instance

	http_port: 8000,
}