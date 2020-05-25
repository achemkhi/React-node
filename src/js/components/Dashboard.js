import React from 'react';

import { Route, NavLink, Redirect } from "react-router-dom";

const posts = [
    { id: 16, title: "React JS", content: "Libraire ou Framework ?" },
    { id: 11, title: "React Native", content: "Mobile React" },
    { id: 100, title: "Angular", content: "Super ..." },
    { id: 7, title: "Symfony", content: "Framework expressif ..." },
    { id: 27, title: "MongoDB", content: "Base de données NoSQL" },
];

const Post = ({ match }) => {

  const post = posts.filter(({ id }) => id === parseInt(match.params.postId));

  if (post.length === 0) return(<p>Post not found</p>);

  const { title, content } = post.pop();

  return (
      <>
        <p>{title}</p>
        <p>{content}</p>
      </>
  );
}

class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      auth: false
    }
  }

  render() {
    const token = localStorage.getItem('authToken');
    const { url, path } = this.props.match;

    if (token === 'false') {
      alert('goto login')
      return (
          <Redirect to={{ pathname: '/login', state: { from: "/" } }} />
      )
    }


    return (
        <div className={"dashboard text-center"}>
          <p>Bienvenue sur la dashboard</p>
          <ul className={'nav'}>
            {posts.map(({ title, id }) => (
                <li key={id} className={"nav-link"}>
                  <NavLink className={'nav-link'} to={`${url}/post/${id}`}>{title}</NavLink>
                </li>
            ))}
          </ul>
          <Route path={`${path}/post/:postId`} component={Post} />
        </div>
    );
  }
}

export default Dashboard;
