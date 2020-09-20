const fs = require('fs');

const deleteSingleFile = (req, res, next) => {
	let fileName = req.params.fileName;
	const pathToFile = `./public/uploads/${fileName}`;
	console.log(pathToFile);
	fs.unlink(pathToFile, (err) => {
		if(err && err.code == 'ENOENT') {
			console.info("File doesn't exist, won't remove it.");
		} 
		else if (err) {
			console.error("Error occurred while trying to remove file");
		} 
		else {
			console.info('removed');
			next();
		}
	})
}

const deleteMultipleFiles = (req, res, next) => {
	let filesToBeDeleted = req.body.fileArray;
	let allFileExists = true;
	let notFoundFiles = [];
	filesToBeDeleted.forEach(file => {
		if (!fs.existsSync(`./public/uploads/${file}`)) {
			allFileExists = false;
			notFoundFiles.push(file);
		}
	})
	if(allFileExists) {
		for(const file of filesToBeDeleted) {
			fs.unlink(`./public/uploads/${file}`, err => {
				if(err) next(err);
			});
		}
		next();
	}
	else {
		res.send({'files not found': notFoundFiles});
	}
}

module.exports = {
	deleteSingleFile,
	deleteMultipleFiles
}