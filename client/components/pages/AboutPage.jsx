import React from "react";
import "../../Styles.css";

export function AboutPage() {
  return (
    <div className="about-page">
      <h2>About Chatroom</h2>
      <div className="line"></div>
      <p>
        Welcome to Chatroom! Here's a brief of some the possible features in this Application. Just to get you started.
      </p>
      <div className="spacer"></div>
      <div className="feature">
        <h3>Secure platform</h3>
        <p>
            All features are exclusively for users that are logged in. Anonymous users can't navigate further than login.
        </p>
      </div>
      <div className="spacer"></div>
      <div className="feature">
        <h3>Login alternatives</h3>
        <p>
            All users can log in with Google and Microsoft in a seamless fashion.
        </p>
      </div>
      <div className="spacer"></div>
      <div className="feature">
        <h3>Creating Chatrooms</h3>
        <p>
            Microsoft users has an extra benefit of creating chatrooms! Users can also edit and delete their own, and only, chatrooms.
        </p>
      </div>
      <div className="spacer"></div>
      <div className="feature">
        <h3>Your own profile</h3>
        <p>
            All users logged in will have their own user profile with information predefined from the OPEN/ENTRA ID.
            Custom name and biography are available if you want to display yourself in another fashion.
        </p>
      </div>
      <div className="spacer"></div>
      <div className="feature">
        <h3>Chat endlessly in realtime</h3>
        <p>
            All logged in users can join chatrooms and communicate with multiple users from different places, realtime!
            Displayed with either your profilename or custom name, with timestamps.
        </p>
      </div>
      <div className="spacer"></div>
      <div className="feature">
        <h3>All chatrooms are unique</h3>
        <p>
            We don't like redundancy, therefore - no duplicate chatrooms.
        </p>
      </div>
      <div className="spacer"></div>
      <div className="feature">
        <h3>Get to know our chatters!</h3>
        <p>
            Chatroom is a social platform, get to know who's taking part of this event!
            Navigate to the People tab and explore others like urself!
        </p>
      </div>
      <div className="spacer"></div>
      <div className="feature">
        <h3>What happens if you suddenly hit F5?</h3>
        <p>
            Don't worry, you will still be logged in.
        </p>
      </div>
      <div className="spacer"></div>
      <div className="line"></div>
      <div className="feature">
        <h4>At last, thank you for taking your time. <br></br>Wish you a great experience.</h4>
      </div>
    </div>
  );
}
