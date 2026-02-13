import { useState } from "react";
import { createProgramManager } from "./aleo";

function App() {
  const [privateKey, setPrivateKey] = useState("");
  const [txId, setTxId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleExecute = async () => {
    try {
      setLoading(true);

      const programManager = createProgramManager(privateKey);

      const transactionId = await programManager.execute({
        programName: "your_program.aleo",
        functionName: "your_function_name",
        inputs: ["5u64"], // Example input
        fee: 0.1,
      });

      setTxId(transactionId);
    } catch (err) {
      console.error(err);
      alert("Execution failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Aleo Simple dApp</h1>

      <input
        type="text"
        placeholder="Enter Private Key (Testnet)"
        value={privateKey}
        onChange={(e) => setPrivateKey(e.target.value)}
        style={{ width: 400 }}
      />

      <br />
      <br />

      <button onClick={handleExecute} disabled={loading}>
        {loading ? "Executing..." : "Execute Program"}
      </button>

      {txId && (
        <div style={{ marginTop: 20 }}>
          <strong>Transaction ID:</strong>
          <p>{txId}</p>
        </div>
      )}
    </div>
  );
}

export default App;
