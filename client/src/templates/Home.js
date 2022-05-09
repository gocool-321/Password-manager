import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  cardCont: {
    float: "left",
    listStyle: "none",
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
  },
  root: {
    borderRadius: "20px",
    margin: "20px",
  },
  title: {
    fontSize: 18,
  },
  media: {
    width: "300px",
    height: "300px",
    borderRadius: "20px",
  },
});

export default function Home() {
  const classes = useStyles();

  return (
    <>
      <ul>
        <li className={classes.cardCont}>
          <Link to="/credentials" className="nav-item">
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <CardMedia
                  className={classes.media}
                  image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F000%2F517%2F704%2Foriginal%2Fcyber-security-vector.png&f=1&nofb=1"
                  title="Paella dish"
                />
                <Typography variant="h5" component="h2">
                  Credentials
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </li>
        <li className={classes.cardCont}>
          <Link to="/docs" className="nav-item">
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <CardMedia
                  className={classes.media}
                  image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.freepik.com%2Fvector-gratis%2Filustracion-vector-documentos-comerciales_38409-10.jpg&f=1&nofb=1"
                  title="Paella dish"
                />
                <Typography variant="h5" component="h2">
                  Docs
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </li>
        <li className={classes.cardCont}>
          <Link to="/notes" className="nav-item">
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <CardMedia
                  className={classes.media}
                  image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.istockphoto.com%2Fvectors%2Fonline-payment-concept-laptop-with-electronic-invoice-vector-id1133420249%3Fk%3D6%26m%3D1133420249%26s%3D170667a%26w%3D0%26h%3Dqpiwlcj_6B3XQ_gXnJy5YEObmISJKMRnhByDbTnc6ZE%3D&f=1&nofb=1"
                  title="Paella dish"
                />
                <Typography variant="h5" component="h2">
                  Notebook
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </li>
        <li className={classes.cardCont}>
          <Link to="/bucket" className="nav-item">
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <CardMedia
                  className={classes.media}
                  image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.all-free-download.com%2Fimages%2Fgraphiclarge%2Fcreative_server_design_elements_vector_586791.jpg&f=1&nofb=1"
                  title="Paella dish"
                />
                <Typography variant="h5" component="h2">
                  Bucket
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </li>
      </ul>
    </>
  );
}
