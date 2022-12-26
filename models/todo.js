// models/todo.js
"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
      Todo.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }

    static async addTodo(params) {
      return await Todo.create(params);
    }

    static getTodos() {
      return this.findAll();
    }

    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      // FILL IN HERE
      let overdueTodos = await Todo.overdue();
      let overdueStr = await overdueTodos
        .map((todo) => todo.displayableString())
        .join("\n");
      console.log(overdueStr);
      console.log("\n");

      console.log("Due Today");
      // FILL IN HERE
      let dueTodayTodos = await Todo.dueToday();
      let dueTodayStr = await dueTodayTodos
        .map((todo) => todo.displayableString())
        .join("\n");
      console.log(dueTodayStr);
      console.log("\n");

      console.log("Due Later");
      // FILL IN HERE
      let dueLaterTodos = await Todo.dueLater();
      let dueLaterStr = await dueLaterTodos
        .map((todo) => todo.displayableString())
        .join("\n");
      console.log(dueLaterStr);
    }

    static async overdue() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      let today = new Date().toLocaleDateString("en-CA");
      const overdueTodos = await Todo.findAll({
        where: {
          dueDate: {
            [Op.lt]: today,
          },
        },
        order: [["id", "ASC"]],
      });
      return overdueTodos;
    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY
      let today = new Date().toLocaleDateString("en-CA");
      const dueTodayTodos = await Todo.findAll({
        where: {
          dueDate: today,
        },
        order: [["id", "ASC"]],
      });
      return dueTodayTodos;
    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      let today = new Date().toLocaleDateString("en-CA");
      const dueLaterTodos = await Todo.findAll({
        where: {
          dueDate: {
            [Op.gt]: today,
          },
        },
        order: [["id", "ASC"]],
      });
      return dueLaterTodos;
    }

    markAsCompleted() {
      // FILL IN HERE TO MARK AN ITEM AS COMPLETE
      return Todo.update(
        { completed: true },
        {
          where: {
            id: this.id,
          },
        }
      );
    }

    setCompletionStatus(checkStatus) {
      return Todo.update(
        { completed: checkStatus },
        {
          where: {
            id: this.id,
          },
        }
      );
    }

    static async remove(id) {
      return this.destroy({
        where: {
          id,
        },
      });
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      let today = new Date().toLocaleDateString("en-CA");
      let printDate = this.dueDate == today ? "" : this.dueDate;
      return `${this.id}. ${checkbox} ${this.title} ${printDate}`.trim();
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
