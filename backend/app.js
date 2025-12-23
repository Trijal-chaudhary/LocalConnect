require("dotenv").config();
const express = require('express');
const { default: mongoose } = require('mongoose');
const cors = require('cors')
const { Server } = require('socket.io')
const http = require('http')

const DB_URL = process.env.DB_URL;

const { postSignUpprovRouter, postLogInProviderRouter, postIsLoggedRouter, postLogOutRouter, postVerfyOtpRouter, postCompleteProviderRouter, postPreviousClientProviderRouter } = require('./Router/providerRouter');
const session = require('express-session');
const { getLogInAdminRouter, postIsloggedAdminRouter, postLogOutAdminRouter, getPendingProfilesRouter, postProvederDetailsAdminRouter, postRejectedRouter, postApprovedRouter, getRejectedProfilesRouter, getApprovedProfilesRouter } = require('./Router/adminRouter');
const { postProviderDetailsClientRouter, postSignUpClientRouter, postLogInClientRouter, postIsLoggedClientRouter, postLogOutClientRouter, postBookClientRouter, postCompletedWorkClientRouter, postPreviousProviderRouter, postReviewRouter, postSearchRouter, postClientVerificationRouter, postClientResetRouter, postOTPPasswordResetRouter, postCreatePasswordRouter } = require('./Router/clientRouter');
const app = express();
app.set("trust proxy", 1);

const MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
  uri: DB_URL,
  collection: "session"
})
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://192.168.0.105:5173", "https://localconnect-p703.onrender.com"],
    methods: ["GET", "POST"],
    credentials: true
  }
})

io.on('connection', (socket) => {
  socket.on("JOIN", (data) => {
    socket.join(data.id)
  })
  socket.on("MESSAGE", (data) => {
    if (data.id) {
      console.log(data.id);
      io.to(data.id).emit("RECEVED", { data })
    }

  })
  // socket.on("MESSAGEPR", (data) => {
  //   socket.join(data.id);
  //   console.log(data)

  // })
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://192.168.0.105:5173", "https://localconnect-p703.onrender.com"], // 👈 your React frontend URL
  credentials: true // 👈 allow sending cookies across origins
}))
app.use(session({
  name: "localconnect.sid",
  secret: "HVC",
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    httpOnly: true,
    secure: true,          // false because you're using http://
    sameSite: "none",        // ✅ works well on same-network, avoids "None" issue
    maxAge: 1000 * 60 * 60 * 5
  }
}))

app.use('/api/provider/signup', postSignUpprovRouter);
app.use('/api/provider/login', postLogInProviderRouter);
app.use('/api/provider/islogged', postIsLoggedRouter);
app.use('/api/provider/logout', postLogOutRouter);
app.use("/api/admin/login", getLogInAdminRouter);
app.use('/api/admin/islogged', postIsloggedAdminRouter);
app.use("/api/admin/logout", postLogOutAdminRouter);
app.use("/api/admin/pendingDetails", getPendingProfilesRouter)
app.use("/api/admin/ProviderDetails", postProvederDetailsAdminRouter);
app.use('/api/provider/otpverification', postVerfyOtpRouter)
app.use('/api/provider/complete', postCompleteProviderRouter)
app.use('/api/provider/previousClient', postPreviousClientProviderRouter)
app.use('/api/admin/rejected', postRejectedRouter);
app.use('/api/admin/approved', postApprovedRouter)
app.use('/api/admin/rejectedDetails', getRejectedProfilesRouter)
app.use('/api/admin/approvedDetails', getApprovedProfilesRouter)
app.use('/api/client/providerDetails', postProviderDetailsClientRouter);
app.use('/api/client/signup', postSignUpClientRouter);
app.use('/api/client/login', postLogInClientRouter);
app.use('/api/client/isLogged', postIsLoggedClientRouter);
app.use('/api/client/logout', postLogOutClientRouter)
app.use('/api/client/book', postBookClientRouter)
app.use('/api/client/completed', postCompletedWorkClientRouter);
app.use('/api/client/previousProvider', postPreviousProviderRouter);
app.use('/api/client/review', postReviewRouter);
app.use('/api/client/search', postSearchRouter)
app.use('/api/client/verification', postClientVerificationRouter);
app.use('/api/client/usernameReset', postClientResetRouter)
app.use('/api/client/OTPReset', postOTPPasswordResetRouter)
app.use('/api/client/newPassword', postCreatePasswordRouter)
const PORT = process.env.PORT || 3000;
mongoose.connect(DB_URL).then(() => {
  console.log("mongoose conected")
  server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
  })
})
