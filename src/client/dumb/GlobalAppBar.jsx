import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import authenticate from '../authenticator';
import client from '../client';
import settings from '../helpers/settings';
import { Drawer, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import { Home, LibraryAdd, GroupAdd, VerifiedUser, Send, Settings, Star, Assessment } from '@material-ui/icons';
import { Link } from 'react-router-dom';

class GlobalAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      open: false,
      user: {
        status: 'unverified'
      },
      fresh: false,
      contractAddress: false
    };

    client.on('authenticated', async function(evt) {
      if (evt.accessToken) {
        this.setState({
          authenticated: true
        });

        const payload = await client.passport.verifyJWT(evt.accessToken);
        const user = await client.service('/api/users').get(payload.userId);
        this.setState({
          user
        });
      }
    }.bind(this));

    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  async componentDidMount() {
    try {
      const user = await authenticate();
      if (user.code === 401) {
        this.setState({
          authenticated: false,
        });
      }
  
      const users = await client.service('/api/users').find();
      if (users.total <= 1) {
        this.setState({
          fresh: true
        });
      }
  
      const contractAddress = await settings.get('contractAddress');
      this.setState({
        contractAddress
      });
    } catch(e) {
      console.log(e);
    }
  }

  toggleDrawer() {
    this.setState({
      open: !this.state.open
    });
  }

  logout() {
    client.logout();
    window.location.replace(window.location.origin);
  }

  render() {
    let user = this.state.user;

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu" onClick={this.toggleDrawer}>
              <MenuIcon />
            </IconButton>           
            <Typography variant="title" color="inherit">
              Wine House
            </Typography>
            {this.state.authenticated ? <Button color="inherit" onClick={this.logout}>Logout</Button> : undefined}
            {
              this.state.contractAddress ? 
                <Typography style={{marginLeft: 10}}>
                  Contract address:&nbsp;
                  <a 
                    style={{color: 'blue'}} 
                    href={`https://ropsten.etherscan.io/address/${this.state.contractAddress}`}
                    target="blank"
                  >
                    {this.state.contractAddress}
                  </a>
                </Typography>
                : <Typography>Retrieving contract address...</Typography>
            }
          </Toolbar>
        </AppBar>

        <Drawer open={this.state.open} onClose={this.toggleDrawer}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer}
            onKeyDown={this.toggleDrawer}
          >

            {
              this.state.authenticated ?
                <Link to="/dashboard">
                  <ListItem button>
                    <ListItemIcon>
                      <Home />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItem>
                </Link>
                : <Link to="/">
                  <ListItem button>
                    <ListItemIcon>
                      <Home />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItem>
                </Link>
            }
            

            {
              user.status === 'unverified' && this.state.authenticated ?
                <Link to="/verify">
                  <ListItem button>
                    <ListItemIcon>
                      <Star />
                    </ListItemIcon>
                    <ListItemText primary="Upgrade Account" />
                  </ListItem>
                </Link>
                : undefined
            }

            {
              user.status === 'master' ?
                <Link to="/view/verifications">
                  <ListItem button>
                    <ListItemIcon>
                      <Assessment />
                    </ListItemIcon>
                    <ListItemText primary="Verification Requests" />
                  </ListItem>
                </Link>
                : undefined
            }

            {
              user.status === 'partner' || user.status === 'master' ?
                <Link to="/wine/register">
                  <ListItem button>
                    <ListItemIcon>
                      <LibraryAdd />
                    </ListItemIcon>
                    <ListItemText primary="Register Wine" />
                  </ListItem>
                </Link>
                : undefined
            }

            <Link to="/wine/verify">
              <ListItem button>
                <ListItemIcon>
                  <VerifiedUser />
                </ListItemIcon>
                <ListItemText primary="Verify Wine" />
              </ListItem>
            </Link>

            {
              user.status === 'partner' || user.status === 'owner' || user.status === 'master' ?
                <Link to="/wine/transfer">
                  <ListItem button>
                    <ListItemIcon>
                      <Send />
                    </ListItemIcon>
                    <ListItemText primary="Transfer Wine" />
                  </ListItem>
                </Link>
                : undefined
            }

            {
              user.status === 'master' ? 
                <div>
                  <Link to="/partner/register">
                    <ListItem button>
                      <ListItemIcon>
                        <GroupAdd />
                      </ListItemIcon>
                      <ListItemText primary="Register Partner" />
                    </ListItem>
                  </Link>
                  <Link to="/owner/register">
                    <ListItem button>
                      <ListItemIcon>
                        <GroupAdd />
                      </ListItemIcon>
                      <ListItemText primary="Register Owner" />
                    </ListItem>
                  </Link>
                </div>
                : undefined
            }

            {
              this.state.fresh === true ?
                <div>
                  <Divider />

                  <Link to="/admin/tools">
                    <ListItem button>
                      <ListItemIcon>
                        <Settings />
                      </ListItemIcon>
                      <ListItemText primary="Settings" />
                    </ListItem>
                  </Link>
                </div>
                : undefined
            }
          </div>
        </Drawer>
      </div>
    );
  }
}

export default GlobalAppBar;