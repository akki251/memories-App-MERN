import {
  Container,
  AppBar,
  Typography,
  Grow,
  Grid,
  Paper,
  TextField,
  Button,
} from '@material-ui/core';
import Form from './Form/Form';
import Posts from './Posts/Posts';

import useStyles from './HomeStyles';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, getPostBySearch } from '../actions/posts';

import React, { useEffect, useState } from 'react';
import Pagination from './Posts/Pagination';
import { useHistory, useLocation } from 'react-router';
import ChipInput from 'material-ui-chip-input';

//  for getting queries from url
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const page = query.get('page') || 1;

  const [searchComplete, setSearchComplete] = useState(false);

  const searchQuery = query.get('searchQuery');
  const [currentId, setCurrentId] = useState(null);
  const [customSearchQuery, setCustomSearchQuery] = useState('');
  const classes = useStyles();

  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);

  // useEffect(() => {
  //   dispatch(getPosts());
  // }, [dispatch]);

  const searchHandler = (e) => {
    setCustomSearchQuery('');
    setSearch(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPosts();
    }
  };

  const handleAdd = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  let searchPosts = () => {
    if (search.trim() || tags) {
      //  dispatch to fetch search post
      dispatch(
        getPostBySearch({
          search,
          tags: tags.join(','),
        }),
      );

      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      history.push('/');
    }
  };

  useEffect(() => {
    if (searchQuery || tags.length) {
      setCustomSearchQuery(searchQuery);
      dispatch(
        getPostBySearch({
          search: searchQuery,
          tags: tags.join(','),
        }),
      );
    }
  }, []);

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField
                name="search"
                variant="outlined"
                label="search memories"
                fullWidth
                onKeyUp={handleKeyPress}
                value={search || customSearchQuery}
                onChange={searchHandler}
              />
              <ChipInput
                style={{ margin: '10px  0' }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                variant="outlined"
              />
              <Button
                onClick={searchPosts}
                variant="contained"
                className={classes.searchButton}
                color="primary"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <Paper elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}

export default Home;
