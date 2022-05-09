import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";

export default function AddDocDialog(props) {
  const [formInput, setFormInput] = useState({});
  const [loading, setLoading] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    setLoading("saveButton");
    const resp = await axios.post("/docs/add", formInput);
    if (resp.data.added) props.dataExchange(resp.data.docData);
    setLoading("");
  };

  return (
    <div>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Enter Query"
          type="text"
          name="query"
          value={formInput.query}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="atleast 3 hastags (comma ',' separated)"
          type="text"
          name="hashtags"
          value={formInput.hashtags}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          style={{ marginBlock: 30, color: "#fff" }}
          id="outlined-textarea"
          label="Multiline Placeholder"
          placeholder="Enter Definition"
          multiline
          variant="outlined"
          name="definition"
          value={formInput.definition}
          onChange={handleInputChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="primary" type="submit">
          {loading === "saveButton" ? (
            <CircularProgress size={25} color="#fff" />
          ) : (
            "Save"
          )}
        </Button>
      </DialogActions>
    </div>
  );
}
