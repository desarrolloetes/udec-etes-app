import React from 'react';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import CmtAvatar from '@coremat/CmtAvatar';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import ClearIcon from '@material-ui/icons/Clear';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import PhoneIcon from '@material-ui/icons/Phone';
import useStyles from './index.style';
import { Block, CheckCircleOutline } from '@material-ui/icons';
import { Tooltip } from '@material-ui/core';
import IntlMessages from '@jumbo/utils/IntlMessages';

const ChargeAccountDetailView = ({ open, onCloseDialog }) => {
  const classes = useStyles();
  const { currentChargeAccount } = useSelector(({ chargeAccountsReducer }) => chargeAccountsReducer);
  const { caccCode, caccDescription, caccOrgCode, caccStatus, profile_pic } = currentChargeAccount;

  return (
    <Dialog open={open} onClose={onCloseDialog} className={classes.dialogRoot}>
      <Box className={classes.userInfoRoot}>
        <Box mr={3} display="flex" alignItems="center">
          <Box className={classes.avatarView} mr={{ xs: 4, md: 6 }}>
            <CmtAvatar size={70} src={profile_pic} alt={caccDescription} />
          </Box>
          <Box mt={-2}>
            <Box display="flex" alignItems="center">
              <Typography className={classes.titleRoot}>{`${caccDescription}`}</Typography>
            </Box>
          </Box>
        </Box>
        <Box ml="auto" mt={-2} display="flex" alignItems="center">
          <Box ml={1}>
            <Tooltip title={caccStatus}>
              <IconButton aria-label="filter list">
                {caccStatus === 'N' && <Block color="primary" />}
                {caccStatus === 'S' && <CheckCircleOutline color="primary" />}
              </IconButton>
            </Tooltip>
          </Box>
          <Box ml={1}>
            <IconButton onClick={onCloseDialog}>
              <ClearIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Box px={6} py={5}>
        <Box mb={5} component="p" color="common.dark">
          {<IntlMessages id="chargeAccounts.chargeAccountDetailview.label.title" />}
        </Box>
        <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 7 }}>
          <FingerprintIcon />
          <Box ml={5} color="primary.main" component="p" className="pointer">
            {caccCode}
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 7 }}>
          <AccountCircleIcon />
          <Box ml={5} color="primary.main" component="p" className="pointer">
            {caccDescription}
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 7 }}>
          <PhoneIcon />
          <Box ml={5} color="primary.main" component="p" className="pointer">
            {caccOrgCode}
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mb={{ xs: 4, sm: 7 }}>
          <PhoneIcon />
          <Box ml={5} color="primary.main" component="p" className="pointer">
            {caccStatus}
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default ChargeAccountDetailView;

ChargeAccountDetailView.prototype = {
  open: PropTypes.bool.isRequired,
  onCloseDialog: PropTypes.func,
};
