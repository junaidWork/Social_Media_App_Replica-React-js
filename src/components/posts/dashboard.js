import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { useState, useEffect } from "react";
import { Card, Container, Button, Dropdown } from "react-bootstrap";
import axios from "axios";
import Comment from "../comments/comment";
import PostModal from "../posts/postModal";
import CommentsModal from "../comments/commentsModal";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [loggedinUser, setloggedinUser] = useState("");
  const [allPost, setAllPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [show, setShow] = useState(false);
  const [showed, setShowed] = useState(false);
  const [updatePostFlag, setupdatePostFlag] = useState(true);
  const [postId, setpostId] = useState("");
  const [Singleposts, setSingleposts] = useState("");
  const [postComments, setPostComments] = useState([]);

  // for dialogue box
  const handleShow = () => {
    setShow(true);
  };
  const handleshut = () => {
    setShow(false);
  };
  // for 2nd dialogue box
  const handleShowed = () => {
    setShowed(true);
  };
  const handleshuted = () => {
    setShowed(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    getAllPosts();
    getloggedinUser();
  }, []);

  // get logged in user
  const getloggedinUser = async () => {
    let logedUserId = localStorage.getItem("id");
    let Usertoken = localStorage.getItem("token");
    const response = await axios.get(
      `https://taskforum.herokuapp.com/api/users/${logedUserId}`,
      {
        headers: { Authorization: `Bearer ${Usertoken}` },
      }
    );
    if (response.status === 400 || !response) {
      console.log("invalid Registration");
    } else {
      setloggedinUser(response.data.data);
    }
  };
  // Get all Posts
  const getAllPosts = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "https://taskforum.herokuapp.com/api/post/",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.status === 400 || !response) {
      console.log("invalid Registration");
    } else {
      setAllPosts(response.data.data);
    }
  };
  // Create Post
  const createPost = async () => {
    const Usertoken = localStorage.getItem("token");
    const logedUserId = localStorage.getItem("id");
    const Post = {
      user: logedUserId,
      title: title,
      description: description,
      category: category,
    };
    console.log(Post, "post");
    const response = await axios.post(
      "https://taskforum.herokuapp.com/api/post/",

      Post,
      {
        headers: { Authorization: `Bearer ${Usertoken}` },
      }
    );
    if (response.status === 400 || !response) {
      console.log("invalid");
    } else {
      console.log("Successfully created");
      getAllPosts();
      setTitle("");
      setDescription("");
      setCategory("");
    }
  };
  // Edit Post
  const editPost = async (item) => {
    setTitle(item.title);
    setDescription(item.description);
    setCategory(item.category);
    setpostId(item._id);
    setupdatePostFlag(false);
  };
  // update Post
  const updatePost = async () => {
    const Usertoken = localStorage.getItem("token");
    const Post = {
      title: title,
    };
    console.log(Post, "post");
    const response = await axios.put(
      `https://taskforum.herokuapp.com/api/post/${postId}`,

      Post,
      {
        headers: { Authorization: `Bearer ${Usertoken}` },
      }
    );
    if (response.status === 400 || !response) {
      console.log("invalid");
    } else {
      console.log("Successfully created");
      getAllPosts();
      setTitle("");
      setDescription("");
      setCategory("");
    }
    setupdatePostFlag(true);
  };
  // Delete Post
  const deletePost = async (item) => {
    let logedUserId = localStorage.getItem("id");
    let Usertoken = localStorage.getItem("token");
    if (item.user._id === logedUserId) {
      const response = await axios.delete(
        `https://taskforum.herokuapp.com/api/post/${item._id}`,
        {
          headers: { Authorization: `Bearer ${Usertoken}` },
        }
      );
      if (response.status === 400 || !response) {
        console.log("invalid");
      } else {
        console.log("Successfully post deleted");
        getAllPosts();
      }
    } else {
      console.log("You can't Delete this post");
    }
  };
  // logout
  const logOut = () => {
    localStorage.removeItem("token");
  };
  //get single post
  const getSinglePosts = async (id) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `https://taskforum.herokuapp.com/api/post/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (response.status === 400 || !response) {
      console.log("invalid Registration");
    } else {
      setSingleposts(response.data.data);
    }
  };
  // Get all Comments of one post
  const getPostComments = async (id) => {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `https://taskforum.herokuapp.com/api/comment/post/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.status === 400 || !response) {
      console.log("invalid Registration");
    } else {
      setPostComments(response.data.data);
    }
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Button
            className="btn btn-light"
            onClick={() => {
              handleShow();
            }}
          >
            Create Post
          </Button>
          <Typography variant="h6" className={classes.title}>
            Available Posts
          </Typography>

          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <span>
                {loggedinUser.name}{" "}
                <span>
                  <AccountCircle />
                </span>
              </span>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <Link href="/profile" variant="body2">
                <MenuItem onClick={handleClose}>Profile</MenuItem>
              </Link>
              <Link href="/setting" variant="body2">
                <MenuItem onClick={handleClose}>Setting</MenuItem>
              </Link>
              <Link href="/logIn" variant="body2">
                <MenuItem
                  onClick={() => {
                    handleClose();
                    logOut();
                  }}
                >
                  Logout
                </MenuItem>
              </Link>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      {/* Post Section */}
      <Container style={{ display: "flex", flexWrap: "wrap" }}>
        {" "}
        {allPost.map((item, index) => {
          const UserId = localStorage.getItem("id");
          return (
            <Card
              key={index}
              style={{ width: "18rem" }}
              className=" m-3 mb-2 bg-Info"
            >
              {item.user._id === UserId && (
                <div style={{ marginLeft: "auto" }}>
                  <Dropdown>
                    <Dropdown.Toggle>
                      <Dropdown.Menu
                        size="sm"
                        style={{ minWidth: "1rem", margin: "-5px" }}
                      >
                        <Dropdown.Item
                          onClick={() => {
                            handleShow();
                            editPost(item);
                          }}
                        >
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            deletePost(item);
                          }}
                        >
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown.Toggle>
                  </Dropdown>
                </div>
              )}

              <Card.Body>
                <Card.Title className="mt-3"> {item.title}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
                <Card.Text>
                  {" "}
                  <strong>{item["user"].name}</strong>{" "}
                </Card.Text>
                <Card.Text>{item["user"].created_at}</Card.Text>
              </Card.Body>
              <div>
                {" "}
                <Comment postId={item._id} item={item} />
                <Button
                  onClick={() => {
                    getSinglePosts(item._id);
                    getPostComments(item._id);
                    handleShowed();
                  }}
                  className="mt-2"
                >
                  See All Comments
                </Button>
              </div>
            </Card>
          );
        })}
        <PostModal
          handleshut={handleshut}
          createPost={createPost}
          updatePost={updatePost}
          setTitle={setTitle}
          setDescription={setDescription}
          setCategory={setCategory}
          updatePostFlag={updatePostFlag}
          title={title}
          description={description}
          category={category}
          show={show}
        />
        <CommentsModal
          handleshuted={handleshuted}
          showed={showed}
          Singleposts={Singleposts}
          postComments={postComments}
        />
      </Container>
    </div>
  );
}
