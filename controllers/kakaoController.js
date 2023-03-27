const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;

passport.use(
  "kakao-login",
  new KakaoStrategy(
    {
      clientID: process.env.KAKAO_ID,
      callbackURL: process.env.KAKAO_REDIRECT_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(accessToken);
      console.log(profile);
    }
  )
);
