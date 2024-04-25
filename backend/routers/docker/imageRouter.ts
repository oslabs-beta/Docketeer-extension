import express, { Router, Request, Response, NextFunction } from 'express';
import imageController from '../../controllers/docker/imagesController';
import cacheController from '../../controllers/docker/cacheController';
import mongoController from '../../controllers/docker/mongoController';
import { exec } from 'child_process';

const router = Router();
router.use(express.json());

/**
 * @abstract Get current Docker images from user's docker and update Grype's DB
 * @todo
 * @param
 * @returns
 */
router.get('/', cacheController.checkCacheGrypeDb, imageController.getImages, imageController.dbStatus, cacheController.setCacheGrypeDb, (req, res) => {
  return res.status(200).json(res.locals.images);
});

/**
 * @abstract Check if image vulnerabilities are in the cache, if not perform a Grype scan
 * @todo
 * @param
 * @returns
 */

//when the user first opens the page
//when the user refreshes the page and gets the cache result as well
router.post("/scan", cacheController.checkCacheScan, imageController.scanImages, cacheController.setCacheScan, (req, res) => {
    return res.status(200).json({
      vulnerabilites: res.locals.vulnerabilites,
      everything: res.locals.everything,
      timeStamp: res.locals.timeStamp,
      saved: res.locals.saved,
    });
  }
);

/**
 * @abstract Scans an image using Grype CLI and summarizes the report's vulnerabilities by severity
 * @todo
 * @param req.body.scanName
 * @returns count of vulnerabilities in this format: {
    "Low": 19,
    "Medium": 11,
    "Negligible": 3
}
 */

//for when getScan or RESCAN button is hit
router.post('/rescan', imageController.scanImages, cacheController.setCacheScan, (req, res) => {
  return res.status(200).json({
    vulnerabilites: res.locals.vulnerabilites,
    everything: res.locals.everything,
    timeStamp: res.locals.timeStamp,
    saved: false,
  });
});

/**
 * @abstract
 * @todo Save the scan to MongoDB
 * @param req.body
 * @returns saved Object sent from the frontend to console.log out to test
 */
router.post('/savescan', mongoController.saveScan, cacheController.setCachedSave, (req, res) => {
  return res.status(200).json({
    printSavedScan: res.locals.savedScan,
    saved: res.locals.saved,
  });
});

/**
 * @abstract
 * @todo get scan to MongoDB
 * @param req.body
 * @returns saved Object sent from the frontend to console.log out to test
 */
router.get('/history', mongoController.getHistory, (req, res) => {
  return res.status(200).json(res.locals.history);
});

/**
 * @abstract
 * @todo Open CVE link from Modal - Learn More
 * @param req.body.link
 * @returns status 200
 */
router.post(
  '/openlink', (req, res) => {
    const { link } = req.body;
    exec(`open ${link}`, (error, stdout, stderr) => {
      if (error) {
				console.error(`exec error: ${error}`);
				return;
			}
			console.log(`stdout: ${stdout}`);
			console.error(`stderr: ${stderr}`);
    })
     return res.sendStatus(200);
  }
);


/**
 * @abstract
 * @todo Move buildContainerFromImage to the containercontroller
 * @param req.body.name
 * @param req.body.tag
 * @returns containers
 */
router.post('/run', imageController.buildContainerFromImage, (req, res) => {
  return res.sendStatus(201);
});


/**
 * @abstract
 * @todo
 * @param
 * @returns
 */
router.delete('/:id', imageController.removeImage, (req, res) => {
  return res.sendStatus(204);
});

export default router;