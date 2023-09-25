import "./App.css";

import { invoke } from "@tauri-apps/api/tauri";
import { useState } from "react";

function App() {
  const [comparedContent, setComparedContent] = useState("");
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");

  async function compareContents() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setComparedContent(await invoke("compare_contents", { left, right }));
  }

  return (
    <div>
      <div className="px-10 pt-10">
        <div className="flex justify-between align-middle items-center">
          <input className="mb-3 w-full" type="file" onChange={(e) => {
            let file = e?.target?.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (e) => setLeft(e?.target?.result as string);
              reader.readAsText(file);
            }
          }} />

          <input className="mb-3 w-full" type="file" onChange={(e) => {
            let file = e?.target?.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (e) => setRight(e?.target?.result as string);
              reader.readAsText(file);
            }
          }} />
        </div>

        <button className="mb-5 w-full ring-1 ring-zinc-200 py-3 rounded-lg" onClick={compareContents}>Compare</button>

        {
          comparedContent &&
          <pre className="bg-zinc-200 p-2 rounded-lg w-full">
            <code>{comparedContent}</code>
          </pre> || <p className="text-center font-light">Upload files to compare between both!</p>
        }

      </div>
    </div>
  );
}

export default App;
