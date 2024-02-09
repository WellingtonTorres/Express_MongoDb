/**
 * Create documentation:
 * apidoc -i D:\GIT\ABUJAMRA\vitorabujamra\ZZ.NODE\ -c src/public/apidoc.json -o src/public/
 */

const controllerLib = require("../general/LibController");
const jwt = require("jsonwebtoken");
const ModelUser = require("../../models/user");

module.exports = {
  /**
   * @api {post} /CreateUser Create User
   * @apiGroup B Registrations - 01 User
   * @apiName CreateUser
   * @apiDescription API for creating users
   *
   * @apiHeader {String} x-access-token Users unique access token.
   * @apiHeaderExample {json} Header-Example:
   * {
   *    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc3ZTg1M2RjLThmZTYtNDNjZC1hMTJlLWZkMjMxYWEz"
   * }
   *
   * @apiBody {String}  [System]      System
   * @apiBody {String}  [LoginName]   User
   * @apiBody {String}  [Password]    Pass
   * @apiBody {String}  [UserMail]    UserMail
   * @apiBody {String}  [FirstName]   First name
   * @apiBody {String}  [LastName]    Last name
   * @apiBody {String}  [UserStatus]  Status (A=Active;I=Inactive)
   *
   * @apiParamExample {json} Body-Example:
   * {
   *    "System": "SYSTEM",
   *    "LoginName": "firstName.lastName",
   *    "Password": "pass",
   *    "UserMail": "UserMail",
   *    "FirstName": "FirstName",
   *    "LastName": "LastName",
   *    "UserStatus": "A"
   * }
   *
   * @apiSampleRequest /CreateUser
   *
   * @apiSuccess {String} status OK
   * @apiSuccess {String} message User created successfully
   * @apiSuccessExample {json} Success-Response:
   * HTTP/1.1 200 OK
   * {
   *    "CODIGO": "100",
   *    "MSG": "",
   *    "RETORNO": {
   *      "status": "OK",
   *      "message": "User created successfully"
   *    }
   * }
   *
   * @apiError {String} status NOK
   * @apiError {String} message The specified user was not created.
   * @apiErrorExample {json} Error-Response:
   * HTTP/1.1 404 Not Found
   * {
   *    "CODIGO": "99",
   *    "MSG": "",
   *    "RETORNO": {
   *      "status": "NOK",
   *      "message": "The specified user was not created | " + error
   *    }
   * }
   *
   */
  async CreateUser(req, res) {
    //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
    //Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", "GET,POST");

    var err = "";
    var fs = require("fs");
    var Mustache = require("mustache");
    try {
      var data = fs.readFileSync("src/templates/usercreation.html", {
        encoding: "utf8",
        flag: "r",
      });
      //console.log("Saved!");
    } catch (err) {
      console.error(err);
    }
    let Login = (req.body.LoginName).toLowerCase();
    var view = {
      Fname: req.body.FirstName,
      Lname: req.body.LastName,
      user: Login,
      pass: req.body.Password,
    };
    output = Mustache.render(data, view);
    to = req.body.UserMail //"vitor.abujamra@adufertil.com.br"; // Alterar aqui para req.body.UserMail
    bbc = ["vitor.abujamra@adufertil.com.br","wellington.melo@adufertil.com.br"]
    subject = "Criação de usuário";
    var oRet2 = await controllerLib.sendmail(to, subject, bbc, output);


    try {
      var crypto = require("crypto");
      const users = await ModelUser.create({
        System: req.body.System,
        LoginName: Login,
        PasswordHash: crypto
          .createHash("md5")
          .update(req.body.Password)
          .digest("hex"),
        UserMail: req.body.UserMail,
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        LastLogin: "",
        UserStatus: req.body.UserStatus,
      });
      //return res.json(users);
      return res.json({
        CODIGO: "100",
        MSG: "",
        RETORNO: {
          status: "OK",
          message: "User created successfully",
        },
      });
    } catch (error) {
      return res.json({
        CODIGO: "99",
        MSG: "",
        RETORNO: {
          status: "NOK",
          message:
            "The specified user was not created | " +
            error.errors[0].validatorKey +
            " | " +
            error.errors[0].value +
            " | " +
            error.errors[0].path,
        },
      });
    }
  },

  /**
   * @api {post} /UpdateUser Update User
   * @apiGroup B Registrations - 01 User
   * @apiName UpdateUser
   * @apiDescription API for user update
   *
   * @apiHeader {String} x-access-token Users unique access token.
   * @apiHeaderExample {json} Header-Example:
   * {
   *    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc3ZTg1M2RjLThmZTYtNDNjZC1hMTJlLWZkMjMxYWEz"
   * }
   *
   * @apiBody {String}  [UserID]      UserID
   * @apiBody {String}  [Password]    Pass
   * @apiBody {String}  [FirstName]   First name
   * @apiBody {String}  [LastName]    Last name
   * @apiBody {String}  [UserStatus]  Status (A=Active;I=Inactive)
   *
   * @apiParamExample {json} Body-Example:
   * {
   *    "UserID": "UserID",
   *    "Password": "pass",
   *    "FirstName": "FirstName",
   *    "LastName": "LastName",
   *    "UserStatus": "A"
   * }
   *
   * @apiSampleRequest /UpdateUser
   *
   * @apiSuccess {String} status OK
   * @apiSuccess {String} message User updated successfully
   * @apiSuccessExample {json} Success-Response:
   * HTTP/1.1 200 OK
   * {
   *    "CODIGO": "100",
   *    "MSG": "",
   *    "RETORNO": {
   *      "status": "OK",
   *      "message": "User updated successfully"
   *    }
   * }
   *
   * @apiError {String}   status    NOK
   * @apiError {String}   message   User not updated
   * @apiErrorExample {json} Error-Response:
   * HTTP/1.1 404 Not Found
   * {
   *    "CODIGO": "99",
   *    "MSG": "",
   *    "RETORNO": {
   *      "status": "NOK",
   *      "message": "User not updated"
   *    }
   * }
   *
   */
  async UpdateUser(req, res) {
    try {
      const usr = await ModelUser.findByPk(req.body.UserID);
      if (usr) {
        if (req.body.Password != null && req.body.Password != "") {
          var crypto = require("crypto");
          usr.PasswordHash = crypto
            .createHash("md5")
            .update(req.body.Password)
            .digest("hex");
        }
        if (req.body.FirstName != null && req.body.FirstName != "") {
          usr.FirstName = req.body.FirstName;
        }
        if (req.body.LastName != null && req.body.LastName != "") {
          usr.LastName = req.body.LastName;
        }
        if (req.body.UserStatus != null && req.body.UserStatus != "") {
          usr.UserStatus = req.body.UserStatus;
        }

        await usr.save();
      }

      //return res.json(usr);
      return res.json({
        CODIGO: "100",
        MSG: "",
        RETORNO: {
          status: "OK",
          message: "User updated successfully",
        },
      });
    } catch (error) {
      return res.json({
        CODIGO: "99",
        MSG: "",
        RETORNO: {
          status: "NOK",
          message: "User not updated",
        },
      });
    }
  },

  /**
   * @api {post} /FindUser Search User
   * @apiGroup B Registrations - 01 User
   * @apiName FindUser
   * @apiDescription  API for searching user individually
   *
   * @apiHeader {String} x-access-token Users unique access token.
   * @apiHeaderExample {json} Header-Example:
   * {
   *    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc3ZTg1M2RjLThmZTYtNDNjZC1hMTJlLWZkMjMxYWEz"
   * }
   *
   * @apiBody {String}  [LoginName]  LoginName
   * @apiBody {json} Body-Example:
   * {
   *    "LoginName": "firstName.lastName"
   * }
   *
   * @apiParamExample {json} Body-Example:
   * {
   *    "LoginName": "firstName.lastName"
   * }
   *
   * @apiSampleRequest /FindUser
   *
   * @apiSuccess {String}   status    OK
   * @apiSuccess {String}   message   User located successfully
   * @apiSuccess {Array}    data   User data
   * @apiSuccessExample {json} Success-Response:
   * HTTP/1.1 200 OK
   * {
   *    "CODIGO": "100",
   *    "MSG": "Mensagem",
   *    "RETORNO": { status: usr.UserStatus, usuario: usr.LoginName }
   * }
   *
   * @apiError {String}   status    NOK
   * @apiError {String}   message   User not found
   * @apiErrorExample {json} Error-Response:
   * HTTP/1.1 404 Not Found
   * {
   *    "CODIGO": "99",
   *    "MSG": "",
   *    "RETORNO": {
   *      "status": "Search error",
   *      "mensagem": error
   *      }
   * }
   *
   */
  async GetOneUser(req, res, FunctionCall, type) {
    let usr = {};
    if (FunctionCall == "verifyUser") {
      try {
        if (type == 'USER') {
          usr = await ModelUser.scope("excludeCreated").findOne({
            //where: { LoginName: req, System: "CLIENTE" },
            where: { LoginName: req },
            attributes: {
              include: ["PasswordHash", "UserID"],
            },
          });
        } else if (type == 'MAIL') {
          usr = await ModelUser.scope("excludeCreated").findOne({
            //where: { UserMail: req, System: "CLIENTE" },
            where: { UserMail: req },
            attributes: {
              include: ["PasswordHash", "UserID"],
            },
          });
        }
        if (usr == null) {
          return [false, null];
        } else {
          return [true, usr];
        }
      } catch (error) {
        return [false, null];
      }
    } else {
      aFields = [];
    
      try {
        
        let Login = (req.body.LoginName).toLowerCase();
        const usr = await ModelUser.scope("excludeCreated").findOne({
          where: { LoginName: Login },
          attributes: {
            include: aFields,
          },
        });
        if (usr == null) {
          return res.json({
            CODIGO: "99",
            MSG: "",
            RETORNO: { status: "Search error", mensagem: "Not found" },
          });
        } else {
          oRet = new Object();
          oRet.usuario = usr.LoginName;
          oRet.status = usr.UserStatus;

          return res.json({
            CODIGO: "100",
            MSG: "Mensagem",
            RETORNO: { status: usr.UserStatus, usuario: usr.LoginName },
          });
        }
      } catch (error) {
        return res.json({
          CODIGO: "99",
          MSG: "",
          RETORNO: {
            status: "Search error",
            mensagem: error,
          },
        });
      }
    }
  },

};
