import React, {useEffect, useState} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './Detail.scss'

// CSS를 입힌 div 박스 컴포넌트
let 박스 = styled.div`
    padding : 20px;
`;
let 제목 = styled.h4`
    font-size : 25px;
    color : ${ props => props.색상 }
`;

// 예전에 많이 쓰던 Component Lifecycle Hook
// class Detail2 extends React.Component {
//     componentDidMount() { // Detail2 컴포넌트가 Mount(등장)되었을 때 실행
//     }

//     componentWillUnmount() { // Detail2 컴포넌트가 Unount(사라지게)되었을 때 실행
//     }
// }

function Detail(props) {
    // 이곳에 movie데이터를 저장해도 되지 않을까? 하지만
    // 중요한 데이터는 역방향으로 데이터를 가져와야 하는 경우도 있기 때문에 
    // 상위컴포넌트(App)에 저장해두고, 하위컴포넌트로 props를 통해 보내는 것이 좋다.

    
    let [alert, alert변경] = useState(true);
    let [inputData, inputData변경] = useState('');

    useEffect( () => {
        let 타이머 = setTimeout( () => { alert변경(false)}, 3000);
        // Deatil컴포넌트가 사라질 때 타이머도 clear
        // 이유 : 입력한 3초가 되기 전 Detail컴포넌트를 벗어나는 경우 에러가 날 수 있기 때문
        return () => { clearTimeout(타이머) }
    // }); 였는데 내가 inputData를 입력할 때마다 리렌더링으로 인해 alert도 같이 리렌더링 되버린다.
    // 내가 원하는 건 alert가 변경될 때만 useEffect가 리렌더링되는 것!
    }, [alert]);


    let history = useHistory();
    let { id } = useParams();
    // let myMovie = props.movie.find(function(x){
    //     return x.id == id;
    // }) ES6문법에 따라 간결화 하면 다음과 같다.
    let myMovie = props.movie.find(x => x.id == id);

    return (
        <div className="container">
            <박스>styled-component를 사용해 만든 박스 컴포넌트
                {/* props문법 : 보낼이름={변수명} {'red'} or "일반문자" "red" */}
                <제목 색상="red">styled-component</제목>
                <제목 className="red">Sass</제목>
            </박스>

            {
                alert === true
                ?  (<div className='my-alert-mediumspringgreen'>
                        <p>🏆이 영화는 현재 1위입니다🏆</p>
                    </div>)
                : null
            }

            내가 입력한 inputData : {inputData} <br/>
            <input onChange={(e) => { inputData변경(e.target.value) }}/>
           
            <div className="row">
            <div className="col-md-6">
                <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
            </div>
            <div className="col-md-6 mt-4">
                <h4 className="pt-5">{myMovie.title}</h4>
                <p>예매율 {myMovie.content}%</p>
                <p>별점 ⭐{myMovie.price}</p>
                <Info 재고={props.재고}/>
                <button className="btn btn-danger" onClick={() => {
                    props.재고변경([9,11,12])
                }}>주문하기</button> 
                <button className="btn btn-danger" onClick={() => {
                    history.goBack();
                }}>뒤로가기</button> 
                <button className="btn btn-success" onClick={() => {
                    history.push('/');
                }}>홈으로가기</button> 
            </div>
            </div>
        </div> 
    )
}

function Info(props) {
    return (
        <p>재고 : {props.재고[0]}</p>
    )
}

export default Detail;