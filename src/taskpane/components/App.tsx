import React from "react";
import Header from "./Header";
import { makeStyles } from "@fluentui/react-components";

interface AppProps {
  title: string;
}

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
  textarea: {
    width: "90%",
    height: "250px",
    margin: "20px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },
});

const App: React.FC<AppProps> = (props: AppProps) => {
  const styles = useStyles();
  const [prompt, setPrompt] = React.useState("");
  const [slideCount, setSlideCount] = React.useState(5);
  const [output, setOutput] = React.useState("");

  const handleGenerate = async() => {
     try {
      setOutput("Generating slides…");

    const response = await fetch("http://localhost:5000/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic: prompt,
        numSlides: slideCount,
      }),
    });

    const data = await response.json();

    setOutput(JSON.stringify(data.slides, null, 2)); // temporary view
  } catch (error) {
    setOutput("Error generating slides");
  }
};

  return (
    <div className={styles.root}>
      <Header logo="assets/logo-filled.png" title={props.title} message="Welcome" />

      <div style={{ padding: "10px" }}>

        {/* Prompt textarea */}
        <textarea
          placeholder="Type your topic or prompt here..."
          className={styles.textarea}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        {/* Slide count selector */}
        <div style={{ margin: "0 20px 20px 20px" }}>
          <label style={{ fontSize: "14px", marginRight: "10px" }}>
            Number of slides:
          </label>

          <select
            value={slideCount}
            onChange={(e) => setSlideCount(Number(e.target.value))}
            style={{
              padding: "6px 10px",
              fontSize: "14px",
              borderRadius: "4px",
              border: "1px solid #aaa",
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={25}>25</option>
          </select>
        </div>

        {/* Generate button */}
        <div style={{ marginLeft: "20px", marginBottom: "20px" }}>
          <button
            onClick={handleGenerate}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              borderRadius: "4px",
              cursor: "pointer",
              backgroundColor: "#0078d4",
              color: "#fff",
              border: "none",
            }}
          >
            Generate Slides
          </button>
          

        </div>

        
      </div>
    </div>
  );
};

export default App;
