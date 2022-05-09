import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import clsx from "clsx";
import {
  CircularProgress,
  Card,
  CardHeader,
  CardContent,
  Collapse,
  Typography,
  IconButton,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";

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

export default function DocContainer(props) {
  const classes = useStyles();

  const { docid, query, hashtags, definition } = props.doc;
  const email = props.email;
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState("");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const deleteDoc = async (docid) => {
    setLoading("deleteIcon");
    const deleteResp = await axios.put("/docs/delete", { docid });
    if (deleteResp.data.deleted) {
      props.returnDocId(docid);
    }
    setLoading("");
  };

  return (
    <li className={classes.docCont}>
      <Card
        style={{ backgroundColor: "transparent" }}
        className={clsx(classes.expand, {
          [classes.expandOpen]: expanded,
        })}
        onClick={handleExpandClick}
        aria-expanded={expanded}
      >
        <CardHeader
          action={
            <IconButton aria-label="settings" style={{ zIndex: 100 }}>
              {loading === "deleteIcon" ? (
                <CircularProgress size={25} color="#fff" />
              ) : email === "krtyagikr@gmail.com" ? (
                <DeleteIcon onClick={() => deleteDoc(docid)} />
              ) : (
                <ExpandMoreIcon />
              )}
            </IconButton>
          }
          style={{ backgroundColor: "#0066cc" }}
          title={query}
          subheader={hashtags.split(",").map((hashtag) => (
            <Typography
              variant="body2"
              color="textSecondary"
              component="span"
              style={{
                backgroundColor: "#0B4F93",
                width: "min-content",
                borderRadius: "10px",
                marginInline: "5px",
                paddingBlock: "3px",
                paddingInline: "10px",
              }}
            >
              {hashtag}
            </Typography>
          ))}
        />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent
            style={{
              background: "#0066CCaa",
              cursor: "auto",
              borderRadius: "15px",
            }}
          >
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{
                borderRadius: "6px",
              }}
            >
              {definition}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </li>
  );
}
