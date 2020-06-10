module.exports = {
  checkQueryParams : (req, res, next) => {

    let countMessage = 'OK';
    let urlMessage = 'OK';
    let protocolMessage = 'OK';


    if (typeof req.query.count === 'undefined' || req.query.count === '') {
      count = 1;
    }
    else if (isNaN(req.query.count) || req.query.count < 1 || req.query.count > 30) {
      countMessage = 'Count parameter must be a number between 1 and 30 !';
    }
    if (typeof req.query.urls === 'undefined' || req.query.urls === ''){
      req.query.urls = 'true';
    }
    if (req.query.urls !== 'true' && req.query.urls !== 'false'){
      urlMessage = 'Url parameter must be true of false';
    }
    if (typeof req.query.protocol === 'undefined' || req.query.protocol !== 'https' && req.query.protocol !== 'http'){
      protocolMessage = 'Protocol parameter is required and must be https or http';
    }

    if (countMessage !== 'OK' || urlMessage !== 'OK' || protocolMessage !== 'OK'){

      res.status(400).json(
        {
          type: 'badRequest',
          code: 400,
          errors: [
            {
              param: 'protocol',
              message: protocolMessage
            },
            {
              param: 'count',
              message: countMessage
            },
            {
              param: 'url',
              message: urlMessage
            }
          ]
        }
      )

    } else {
      next();
    }
  }

}
