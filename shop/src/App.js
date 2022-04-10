import React, {useState} from 'react';
import { Container, Nav, Navbar, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import './App.css';
import Data from './data.js';
import Detail from './Detail.js';

import { Link, Route, Switch } from 'react-router-dom';

function App() {

  let [movie, movie변경] = useState(Data); 

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/detail">Detail</Nav.Link>
              <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#" disabled>
                Link
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      

      {/* Switch를 통해 Route 중 상단에 걸리는 것만 하나씩 보임 (중복 비허용) */}
      <Switch>
        {/* <Route path="/"> 이렇게 하면 
          아래 /detail도 /와 매칭되어 메인페이지라는 이름이 같이 나오므로*/}
        {/* exact를 사용하면 경로가 정확히 일치할 때만 페이지를 보여준다. */}
        <Route exact path="/">
          <div className='Jumbo'>
            <h1> 이건 메인메뉴 정보박스 </h1>
            <p> 여기다가 사진을 넣는 것도 되는데 옆으로 넘기는게 가능한가? </p>
            <p>
              <Button variant="primary">상세정보 보기</Button>
            </p>
          </div>

          <div className='container'>
            <div className='row'>
              {
                // a는 하나하나의 데이터, i는 반복문 돌때마다 늘어나는 숫자
                movie.map((a, i) => {
                  // return <Movie movie={movie[i]}/> 아래와 같은 결과
                  return <Movie movie={a} i={i} key={a.id}/>
                })
              }
            </div>
          </div>
        </Route>


        <Route path="/detail/:id">
          <Detail movie={movie} />
        </Route>


        {/* <Route path="/컴포넌트넣고싶다면" component={Modal} ></Route> */}

        {/* :id란 '모든문자'라는 경로 */}
        <Route path="/:id"> 
          <div> 아무 경로에서나 보여지는 친구! </div>
        </Route>
      </Switch>
    </div>
  );
}

function Movie(props) {
  return (
    <div className='col-md-4'>가로로 3분할
      <img src={require('./img/' + props.i + '.jpg')} width="100%"/>
      <h4>{ props.movie.title }</h4>
      <p> 예매율 { props.movie.rate }% | ⭐{ props.movie.star } </p>
    </div>
  )
}

export default App;
