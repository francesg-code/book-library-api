const { Reader } = require("../src/models");
const { expect } = require("chai");
const request = require("supertest");
const app = require("../src/app");

describe("/readers", () => {
  before(async () => {
    try {
      await Reader.sequelize.sync();
    } catch (err) {
      console.log(err);
    }
  });

  beforeEach(async () => {
    try {
      await Reader.destroy({ where: {} });
    } catch (err) {
      console.log(err);
    }
  });
describe("POST /readers", async () => {
  it("creates a new reader in the database", async () => {
    const response = await request(app).post("/readers").send({
      name: "Mia Corvere",
      email: "mia@redchurch.com",
    });

    await expect(response.status).to.equal(201);
    expect(response.body.name).to.equal("Mia Corvere");
    expect(response.body.email).to.equal("mia@redchurch.com");

    const newReaderRecord = await Reader.findByPk(response.body.id, {
      raw: true,
    });
    expect(newReaderRecord.name).to.equal("Mia Corvere");
    expect(newReaderRecord.email).to.equal("mia@redchurch.com");
  });
});

describe("with readers in the database", () => {
  let readers;
  beforeEach((done) => {
    Promise.all([
      Reader.create({ name: "Mia Corvere", email: "mia@redchurch.com" }),
      Reader.create({ name: "Bilbo Baggins", email: "bilbo@bagend.com" }),
      Reader.create({ name: "Rand al'Thor", email: "rand@tworivers.com" }),
    ]).then((documents) => {
      readers = documents;
      done();
    });
  });

  describe("GET /readers", () => {
    it("gets all reader records", (done) => {
      request(app)
        .get("/readers")
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body.length).to.equal(3);
          res.body.forEach((reader) => {
            const expected = readers.find((a) => a.id === reader.id);
            expect(reader.name).to.equal(expected.name);
            expect(reader.email).to.equal(expected.email);
          });
          done();
        })
        .catch((error) => done(error));
    });
  });
});
});


