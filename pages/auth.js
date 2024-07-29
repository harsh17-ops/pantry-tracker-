import { useState } from "react";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Box, TextField, Button, Typography } from "@mui/material";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      console.error("Error signing in: ", err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h4">{isRegistering ? "Register" : "Login"}</Typography>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        required
        sx={{ mt: 2 }}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        required
        sx={{ mt: 2 }}
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        {isRegistering ? "Register" : "Login"}
      </Button>
      <Button onClick={() => setIsRegistering(!isRegistering)} sx={{ mt: 2 }}>
        {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
      </Button>
    </Box>
  );
};

export default Auth;
