import { useEffect, useState } from "react";
import {
  Button,
  TextField,
  makeStyles,
  Modal,
  Tooltip,
  Fab,
  CircularProgress,
} from "@material-ui/core";
import {
  Visibility as VisibilityIcon,
  FileCopyOutlined as FileCopyOutlinedIcon,
  Add as AddIcon,
  FileCopy as FileCopyIcon,
} from "@material-ui/icons";
import axios from "axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  input: {
    marginBottom: theme.spacing(1),
    width: "90%",
  },
  docCont: {
    display: "flex",
    justifyContent: "center",
    background: "transparent",
    cursor: "pointer",
    margin: "10px",
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
}));

function Creds(props) {
  const classes = useStyles();
  const [passwordCopiedOf, setPassCopiedOf] = useState("");
  const [isAddActive, setAddActive] = useState(false);
  const [openPinModal, SetOpenPinModal] = useState(false);
  const [formInput, setFormInput] = useState({});
  const [passList, setPassList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [pin, setPin] = useState();
  const [passwordToShow, setPasswordToShow] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPassCopyModal, setPassCopyModal] = useState(false);
  const [loading, setLoading] = useState("");
  const [currPass, setCurrPass] = useState(null);

  const history = useHistory();

  useEffect(() => {
    (async () => {
      const loginResp = await axios.get("/auth/login");
      if (loginResp.data && !loginResp.data.loggedin) {
        history.replace("/login");
      }
      setLoading("passwordList");
      const passwordList = await axios.get("/pass/list");
      setPassList(passwordList.data ? passwordList.data : []);
      setFilteredList(passwordList.data ? passwordList.data : []);
      setLoading("");
    })();
  }, [props]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  const handleAddNewPassContatiner = async (e) => {
    e.preventDefault();
    const res = await axios.post("/pass/add", {
      formInput,
    });
    if (res.data.pass_container_added) {
      setPassList((prev_passList) => [
        ...prev_passList,
        res.data.containerData,
      ]);
      setFilteredList((prev_filteredList) => [
        ...prev_filteredList,
        res.data.containerData,
      ]);
    }
    setAddActive(false);
  };

  const showPasswordModal = async (password) => {
    SetOpenPinModal(true);
    setPasswordToShow(password);
  };

  const pinModalClose = () => {
    SetOpenPinModal(false);
    setShowPassword(false);
    setPasswordToShow("");
  };

  const closePassCopyModal = () => {
    setPassCopyModal(false);
  };

  const handleShowPass = async () => {
    const res = await axios.post("/pass/list", { pin });
    setShowPassword(res.data && res.data.valid_pin);
  };

  const checkPinSession = async (pass, id) => {
    setCurrPass(pass);
    // check for Pin Session
    const res = await axios.get("/pass/pin");
    if (res.data && res.data.is_session) {
      navigator.clipboard.writeText(pass);
      setPassCopyModal(false);
      setPassCopiedOf(id);
    } else {
      setPassCopyModal(true);
    }
  };

  // handle PinSession
  const handlePinSession = async () => {
    const res = await axios.post("/pass/pin", { pin });
    if (res.data && res.data.is_session) {
      navigator.clipboard.writeText(currPass);
      setPassCopyModal(false);
      setCurrPass(null);
    } else {
      setPassCopyModal(true);
      setCurrPass(null);
    }
  };

  // handle search
  const handleSearchResult = (text) => {
    const resultList = passList.filter(
      (pass) => pass.title.toLowerCase().indexOf(text) > -1
    );
    setFilteredList(resultList);
  };

  return (
    <>
      <div className="Home restpage">
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
              onClick={() => {
                setAddActive(true);
                setFormInput({});
              }}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        </div>
        <Modal open={isAddActive} onClose={() => setAddActive(false)}>
          <div className={`add-new-container ${classes.modalPaper}`}>
            <div className="add-new">
              <form
                onSubmit={handleAddNewPassContatiner}
                noValidate
                autoComplete="off"
              >
                <TextField
                  name="title"
                  value={formInput.title}
                  onChange={handleInputChange}
                  variant="outlined"
                  className={classes.input}
                  type="text"
                  placeholder="Company Name"
                  size="small"
                />
                <TextField
                  name="url"
                  value={formInput.url}
                  onChange={handleInputChange}
                  variant="outlined"
                  className={classes.input}
                  type="text"
                  placeholder="Url"
                  size="small"
                />
                <TextField
                  name="username"
                  value={formInput.username}
                  onChange={handleInputChange}
                  variant="outlined"
                  className={classes.input}
                  type="text"
                  placeholder="Username"
                  size="small"
                />
                <TextField
                  name="email"
                  value={formInput.email}
                  onChange={handleInputChange}
                  variant="outlined"
                  className={classes.input}
                  type="text"
                  placeholder="Email"
                  size="small"
                />
                <TextField
                  name="password"
                  value={formInput.password}
                  onChange={handleInputChange}
                  variant="outlined"
                  className={classes.input}
                  type="text"
                  placeholder="Password"
                  size="small"
                />
                <TextField
                  name="note"
                  value={formInput.note}
                  onChange={handleInputChange}
                  variant="outlined"
                  className={classes.input}
                  type="text"
                  placeholder="Note"
                  size="large"
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
              {filteredList && filteredList.length > 0 ? (
                filteredList.map((pass) => (
                  <li className={classes.passLi} key={pass._id}>
                    <div className="detail-item">
                      <span>TItle : </span>
                      <span>{pass.title}</span>
                    </div>
                    <div className="detail-item">
                      <span>url : </span>
                      <span>
                        <a target="_blank" href={pass.url} rel="noreferrer">
                          {pass.url}
                        </a>
                      </span>
                    </div>
                    <div className="detail-item">
                      <span>Username : </span>
                      <span>{pass.username}</span>
                    </div>
                    <div className="detail-item">
                      <span>Email : </span>
                      <span>{pass.email}</span>
                    </div>
                    <div className="detail-item" id="pass-view">
                      <span>Password : </span>
                      <span>
                        {/* <input style={{ width: 'calc(100% - 50px)' }} type="password" value={pass.password} disabled /> */}
                        <button
                          style={{
                            width: "50px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                          }}
                          type="button"
                          onClick={() =>
                            checkPinSession(pass.password, pass._id)
                          }
                        >
                          {passwordCopiedOf === pass._id ? (
                            <FileCopyIcon />
                          ) : (
                            <FileCopyOutlinedIcon />
                          )}
                        </button>
                        <button
                          style={{
                            width: "50px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                          }}
                          type="button"
                          onClick={() => showPasswordModal(pass.password)}
                        >
                          <VisibilityIcon />
                        </button>
                      </span>
                    </div>
                    <div className="detail-item">
                      <span>Note: </span>
                      <span>
                        <textarea
                          placeholder="Add your notes..."
                          cols="32"
                          rows="1"
                        >
                          {pass.note}
                        </textarea>
                      </span>
                    </div>
                  </li>
                ))
              ) : (
                <div className="result_box">
                  <div className="detail-item">
                    <span>
                      {loading === "passwordList" ? (
                        <CircularProgress size={25} color="#fff" />
                      ) : (
                        "No password list found"
                      )}
                    </span>
                  </div>
                </div>
              )}
            </ul>

            <Modal open={isPassCopyModal} onClose={closePassCopyModal}>
              <div className={classes.modalPaper}>
                <h3>Enter Pin to show Password</h3>
                <TextField
                  onChange={(e) => setPin(e.target.value)}
                  type="password"
                  placeholder="Enter Pin"
                  variant="outlined"
                  label="Pin"
                  size="small"
                />
                <Button
                  variant="contained"
                  size="medium"
                  color="primary"
                  onClick={handlePinSession}
                >
                  Submit
                </Button>
              </div>
            </Modal>

            <Modal open={openPinModal} onClose={pinModalClose}>
              <div className={classes.modalPaper}>
                <h3>Secured Verification</h3>
                <TextField
                  onChange={(e) => setPin(e.target.value)}
                  type="password"
                  placeholder="Enter Pin"
                  variant="outlined"
                  label="Pin"
                  size="small"
                />
                <Button
                  variant="contained"
                  size="medium"
                  color="primary"
                  onClick={handleShowPass}
                >
                  Submit
                </Button>
                <br />
                <div>
                  <p>
                    Password:
                    <input
                      style={{ width: "calc(100% - 50px)" }}
                      type={showPassword ? "text" : "password"}
                      value={passwordToShow}
                      disabled
                    />
                  </p>
                </div>
                <button
                  style={{
                    width: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(passwordToShow);
                    setPassCopiedOf("pin");
                  }}
                >
                  {passwordCopiedOf === "pin" ? (
                    <FileCopyIcon />
                  ) : (
                    <FileCopyOutlinedIcon />
                  )}
                </button>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}
export default Creds;
