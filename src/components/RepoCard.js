import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'inline-flex',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

export default function RepoCard({ repo, fileName }) {
  const classes = useStyles();
  const repoUrl = `https://github.com/${repo.owner}/${repo.name}`;
  const editUrl = `/edit/${repo.owner}/${repo.name}/${fileName}`;

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {repo.owner} / {repo.name} / {fileName.replace(/\.json$/, '')}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {repo.description}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <Link to={editUrl} component={RouterLink}>
            <IconButton aria-label="Edit file">
              <EditIcon />
            </IconButton>
          </Link>
          <Link href={repoUrl} target="_blank" rel="noopener noreferrer">
            <IconButton aria-label="Open repository on GitHub">
              <GitHubIcon />
            </IconButton>
          </Link>
        </div>
      </div>
    </Card>
  );
}
