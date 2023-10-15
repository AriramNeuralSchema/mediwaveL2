const db = require("../Config/connection");

const getCribesList = () => {
  return new Promise((resolve, reject) => {
    db.connect((err, conn) => {
      if (err) {
        reject(err);
      } else {
        let query = "select * from cribe_hound";
        conn.query(query, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      }
    });
  });
};

const addCribHound = (body) => {
  return new Promise((resolve, reject) => {
    const query =
      "insert into cribe_hound (name, location, image) values (?, ?, ?)";
    const values = [body.name, body.location, body.image];

    db.query(query, values, (err, res) => {
      if (err) {
        console.error(err);
        reject("err");
      } else {
        resolve("succ");
      }
    });
  });
};

const updateCribHound = (id, body) => {
  return new Promise((resolve, reject) => {
    const query =
      "update cribe_hound set name = ?, location = ?, image = ? where id = ?";
    const values = [body.name, body.location, body.image, id];

    db.query(query, values, (err, res) => {
      if (err) {
        console.error(err);
        reject("err");
      } else {
        resolve("succ");
      }
    });
  });
};

const deleteCribHound = (id) => {
  return new Promise((resolve, reject) => {
    const query = "delete from cribe_hound where id = ?";
    const values = [id];

    db.query(query, values, (err, res) => {
      if (err) {
        console.error(err);
        reject("err");
      } else {
        resolve("succ");
      }
    });
  });
};

const getCribsInfo = (id) => {
  return new Promise((resolve, reject) => {
    const query = "select * from cribe_hound WHERE id = ?";
    const values = [id];

    db.query(query, values, (err, res) => {
      if (err) {
        console.error(err);
        reject("err");
      } else {
        resolve(res);
      }
    });
  });
};

module.exports = {
  getCribesList,
  addCribHound,
  updateCribHound,
  deleteCribHound,
  getCribsInfo,
};
