const db = require('./conn-model');

class Chemicals {
    constructor(id, productname, rate, productamount, chemical_log_id) {
        this.id = id;
        this.productname = productname;
        this.rate = rate;
        this.productamount = productamount;
        this.chemical_log_id = chemical_log_id;
        }

    static async getAll() {
        try {
            const response = await db.any(`select * from chemical LEFT JOIN log ON chemical.chemical_log_id = log.id`);
            return response;
        } catch(err) {
            return err.message
        }
    }

    static async getById(id) {
        try {
            const response = await db.one(`select * from chemical LEFT JOIN users ON log.log_id=users.id where log.id=${id}`);
            return response;
        } catch(err) {
            return err.message
        }
    }

    static async getByUserId(log_id) {
        try {
            const response = await db.any(`select * from chemical where chemical_log_id='${log_id}'`);
            console.log('this is the log-models page Log Id: ', log_id)
            return response;
        } catch(err) {
            return err.message
        }
    }

        static async getByLogId(log_id) {
        try {
            const response = await db.any(`select * from chemical where chemical_log_id='${log_id}'`);
            console.log('this is the log-models page Log Id: ', log_id)
            return response;
        } catch(err) {
            return err.message
        }
    }

    static async deleteChemical(chemical_id) {
        try {
            const response = await db.result(`delete from chemical where id = ${chemical_id}`);
            return response;
        } catch (err) {
            return err.message;
        }
    }

    static async addChemical(productname, rate, productamount, chemical_log_id) {
        const query = `insert into chemical
        (productname, rate, productamount, log_id)
    Values ('${productname}', '${rate}','${productamount}', ${chemical_log_id})`;
        try {
            let response = await db.result(query);
            return response;
        } catch(err) {
            console.log ('Error', err.message);
            return err;
        }
    }

    static async updateLog(chemicalId, productname, rate, productamount, chemical_log_id) {
        const query = `
            UPDATE chemical
            SET 
                productname = '${productname}', 
                rate = '${rate}', 
                productamount = '${productamount}', 
                chemical_log_id = ${chemical_log_id}
            WHERE 
                id = '${chemicalId}'`;
        console.log(query);
        try {
            const response = await db.result(query);
            console.log("response", response);
            return response;
        } catch (err) {
            return err.message;
        }
    }
}
module.exports = Chemicals;

