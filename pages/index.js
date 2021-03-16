import factory from "../ethereum/factory";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import Layout from "../components/Layout";
import Paper from "@material-ui/core/Paper";

const firstCampaign = `0xc10b71a71F11bF7d82ad7f02Fed5FC8179397893`;

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const CampaignIndex = ({ campaigns }) => {
  const classes = useStyles();

  const renderCampaigns = () => {
    const classes = useStyles();
    const items = campaigns.map((address, index) => {
      console.log(index);
      return (
        <List key={index}>
          <Paper>
            <ListItem button>
              <ListItemText
                primary={address}
                secondary="View this campaign"
              ></ListItemText>
            </ListItem>
          </Paper>
        </List>
      );
    });
    return items;
  };

  return (
    // The layout wraps nicely around the index page
    <Layout>
      {/* this gets passed as a child of the Layout.props */}
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            List of campaigns
          </Typography>
        </Grid>
        <Grid item xs={10}>
          {renderCampaigns()}
        </Grid>
        <Grid item xs={2}>
          {" "}
          <Button
            style={{ width: "150px", marginLeft: "20px" }}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Create Campaign
          </Button>
        </Grid>
      </Grid>
    </Layout>
  );
};

export async function getServerSideProps() {
  let campaigns = JSON.parse(
    JSON.stringify(await factory.methods.getAllDeployedCampaigns().call())
  );
  return { props: { campaigns } };
}

export default CampaignIndex;
