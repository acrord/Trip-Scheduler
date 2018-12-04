import React, { Component } from 'react'
import Chat from "./Chat/Chat";
import Calandar from "./Calendar/Calandar";
import "./GroupMain.css"
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3100');

class GroupMain extends Component{
    constructor (props){
        super(props)
        this.state={
            groupname:this.props.match.params.groupname,
            username: this.props.match.params.username,
            membername: this.props.location.state.membername,
            memberid: this.props.location.state.memberid
        }
    }

    componentDidMount() {
        socket.emit('channelJoin', this.state.channel);
    }

    render(){
        return(        
            <div className="GroupMain">
                <div className="GroupHead">{this.state.username}-{this.state.groupname}</div>
                {/*<h3>GroupMember</h3>*/}
                {/*{this.state.membername.map(function(name){*/}
                    {/*return <h4>{name}</h4>*/}
                {/*})}*/}
                {/*{this.state.memberid.map(function(name){*/}
                    {/*return <h4>{name}</h4>*/}
                {/*})}*/}
                <div className="Chat"><Chat groupname={this.state.groupname} socket={socket}/></div>
                <div className="Calandar"><Calandar/></div>
            </div>
        )
    }
}

export default GroupMain;