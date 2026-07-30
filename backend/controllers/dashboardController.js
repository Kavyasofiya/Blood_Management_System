const db = require("../config/database");

exports.getDashboardData = (req, res) => {

    const sql = `
        SELECT
            (SELECT COUNT(*) FROM donors) AS donors,
            (SELECT IFNULL(SUM(units),0) FROM blood_stock) AS bloodUnits,
            (SELECT COUNT(*) FROM blood_requests) AS requests,
            (SELECT COUNT(*) FROM hospitals) AS hospitals
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database Error",
                error: err
            });
        }

        res.json(result[0]);

    });

};