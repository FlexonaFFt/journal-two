const fs = require("fs");

class Database {
  constructor(filename) {
    this.filename = filename;
    this.data = this.loadData();
  }

  loadData() {
    try {
      return JSON.parse(fs.readFileSync(this.filename, "utf8"));
    } catch (err) {
      if (err.code === "ENOENT") {
        fs.writeFileSync(this.filename, "[]", "utf8");
        return [];
      } else {
        throw err;
      }
    }
  }

  save() {
    fs.writeFileSync(this.filename, JSON.stringify(this.data, null, 2), "utf8");
  }

  insert(item) {
    this.data.push(item);
    this.save();
  }

  find(query) {
    return this.data.filter((item) => {
      for (let key in query) {
        if (item[key] !== query[key]) return false;
      }
      return true;
    });
  }
}

module.exports = Database;
