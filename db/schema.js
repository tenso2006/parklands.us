var Sequelize = require('sequelize');
var cfg = require('./dbConfig.js');

var sequelize = new Sequelize(cfg.myLocalDB, cfg.myLocalDBRole, cfg.myLocalDBPW, {
  // LIVE FIXME: switch comment out on 6 and 7
  // host: 'parklands-deploy.cb7jjlsrmerv.us-west-1.rds.amazonaws.com',
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

sequelize
  .authenticate()
  .then(function (err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database', err);
  });


  /*** Define Models **/
  var ParkComments = sequelize.define('parkcomment', {
    text: {
      type: Sequelize.TEXT
    },
    userEmail: {
      type: Sequelize.STRING
    },
    firstName: {
      type:Sequelize.STRING
    },
    parkId: {
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER
    }
  });

  var ParkPhotos = sequelize.define('parkphoto', {
    photoUrl: {
      type: Sequelize.STRING,
    },
    parkId: {
      type: Sequelize.INTEGER
    },

  });

  var Parks = sequelize.define('park', {
    name: {
      type: Sequelize.STRING
    },
    rating: {
      type: Sequelize.REAL,
      defaultValue: 0
    },
    hero: {
      type: Sequelize.STRING
    },
    photo: {
      type: Sequelize.STRING
    },
    info: {
      type: Sequelize.TEXT
    },
    long: {
      type: Sequelize.REAL
    },
    lat: {
      type: Sequelize.REAL
    },
    hours: {
      type: Sequelize.TEXT
    },
    location: {
      type: Sequelize.TEXT
    },
    contact: {
      type: Sequelize.TEXT
    },
  });

  var PostComments = sequelize.define('postcomment', {
    text: {
      type: Sequelize.TEXT
    },
    userId: {
      type: Sequelize.INTEGER
    },
    postId: {
      type: Sequelize.INTEGER
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: sequelize.fn('NOW'),
      allowNull: false
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: sequelize.fn('NOW'),
      allowNull: false
    }
  });

  var Posts = sequelize.define('post', {
    type: {
      type: Sequelize.STRING
    },
    voteCount: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    filePath: {
      type: Sequelize.STRING
    },
    userId: {
      type: Sequelize.INTEGER
    },
    parkId: {
      type: Sequelize.INTEGER
    },
    description: {
      type: Sequelize.STRING
    },
    firstName: {
      type: Sequelize.STRING
    }
  });

  var Ratings = sequelize.define('rating', {
    ratingVal: {
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER
    },
    parkId: {
      type: Sequelize.INTEGER
    }
  });

  var UserParks = sequelize.define('userpark', {
    userId: {
      type: Sequelize.INTEGER
    },
    parkId: {
      type: Sequelize.INTEGER
    }
  });

  var Users = sequelize.define('user', {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    password: {
      type: Sequelize.STRING
    }
  });

  var Votes = sequelize.define('vote', {
    userId: {
      type: Sequelize.INTEGER
    },
    postId: {
      type: Sequelize.INTEGER
    }
  });


  // Sync database with defined schema
  sequelize.sync()
  .then(function() {
    /** Define Model Associations **/
    sequelize.Promise.all([
      Users.hasMany(Votes),
      Users.hasMany(Ratings),
      Users.hasMany(ParkComments),
      Users.hasMany(UserParks),
      Users.hasMany(PostComments),
      Users.hasMany(Posts),

      Posts.hasMany(Votes),
      Posts.hasMany(PostComments),

      Parks.hasMany(UserParks),
      Parks.hasMany(ParkPhotos),
      Parks.hasMany(Posts),
      Parks.hasMany(Ratings),
      Parks.hasMany(ParkComments)
    ])
    .then(function(results) {
    });
  });

module.exports = sequelize;
