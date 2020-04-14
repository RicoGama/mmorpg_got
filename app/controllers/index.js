module.exports.index = function (application, req, res) {
    res.render('index', {validacao: {}});
}

module.exports.autenticar = function (application, req, res) {
    var dadosForm = req.body;

    req.assert('usuario', 'Usuário não deve ser vazio').notEmpty();
    req.assert('senha', 'Senha não deve ser vazio').notEmpty();

    var erros = req.validationErrors();

    if (erros) {
        res.render('index', {validacao: erros});
    }

    var connection = application.config.dbConnection;
    var usuariosDao = new application.app.models.usuariosDAO(connection);

    usuariosDao.autenticar(dadosForm, req, res);
}