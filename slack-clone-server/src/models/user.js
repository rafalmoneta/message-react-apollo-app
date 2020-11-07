import bcrypt from 'bcrypt';


const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        isAlphanumeric: {
          args: true,
          msg: "The username can only contain letters and numbers",
        },
        len: {
          args: [3, 25],
          msg: "The username needs to be between 3 and 25 characters long",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: {
          args: true,
          msg: "Invalid email",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: {
          args: [5, 100],
          msg: "The password needs to be between 5 and 100 characters long",
        },
      },
    },
  },
  {
    hooks: {
      afterValidate: async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 12);
        user.password = hashedPassword;
      },
    },
  },
  );
 
  User.associate = models => {
    User.belongsToMany(models.Team, {
      through: models.Member,
      foreignKey: {
        name: 'userId',
        field: 'user_id',
      },
    });
  };
 
  // User.findByLogin = async login => {
  //   let user = await User.findOne({
  //     where: { username: login },
  //   });
 
  //   if (!user) {
  //     user = await User.findOne({
  //       where: { email: login },
  //     });
  //   }
 
  //   return user;
  // };

  // User.beforeCreate(async user => {
  //   user.password = await user.generatePasswordHash();
  // });
 
  // User.prototype.generatePasswordHash = async function() {
  //   const saltRounds = 10;
  //   return await bcrypt.hash(this.password, saltRounds);
  // };

  // User.prototype.validatePassword = async function(password) {
  //   return await bcrypt.compare(password, this.password);
  // };
 
  return User;
};
 
export default user;