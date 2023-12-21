function proxy(app) {
  app.get(/^\/$/, (_req, res) => res.redirect('/discover'))
}

module.exports = proxy
