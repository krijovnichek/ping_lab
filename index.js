const ping =  require('./ping.js');

if (!process.argv[2]) {
	console.log('Arg expected');
	process.exit()

}
	

try {ping.ping(process.argv[2].toString()).then((result) => {
	if (result)	console.log(result.result);
	else console.log('Err')
});
}
catch (err) {
	console.log ()
}

