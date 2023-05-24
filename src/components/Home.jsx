import { Button, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import TriviaGame from "./TriviaGame";

import ErrorMessage from "./ErrorMessage";
import Categories from "../utils/Categories";
import styles from './Home.module.css'

const Home = () => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(3);
  const [difficulty, setDifficulty] = useState("");
  const [error, setError] = useState(false);
  const [start, setStart] = useState(false);

  const handleSubmit = () => {
    if (amount < 1 || !amount || !category || !difficulty) {
      setError(true);
      return;
    } else {
      setStart(true);
      setError(false);
    }
  };

  return (
    <div className={styles["content"]}>
      <div className={styles["settings"]}>
        <span style={{ fontSize: 25 }}>Quiz Settings</span>
        <div className={styles["settings__select"]}>
          {error && <ErrorMessage>Please fill all fields</ErrorMessage>}
          <TextField
            disabled={start}
            select
            label="Select Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            variant="outlined"
            style={{ marginBottom: 30 }}
          >
            {Categories.map((cat) => (
              <MenuItem key={cat.category} value={cat.value}>
                {cat.category}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Select Difficulty"
            disabled={start}
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            variant="outlined"
            style={{ marginBottom: 30 }}
          >
            <MenuItem key="Easy" value="easy">
              Easy
            </MenuItem>
            <MenuItem key="Medium" value="medium">
              Medium
            </MenuItem>
            <MenuItem key="Hard" value="hard">
              Hard
            </MenuItem>
          </TextField>
          <TextField
            id="outlined-number"
            label="Enter number of questions"
            variant="outlined"
            type="number"
            inputProps={{min:1}}
            value={amount}
            disabled={start}
            style={{ marginBottom: 30 }}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
            disabled={start}
          >
            Start Quiz
          </Button>
        </div>
      </div>
      {start && <TriviaGame start={start} setStart={setStart} amount={amount} category={category} difficulty={difficulty}/>}
    </div>
  );
};

export default Home;
