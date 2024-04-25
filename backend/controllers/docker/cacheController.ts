import { Request, Response, NextFunction } from 'express';
import { getAsync, setAsync } from '../helper';
import { GrypeScan, ServerError, countVulnerability } from '../../backend-types';

interface CacheController {
  /**
   * @method GET
   * @abstract sets grype's db status to already updated
   * @returns {void}
   */
  setCacheGrypeDb: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;

  /**
   * @method GET
   * @abstract see if grype's db has already been updated today
   * @returns {void}
   */
  checkCacheGrypeDb: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;

  /**
   * @method POST
   * @abstract set countVulnerabilities to the Memcached cache
   * @returns {void}
   */
  setCacheScan: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;

  /**
   * @method POST
   * @param {string} req.body.scanName
   * @abstract Check memcached cache for first load / last scan
   * @returns {void}
   */
  checkCacheScan: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;

  setCachedSave: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
}

const cacheController: CacheController = {} as CacheController;

cacheController.checkCacheGrypeDb = async (req, res, next) => {
  try {
    const cachedDbStatus = await getAsync('cachedDbStatus');
    console.log('cachedDbStatus: ', cachedDbStatus);
    if (cachedDbStatus === 'true') {
    res.locals.cachedDbStatus = true
    }
    next()
  } catch (error) {
    const errObj: ServerError = {
      log: { err: `cacheController checkCacheGrypeDb Error: ${error}` },
      status: 500,
      message: 'internal server error'
    }
    next(errObj);
  }
}


cacheController.setCacheGrypeDb = async (req, res, next) => {
  if (res.locals.cachedDbStatus) {
    next()
  } else {
    try {
      await setAsync('cachedDbStatus', JSON.stringify(true), 60 * 60 * 24);
      next()
    } catch (error) {
      const errObj: ServerError = {
        log: { err: `cacheController setCacheGrypeDb Error: ${error}` },
        status: 500,
        message: 'internal server error'
      }
      next(errObj);
    }
  }
}

cacheController.setCacheScan = async (req, res, next) => {
  if (res.locals.addToCache) {
    try {
      // cache vulnerability
      await setAsync(
        `${res.locals.scanName}&vulnerabilites`,
        JSON.stringify(res.locals.vulnerabilites),
        60 * 60 * 24
      );
      // cache everything
      await setAsync(
        `${res.locals.scanName}&everything`,
        JSON.stringify(res.locals.everything),
        60 * 60 * 24
      );
      // cache timeStamp
      await setAsync(
        `${res.locals.scanName}&timeStamp`,
        JSON.stringify(res.locals.timeStamp),
        60 * 60 * 24
      );
 

      next();
    } catch (error) {
      const errObj: ServerError = {
        log: { err: `cacheController setCacheVulnerability Error: ${error}` },
        status: 500,
        message: 'internal server error'
      }
      next(errObj);
    }
  } else {
    next()
  }
}

cacheController.setCachedSave = async (req, res, next) => {
    try {
      // cache isSaved
      await setAsync(
        `isSaved`,
        JSON.stringify(true),
        60 * 60 * 24
      );

      next();
    } catch (error) {
      const errObj: ServerError = {
        log: { err: `cacheController setCacheVulnerability Error: ${error}` },
        status: 500,
        message: 'internal server error'
      }
      next(errObj);
    }
  }

cacheController.checkCacheScan = async (req, res, next) => {
  const { scanName }: { scanName: string } = req.body;
  const cachedVulnernabilities = await getAsync(`${scanName}&vulnerabilites`);
  const cachedEverything = await getAsync(`${scanName}&everything`);
  const cachedTimeStamp = await getAsync(`${scanName}&timeStamp`);
  const cachedIsSaved = await getAsync(`isSaved`);

  res.locals.saved = cachedIsSaved ? true : false;

  if (
    cachedVulnernabilities !== undefined && cachedEverything !== undefined && cachedTimeStamp !== undefined
  ) {
    res.locals.vulnerabilites = JSON.parse(cachedVulnernabilities);
    res.locals.everything = JSON.parse(cachedEverything);
    res.locals.timeStamp = JSON.parse(cachedTimeStamp);
    res.locals.addToCache = false;
    next();
  } else {
    console.log("Cache miss:", `${scanName}`);
    next();
  }
}

export default cacheController;