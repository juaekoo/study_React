import React from 'react';
import {Table} from 'react-bootstrap';
import { connect, useDispatch, useSelector } from 'react-redux';

function Cart(props) {

    // redux에 있던 모든 state를 리턴
    let state = useSelector((state) => state.reducer);
    let dispatch = useDispatch();

    return (
        <div>
            <Table responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.map((a,i) => {
                            return (
                                <tr key={a.id}>
                                    <td>{a.id}</td>
                                    <td>{a.name}</td>
                                    <td>{a.quan}</td>
                                    <td>
                                        <button onClick={() => { dispatch({type : '수량증가', payload : {name : 'koo'} }) }}>➕</button>
                                        <button onClick={() => { dispatch({type : '수량감소'}) }}>➖</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    
                </tbody>
            </Table>
            { 
                props.alert열렸니 === true 
                ? (<div className='my-alert-mediumspringgreen'>
                    <p>지금 구매하시면 20%할인! (신규회원 적용)</p>
                    <button onClick={()=>{ props.dispatch({type : 'alert닫기'}) }}>닫기</button>
                    </div>)
                : null
            }
        </div>
    )
}

// 아래와 같은 방법을 좀 더 쉬운 방법으로 대체
/*
// index.js에 있는 store 데이터를 가져와서 props로 변환하는 함수
function state를props화(state) {
    return {
        // state : state // state라는 이름의 props로 변경
        // // 상품명 : state[0].name
        state : state.reducer,
        alert열렸니 : state.reducer2
    }
}

export default connect(state를props화)(Cart)
*/
export default Cart;