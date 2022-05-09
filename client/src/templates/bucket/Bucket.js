import { useState } from "react";
import { makeStyles, TextField, Button, Modal } from "@material-ui/core";
import { FileCopy } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  passLi: {
    position: "relative",
    float: "left",
    padding: "10px",
    margin: 10,
    borderBottom: "1px solid #555",
    background: "#eee",
    width: "45%",
    listStyle: "none",
  },
  modalPaper: {
    position: "absolute",
    width: "40%",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
  input: {
    marginBottom: theme.spacing(1),
    width: "90%",
  },
  label: {
    cursor: "pointer",
    border: "2px dashed #aaa",
    display: "flex",
    flexDirection: "column",
    alignitems: "center",
    justifyContent: "center",
    height: "140px",
    marginBottom: "1rem",
  },
  uploadPhoto: {
    opacity: 0,
    position: "absolute",
    zIndex: -1,
  },
  imgView: {
    width: "100%",
  },
  copyView: {
    height: 36,
    width: 36,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    background: "#fff",
    borderRadius: "50%",
    position: "absolute",
    top: "12px",
    right: "12px",
  },
}));

export default function Bucket() {
  const classes = useStyles();

  const [isAddActive, setAddActive] = useState(false);
  const [data, setData] = useState([
    "../logo.svg",
    "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg",
  ]);
  const [filteredData, setFilteredData] = useState([
    "../logo.svg",
    "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg",
  ]);

  // handle search
  const handleSearchResult = (text) => {
    const resultList = data.filter(
      (pass) => pass.toLowerCase().indexOf(text) > -1
    );
    setFilteredData(resultList);
  };

  // handle add new
  const handleAddNew = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="uploader-component">
      <div className="search-container">
        <div className="searchbar">
          <TextField
            variant="outlined"
            type="text"
            placeholder="Search platform..."
            size="small"
            onChange={(e) => handleSearchResult(e.target.value)}
          />
          <Button
            style={{ marginLeft: "auto" }}
            variant="contained"
            color="primary"
            size="medium"
            onClick={() => {
              setAddActive(true);
            }}
          >
            Add New
          </Button>
        </div>
      </div>

      <Modal open={isAddActive} onClose={() => setAddActive(false)}>
        <div className={`add-new-container ${classes.modalPaper}`}>
          <div className="add-new">
            <form onSubmit={handleAddNew} noValidate autoComplete="off">
              <label className={classes.label} for="upload-photo">
                <h2>Drag and Drop</h2>
              </label>
              <input
                type="file"
                accept="images/*"
                name="photo"
                className={classes.uploadPhoto}
                id="upload-photo"
              />
              <TextField
                name="url"
                variant="outlined"
                className={classes.input}
                type="text"
                placeholder="Alternative Text"
                size="small"
              />
              <Button
                variant="contained"
                color="primary"
                size="small"
                type="submit"
              >
                Save
              </Button>
            </form>
          </div>
        </div>
      </Modal>

      <div className="search-results-container">
        <div className="search-results">
          <ul>
            {filteredData && filteredData.length > 0 ? (
              filteredData.map((pass) => (
                <li className={classes.passLi} key={pass._id}>
                  <div>
                    <img className={classes.imgView} src={pass} alt="cover" />
                  </div>
                  <div className={classes.copyView}>
                    <FileCopy fontSize="small" />
                  </div>
                </li>
              ))
            ) : (
              <div className="result_box">
                <div className="detail-item">
                  <span>No image found</span>
                </div>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
