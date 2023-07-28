module.exports = (sequelize, Sequelize) => {
    const contactModel = sequelize.define("contact", {
     contact_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
      phone_number: {
        type: Sequelize.STRING,
        allowNull:true
      },
      email: {
        type: Sequelize.STRING,
        allowNull:true
      },
      linked_id: {
        type: Sequelize.INTEGER,
        allowNull:true,
      },
      link_precedence:{
        type: Sequelize.STRING,
        enum: ["primary","secondry"],
        defaultValue:"primary"
      },
      deleted_at:{
        type: Sequelize.DATE,
        defaultValue: null,
      }
    },{
        timestamps: true,
        freezeTableName: true,
        tableName: 'contact'
    });
  
    return contactModel;
  };
  