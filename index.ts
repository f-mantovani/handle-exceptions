import express from 'express';
const log = (msg: string) => console.log(`pid: [${process.pid}] - ${msg}`);

const UNKNOW_ERROR = 1;
const knowErrors = [
	{ exitCode: UNKNOW_ERROR, event: 'unhandledRejection' },
	{ exitCode: UNKNOW_ERROR, event: 'uncaughtException' },
];

process.on('exit', (code) => {
	log(`Server closed with success`);
	process.exit(code);
});

knowErrors.forEach(({ exitCode, event }) => {
	process.on(event, (error) => {
		log(`Process exiting due to ${event}`);
		if (exitCode === UNKNOW_ERROR) {
			process.exit(exitCode);
			return;
		}
		process.exit(exitCode);
	});
});

const app = express();
app.use(express.json());

app.post('/', async (req, res, next) => {
  console.log('inside the route')
	try {
		console.log(req.body);
		res.status(200).json(req.body);
	} catch (error) {
    console.log('deu ruim')
    res.status(400).json(error)
  }
});

// let counter = 0
// const connectToDb = async () => {
// 	const random = Math.random();
// 	if (random < 0.00001) {
// 		return Promise.reject('Could not connect to DB');
// 	}
// 	log('DB connect with success');
//   if (++counter > 3) process.exit(0)
// };

// setInterval(() => {
// 	connectToDb();
// }, 200);

app.use((error, req, res, next) => {
  console.log(error)
  res.status(500).json('error')
})

app.listen(3000, () => log(`connected to 3000`));
