/* eslint-disable no-undef */
describe("Testing Election Site", () => {
  beforeEach(() => {
    cy.session("Signup Session", () => {
      cy.visit("/signup");
      cy.visit("/login");
      // cy.get("input[name='firstName']").type('First');
      // cy.get("input[name='lastName']").type('last');
      cy.get("input[name='email']").type("org1@test.com");
      cy.get("input[name='password']").type("testpassword");
      cy.get("button[type='submit']").click();
      cy.location().should((loc) => {
        expect(loc.pathname).to.eq("/todos");
      });
    });
  });

  it("Create Todo", () => {
    const one_week_later = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    cy.visit("/todos");
    let prev_count;
    cy.get("h3[id='count-duelater']")
      .invoke("text")
      .then((text) => {
        prev_count = parseInt(text);
      });
    cy.get("input[name='title']").type("Get Minor Degree");
    cy.get("input[type='date']").type(one_week_later);
    cy.get("button[type='submit']").click();
    cy.contains("Get Minor Degree");
    cy.then(() => {
      cy.get("h3[id='count-duelater']").should("have.text", prev_count + 1);
    });
  });

  it("Create Past Todo", () => {
    const one_week_before = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    cy.visit("/todos");
    let prev_count;
    cy.get("h3[id='count-overdue']")
      .invoke("text")
      .then((text) => {
        prev_count = parseInt(text);
      });
    cy.get("input[name='title']").type("Start capstone project");
    cy.get("input[type='date']").type(one_week_before);
    cy.get("button[type='submit']").click();
    cy.contains("Start capstone project");
    cy.then(() => {
      cy.get("h3[id='count-overdue']").should("have.text", prev_count + 1);
    });
  });

  it("Create Today's Todo", () => {
    const today = new Date().toISOString().slice(0, 10);
    cy.visit("/todos");
    let prev_count;
    cy.get("h3[id='count-duetoday']")
      .invoke("text")
      .then((text) => {
        prev_count = parseInt(text);
      });
    cy.get("input[name='title']").type("Start capstone project");
    cy.get("input[type='date']").type(today);
    cy.get("button[type='submit']").click();
    cy.contains("Start capstone project");
    cy.then(() => {
      cy.get("h3[id='count-duetoday']").should("have.text", prev_count + 1);
    });
  });

  it("Mark Todo as completed", () => {
    cy.visit("/todos");
    let prev_count, prev_completed;
    cy.get("h3[id='count-overdue']")
      .invoke("text")
      .then((text) => {
        prev_count = parseInt(text);
      });
    cy.get("h3[id='count-completed']")
      .invoke("text")
      .then((text) => {
        prev_completed = parseInt(text);
      });
    cy.get("input[type='checkbox']").first().check();
    cy.then(() => {
      cy.get("h3[id='count-overdue']").should("have.text", prev_count - 1);
      cy.get("h3[id='count-completed']").should(
        "have.text",
        prev_completed + 1
      );
    });
  });

  it("Mark completed todo as incomplete", () => {
    cy.visit("/todos");
    let prev_count, prev_completed;
    cy.get("h3[id='count-overdue']")
      .invoke("text")
      .then((text) => {
        prev_count = parseInt(text);
      });
    cy.get("h3[id='count-completed']")
      .invoke("text")
      .then((text) => {
        prev_completed = parseInt(text);
      });
    cy.get("input[type='checkbox']").last().uncheck();
    cy.then(() => {
      cy.get("h3[id='count-overdue']").should("have.text", prev_count + 1);
      cy.get("h3[id='count-completed']").should(
        "have.text",
        prev_completed - 1
      );
    });
  });

  it("Delete a Todo", () => {
    const one_week_before = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    cy.visit("/todos");
    let prev_count;
    cy.get("h3[id='count-overdue']")
      .invoke("text")
      .then((text) => {
        prev_count = parseInt(text);
      });
    cy.get("input[name='title']").type("Start capstone project");
    cy.get("input[type='date']").type(one_week_before);
    cy.get("button[type='submit']").click();
    cy.contains("Start capstone project");
    cy.then(() => {
      cy.get("h3[id='count-overdue']").should("have.text", prev_count + 1);
    });
    cy.get("a[href='#']").first().click({ force: true });
    cy.then(() => {
      cy.get("h3[id='count-overdue']").should("have.text", prev_count);
    });
  });

  it("Signout", () => {
    cy.visit("todos");
    cy.get("a").contains("Signout").first().click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/");
    });
  });
});
