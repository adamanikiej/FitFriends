const mongoCollection = require('./config/mongoCollection');
const connection = require('./config/mongoConnection');
const bcrypt = require("bcryptjs");
const {v4: uuidv4} = require('uuid');

async function main() {
  console.log('seeding database');
  const db = await connection.dbConnection();
  await db.dropDatabase();

  const users = mongoCollection.users
  const userCollection = await users()
  const workouts = mongoCollection.workouts
  const workoutCollection = await workouts()
  const cards = mongoCollection.cards
  const cardCollection = await cards()
  const workoutLogs = mongoCollection.workoutLogs
  const workoutLogCollection = await workoutLogs()

  let MarcPwd = await bcrypt.hash("password", 10)
  let SarahPwd = await bcrypt.hash("password", 10)
  let MeganPwd = await bcrypt.hash("password", 10)

  // create users
  let marc = {
    _id: uuidv4(),
    userToken: "test",
    username: "marcMan34",
    email: "MarcMan34@gmail.com",
    hashedPassword: MarcPwd,
    firstName: "Marc",
    lastName: "Richards",
    birthDate: new Date(2000, 9, 8),
    weight: "180",
    height: "70",
    userMadeWorkouts: [],
    userLoggedWorkouts: []
  }
  await userCollection.insertOne(marc);

  let sarah = {
    _id: uuidv4(),
    userToken: "test",
    username: "sarahj1",
    email: "sarahj1@gmail.com",
    hashedPassword: SarahPwd,
    firstName: "Sarah",
    lastName: "Johnson",
    birthDate: new Date(2002, 1, 20),
    weight: "160",
    height: "64",
    userMadeWorkouts: [],
    userLoggedWorkouts: []
  }
  await userCollection.insertOne(sarah);

  let megan = {
    _id: uuidv4(),
    userToken: "test",
    username: "mdavis5",
    email: "Mdavis5@gmail.com",
    hashedPassword: MeganPwd,
    firstName: "Megan",
    lastName: "Davis",
    birthDate: new Date(2001, 6, 18),
    weight: "170",
    height: "67",
    userMadeWorkouts: [],
    userLoggedWorkouts: []
  }

  await userCollection.insertOne(megan);

  //create user workouts and cards
  let marcWorkout = {
    _id: uuidv4(),
    author: marc._id,
    workoutName: "Hard Back day",
    workoutLength: 60,
    workoutIntensity: "5",
    exercises: [
      {
        name: "T-Bar Rows",
        sets: [
          {
            repCount: "8",
            weight: 90
          },
          {
            repCount: "8",
            weight: 90
          },
          {
            repCount: "8",
            weight: 90
          },
          {
            repCount: "8",
            weight: 90
          }
        ]
      },
      {
        name: "Dumbbell Bent Over Rows",
        sets: [
          {
            repCount: "8",
            weight: 45
          },
          {
            repCount: "8",
            weight: 45
          },
          {
            repCount: "10",
            weight: 50
          },
          {
            repCount: "10",
            weight: 50
          }
        ]
      },
      {
        name: "Incline Dumbbell Bicep Curls",
        sets: [
          {
            repCount: "8",
            weight: 25
          },
          {
            repCount: "8",
            weight: 25
          },
          {
            repCount: "8",
            weight: 25
          },
          {
            repCount: "8",
            weight: 20
          }
        ]
      },
      {
        name: "Lat Pull-down",
        sets: [
          {
            repCount: "10",
            weight: 42.5
          },
          {
            repCount: "10",
            weight: 42.5
          },
          {
            repCount: "10",
            weight: 60
          },
          {
            repCount: "10",
            weight: 60
          }
        ]
      },
      {
        name: "Reverse Chest Flyes",
        sets: [
          {
            repCount: "10",
            weight: 40
          },
          {
            repCount: "10",
            weight: 40
          },
          {
            repCount: "10",
            weight: 55
          },
          {
            repCount: "10",
            weight: 55
          }
        ]
      },
    ]
  }
  await workoutCollection.insertOne(marcWorkout);
  let marcCard = {
    _id: uuidv4(),
    date: new Date(2023, 3, 20),
    text: "has created a workout!",
    user: {
      _id: marc._id,
      username: marc.username
    },
    cardType: "workout",
    cardContent: marcWorkout,
    likes: 4,
    comments: []
  }
  await cardCollection.insertOne(marcCard);

  let sarahWorkoutLog = {
    _id: uuidv4(),
    author: sarah._id,
    workoutName: "My Monday Leg Day",
    workoutDate: new Date(4, 19, 2023),
    workoutLength: 75,
    workoutIntensity: "4",
    exercises: [
      {
        name: "Squat",
        sets: [
          {
            repCount: "8",
            weight: 135
          },
          {
            repCount: "8",
            weight: 135
          },
          {
            repCount: "8",
            weight: 135
          },
          {
            repCount: "8",
            weight: 135
          }
        ]
      },
      {
        name: "Dumbbell Lunges",
        sets: [
          {
            repCount: "8",
            weight: 45
          },
          {
            repCount: "8",
            weight: 45
          },
          {
            repCount: "10",
            weight: 50
          },
          {
            repCount: "10",
            weight: 50
          }
        ]
      },
      {
        name: "Goblet Squat",
        sets: [
          {
            repCount: "10",
            weight: 55
          },
          {
            repCount: "10",
            weight: 55
          },
          {
            repCount: "10",
            weight: 55
          },
          {
            repCount: "10",
            weight: 55
          }
        ]
      },
      {
        name: "Bulgarian Split Squat",
        sets: [
          {
            repCount: "10",
            weight: 40
          },
          {
            repCount: "10",
            weight: 40
          },
          {
            repCount: "8",
            weight: 40
          },
          {
            repCount: "8",
            weight: 40
          }
        ]
      },
      {
        name: "Leg Extensions",
        sets: [
          {
            repCount: "10",
            weight: 65
          },
          {
            repCount: "10",
            weight: 65
          },
          {
            repCount: "10",
            weight: 65
          },
          {
            repCount: "10",
            weight: 65
          }
        ]
      },
      {
        name: "Machine Hamstring Curl",
        sets: [
          {
            repCount: "10",
            weight: 40
          },
          {
            repCount: "10",
            weight: 40
          },
          {
            repCount: "10",
            weight: 40
          },
          {
            repCount: "10",
            weight: 40
          }
        ]
      },
    ]
  }
  await workoutLogCollection.insertOne(sarahWorkoutLog);
  let sarahCard = {
    _id: uuidv4(),
    date: new Date(2023, 3, 20),
    text: 'has logged a workout for April 20, 2023!',
    user: {
      _id: sarah._id,
      username: sarah.username
    },
    cardType: "workoutLog",
    cardContent: sarahWorkoutLog,
    likes: 2,
    comments: []
  }
  await cardCollection.insertOne(sarahCard);

  let meganWorkout = {
    _id: uuidv4(),
    author: marc._id,
    workoutName: "Push-P Push Day",
    workoutLength: 60,
    workoutIntensity: "2",
    exercises: [
      {
        name: "Barbell Bench Press",
        sets: [
          {
            repCount: "8",
            weight: 90
          },
          {
            repCount: "8",
            weight: 90
          },
          {
            repCount: "8",
            weight: 90
          },
          {
            repCount: "8",
            weight: 90
          }
        ]
      },
      {
        name: "Cable Overhead Tricep Extensions",
        sets: [
          {
            repCount: "8",
            weight: 45
          },
          {
            repCount: "8",
            weight: 45
          },
          {
            repCount: "10",
            weight: 50
          },
          {
            repCount: "10",
            weight: 50
          }
        ]
      },
      {
        name: "Machine Chest Flyes",
        sets: [
          {
            repCount: "8",
            weight: 25
          },
          {
            repCount: "8",
            weight: 25
          },
          {
            repCount: "8",
            weight: 25
          },
          {
            repCount: "8",
            weight: 20
          }
        ]
      },
      {
        name: "Chest Dips",
        sets: [
          {
            repCount: "10",
            weight: 42.5
          },
          {
            repCount: "10",
            weight: 42.5
          },
        ]
      },
      {
        name: "Dumbbell Lateral Raises",
        sets: [
          {
            repCount: "10",
            weight: 40
          },
          {
            repCount: "10",
            weight: 40
          },
          {
            repCount: "10",
            weight: 55
          },
          {
            repCount: "10",
            weight: 55
          }
        ]
      },
    ]
  }
  await workoutCollection.insertOne(meganWorkout);
  let meganCard = {
    _id: uuidv4(),
    date: new Date(2023, 3, 10),
    text: "has created a workout!",
    user: {
      _id: megan._id,
      username: megan.username
    },
    cardType: "workout",
    cardContent: meganWorkout,
    likes: 12,
    comments: []
  }
  await cardCollection.insertOne(meganCard);

  await connection.closeConnection();
  console.log('seeding done!')
}

main()