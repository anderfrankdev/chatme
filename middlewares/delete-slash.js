

const deleteSlash = (req, res, next) => {
  if (req.path.substr(-1) === '/' && req.path.length > 1) {
    const query = req.url.slice(req.path.length)
    const safepath = req.path.slice(0, -1).replace(/\/+/g, '/')
    return res.redirect(301, safepath + query)
  } else {
    next()
  }
}

module.exports = deleteSlash