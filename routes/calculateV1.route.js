const express = require('express');
const router = express.Router();
router.use(express.urlencoded({ extended: true }));
const { Worker } = require("worker_threads");


router.post('/', async (req, res, next) => {
    try {
      const worker = new Worker('./workers/calculateV1.worker.js', {
        workerData: {
          a: req.body.a,
          b: req.body.b,
          c: req.body.c,
        }
      });

      worker.on('message', (result) => {
        console.log('RESULT', result);
        res.render('index', { result });
      });

      worker.on('error', (error) => {
        console.error('Worker error:', error.stack || error.message || error);
        next(error);
      });

    } catch (error) {
      console.error('Error creating worker:', error);
      next(error);
    }
});

module.exports = router;
