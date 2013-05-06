module.exports = Object.freeze({
	app: { port: 1024 }
, umich: {
	apiBase: "https://sunbittern.dsc.umich.edu:8243"
	, oauthTokens: [
			"Kkxk_hIotm7Bdr7gShsf4wvovbUa"
		, "ZsMQVWtqe5Z_xRq9GRfHwov5fq8a"
		, "FgfEknhCQVJtqtT4APKbSFDLSKYa"
		, "K6K4bIffy1wWECywkPOK1wVfgN4a"
		]
	}
, mongodb: {
	host: "dharma.mongohq.com"
	, port: 10044
	, name: "umich-io"
	, user: process.env.DB_USER
	, pass: process.env.DB_PASS
	}
});