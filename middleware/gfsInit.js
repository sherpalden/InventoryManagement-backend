const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const mongoURI = "mongodb://localhost:27017/mean-app";
let conn = mongoose.createConnection(mongoURI, 
			{
				useNewUrlParser: true, 
				useUnifiedTopology: true
			})
// Init gfs
let gfs;

conn.once('open', () => {
	gfs = new mongoose.mongo.GridFSBucket(conn.db,{
		bucketName: "uploads",
	})
	// gfs = Grid(conn.db, mongoose.mongo);
 //    gfs.collection('uploads');
})

