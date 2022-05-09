import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  CircularProgress,
  CardContent,
  Tooltip,
  Fab,
  Dialog,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import AddDocDialog from "./addCred";
import DocContainer from "./docsList";
import "./docs.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  docCont: {
    display: "flex",
    justifyContent: "center",
    background: "transparent",
    cursor: "pointer",
    margin: "10px",
  },
  expand: {
    width: "80%",
  },
}));

export default function Docs(props) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [openAddDocDialog, setAddDocDialogOpen] = useState(false);
  const [docsList, setDocsList] = useState([]);
  const [filteredDocsList, setFilteredDocsList] = useState([]);
  const [loading, setLoading] = useState("");
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const loginResp = await axios.get("/auth/login");
      if (loginResp.data && !loginResp.data.loggedin) {
        history.replace("/login");
      } else {
        setEmail(loginResp.data.userdata.email);
      }

      setLoading("loadData");
      const resp = await axios.get("/docs/list");
      setDocsList(resp.data ? resp.data : []);
      setFilteredDocsList(resp.data ? resp.data : []);
      setLoading("");
    })();
  }, [props, history]);

  // handle search
  const handleSearchResult = (text) => {
    const resultList = docsList.filter(
      (doc) => doc.hashtags.toLowerCase().indexOf(text) > -1
    );
    setFilteredDocsList(resultList);
  };

  const handleAddDocClickOpen = () => {
    setAddDocDialogOpen(true);
  };
  const handleAddDocClose = () => {
    setAddDocDialogOpen(false);
  };

  const dataExchangeFn = (data) => {
    setFilteredDocsList((docs) => [...docs, data]);
    setAddDocDialogOpen(false);
  };

  const exchangeDocIdFn = (docid) => {
    const filterList = filteredDocsList.filter((doc) => doc.docid !== docid);
    setFilteredDocsList(filterList);
  };

  return (
    <div>
      <div className={classes.docCont}>
        <input
          id="standard-search"
          placeholder="Search"
          label="Search field"
          type="search"
          style={{
            borderColor: "#183D5Ddd",
            borderRadius: "19px",
            margin: "10px",
            paddingBlock: "10px",
            paddingInline: "50px",
            color: "#183D5D",
          }}
          onChange={(e) => handleSearchResult(e.target.value)}
        />
        <Tooltip title="Add Doc" aria-label="add">
          <Fab
            color="primary"
            className={classes.fab}
            onClick={handleAddDocClickOpen}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </div>
      {filteredDocsList && filteredDocsList.length > 0 ? (
        filteredDocsList.map((doc) => (
          <DocContainer doc={doc} email={email} returnDocId={exchangeDocIdFn} />
        ))
      ) : (
        <CardContent>
          <h1
            style={{
              background: "#0066CC",
              cursor: "auto",
              borderRadius: "15px",
              display: "flex",
              justifyContent: "center",
              color: "#fff",
            }}
          >
            {loading === "loadData" ? (
              <CircularProgress color="#fff" />
            ) : (
              "No doc found"
            )}
          </h1>
        </CardContent>
      )}
      <Dialog
        open={openAddDocDialog}
        maxWidth={"lg"}
        fullWidth={true}
        onClose={handleAddDocClose}
        aria-labelledby="form-dialog-title"
      >
        <AddDocDialog dataExchange={dataExchangeFn} />
      </Dialog>
    </div>
  );
}
