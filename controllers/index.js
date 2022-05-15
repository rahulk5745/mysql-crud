const conn = require("../db/db");
const AppError = require("../utils/appError");




   exports.create = (req, res, next) => {
    if (!req.body) return next(new AppError("No form data found", 404));
    const values = [req.body.name,req.body.email];
    conn.query(
      "INSERT INTO Employee (name, email) VALUES(?)",
      [values],
      function (err, data, fields) {
        if (err) return next(new AppError(err, 500));
        res.status(201).json({
          status: "success",
          message: "record created!",
        });
      }
    );
   };

   exports.get = (req, res, next) => {
    if (!req.params.id) {
      return next(new AppError("No record found", 404));
    }
    conn.query(
      "SELECT * FROM Employee WHERE id = ?",
      [req.params.id],
      function (err, data, fields) {
        if (err) return next(new AppError(err, 500));
        res.status(200).json({
          status: "success",
          length: data?.length,
          data: data,
        });
      }
    );
   };

   exports.update = (req, res, next) => {
    if (!req.params.id) {
      return next(new AppError("No record found", 404));
    }
    conn.query(
      `UPDATE Employee SET name='${req.body.name}',email='${req.body.email}' WHERE id=?`,
      [req.params.id],
      function (err, data, fields) {
        if (err) return next(new AppError(err, 500));
        res.status(201).json({
          status: "success",
          message: "record updated!",
        });
      }
    );
   };
   exports.delete= (req, res, next) => {
    if (!req.params.id) {
      return next(new AppError("No record id found", 404));
    }
    conn.query(
      "DELETE FROM Employee WHERE id=?",
      [req.params.id],
      function (err, fields) {
        if (err) return next(new AppError(err, 500));
        res.status(201).json({
          status: "success",
          message: "record deleted!",
        });
      }
    );
   }