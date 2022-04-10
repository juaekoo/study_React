import React, {useState} from 'react';
import { Container, Nav, Navbar, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import './App.css';
import Data from './data.js';
import Detail from './Detail.js';
import axios from 'axios';

import { Link, Route, Switch } from 'react-router-dom';

function App() {

  let [movie, movie변경] = useState(Data);   
  // 페이지 방문하자마자 Ajax요청할 경우
  // useEffect(()=>{
  //   axios.get().then().catch();
  // },[]);

  let [재고, 재고변경] = useState([100, 101, 102]);

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
            <button className='btn btn-primary' onClick={() => {

              axios.post('서버URL', { id : '전달할데이터', pw : 1234 });

              axios.get(' https://codingapple1.github.io/shop/data2.json')
              .then((result) => {
                console.log(result.data)
                // movie state에 ajax로 받아온 데이터 (result.data) 추가
                movie변경( [...movie, ...result.data])
              })
              .catch(() => {
                alert('데이터 로딩 실패')
              });
            }}>더보기</button>
          </div>
        </Route>


        <Route path="/detail/:id">
          <Detail movie={movie} 재고={재고} 재고변경={재고변경} />
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
    <div className='col-md-4'>
      {/* <img src={require('./img/' + props.i + '.jpg')} width="100%"/> */}
      원래img범위
      {/* 인데 예제가 내 img 코드와 다름. 따라서 axios예제 실행을 위해 일단 주석처리 */}
      <h4>{ props.movie.title }</h4>
      <p> 예매율 { props.movie.content }% | ⭐{ props.movie.price } </p>
    </div>
  )
}

export default App;
