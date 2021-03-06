import React from "react";
import {connect} from 'react-redux';
import {Page} from "../../components/Page/Page";
import "./HomePage.css";
import Button from "@material-ui/core/Button";
import {LinearLeftUp, WaveDown} from "../../data/svgs";
import {AbsoluteTop, GoToButton, Content} from "../../components/Primitives/Primitives";
import {Banner, Brand, Extend, Home, Links, ShiftTop, Title} from "./components/Primitives";
import IntroductionCard from "./components/IntroductionCard";
import {Link} from "react-router-dom";

const HomePage = props => {
  return (
    <Page>
      <Home>
        <Banner>
          <Title>
            Welcome to <Brand>ClassPlatform</Brand>!
          </Title>
          <Links>
            {props.currentUser ?
              <>
                <GoToButton to='/classboard'>
                  Go Learn Stuff !
                </GoToButton>
                <span className='ml-5 mr-5' />
                <GoToButton to='/codingboard'>
                  Enjoy Little Coding :)
                </GoToButton>
              </> :
              <Button size='large' variant='text' disabled>
                Sign in First From Top Right Corner. <br />
              </Button>
            }
          </Links>
        </Banner>
        <ShiftTop by='10px' />
        <Extend width='110%'>
          <LinearLeftUp color={'royalblue'} />
        </Extend>
        <AbsoluteTop>
          <Extend width='110%'>
            <WaveDown color={'midnightblue'} />
          </Extend>
        </AbsoluteTop>

        <Content.Content>
          <Content.Header>Class Board</Content.Header>
          <Link to='/classboard' style={{textDecoration: "none"}}>
            <Content.Description>Post your notes and share your knowledge here.</Content.Description>
          </Link>
        </Content.Content>

        <Content.Content>
          <Content.Header>Coding Board</Content.Header>
          <Link to='/codingboard' style={{textDecoration: "none"}}>
            <Content.Description>Get your hands on coding, and enjoy solving problems :)</Content.Description>
          </Link>
        </Content.Content>
      </Home>
    </Page>
  );
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(HomePage);
