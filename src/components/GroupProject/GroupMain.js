import React, { Component } from 'react'
import "./GroupMain.css"
import { Menu, Icon, Grid } from 'semantic-ui-react';
import {Chat, Calendar, Card} from '../../components';
import { PostData } from '../../containers';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:3100');


class GroupMain extends Component {
    constructor(props) {
        super(props)
        this.state = {
            _id: this.props.location.state._id,
            groupname: this.props.match.params.groupname,
            username: this.props.match.params.username,
            groupid: sessionStorage.getItem('groupid'),
            membername: this.props.location.state.membername,
            memberid: this.props.location.state.memberid,
            cardVisible: false,
        }
    }

    viewCards = () => {
        this.setState({ cardVisible: !this.state.cardVisible });
    }
    componentDidMount() {
    }

    render() {
        return (
            <div className="GroupMain">
                <div className="Menu">
                <Menu icon='labeled'>
                    <Menu.Item name="tasks" onClick={this.viewCards}>
                        <Icon name="tasks" size="big" />
                    </Menu.Item>
                    <h1>{this.state.username}-{this.state.groupname}</h1>
                    <h4>
                        <button type="button" >나가기</button><br />
                        &nbsp; 이메일: <input type="text" className="add-memberid" ref={ref => { this.id = ref }} />
                        &nbsp; <button type="button" onClick={() => {

                            if (this.state.memberid.indexOf(this.id.value) !== -1) {
                                console.log("이미 있음")
                                this.id.value = "";
                                return 0;
                            }
                            console.log(this.state.groupid);
                            let data = {
                                groupid: this.state.groupid,//그룹방
                                newMemberid: this.id.value
                            }
                            this.id.value = "";
                            PostData(this.state.username + '/' + this.state.groupname + '/addmember', data)
                                .then(result => {
                                    this.setState({ memberid: result.data.value.Member_ID });
                                    this.setState({ membername: result.data.value.Member_name });
                                })
                        }
                        }>추가</button>
                    </h4>
                </Menu>
                </div>
                <div class="wrapper">
                        <div>
                            {
                                this.state.cardVisible ?
                                <Card/>:
                                <Chat className="Chat" _id={this.state._id} socket={socket} username={this.state.username}/>
                            }
                        </div>
                        <div>
                             <Calendar className="Calendar" cal_height={document.getElementsByClassName("Calendar").height}/>
                        </div>
                </div>
            </div>
        )
    }
}

export default GroupMain;