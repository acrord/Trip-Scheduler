import React, { Component } from "react";
import $ from "jquery";
import "jquery-ui-dist/jquery-ui";
import "./Card.css";
class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channel: this.props._id,
      socket: this.props.socket,
      email: sessionStorage.getItem("useremail"),
      cards: []
    };
  }

  componentDidMount() {
    let cursor = this;
      var count =0 ; //전역변수로
    const { socket, channel } = this.state;
    socket.emit("cardJoin", channel);
    socket.on("cardreceive", async data => {
      function onContextMenu(e) {
        var menu = document.getElementById("card-menus");
        e.preventDefault();
        e.stopPropagation();
        menu.classList.add("active");
        menu.style.top = e.clientY + "px";
        const rootW = window.innerWidth * 0.11;
        if (rootW < e.clientX) {
          menu.style.left = e.clientX - 100 + "px";
        } else {
          menu.style.left = e.clientX + "px";
        }
        // cursor.setState({ card: $(e.target) });
        cursor.setState({
          title: $(e.target)
            .children(".title")
            .text(),
          content: $(e.target)
            .children(".contents")
            .text(),
          id: $(e.target)[0].id
        });
      }
      await this.setState({ cards: data.cards }); //comment: [cardsssss]   저장
        let list = await this.state.cards.map(card => {
            return (
                <div className="fc-event" key={card.id} id={card.id} onContextMenu={onContextMenu} onMouseUp={onHeaderClick}>
                    <h3 className="title">제목 : {card.title}</h3>
                    <h6 className="start">시작예정 시간 : {card.start}</h6>
                    <h6 className="end">마감예정 시간 : {card.end}</h6>
                    <h5 className="contents">내용 : {card.contents}</h5>
                    {/* id는 캘린더 들어갈 때마다 변해야함 */}
                    <input type="hidden" value={count++} id="id"/>
                </div>
            );
        });
        await this.setState({ list: list });
        await $('.fc-event ui-draggable ui-draggable-handle').on('click', function(e) {
         
          alert( 'clicked the foobar' );
        });
        $("#external-events .fc-event").each(function() {
            // store data so the calendar knows to render an event upon drop
            //초기값 있어야 함
            $(this).data("event", {
                title: $.trim($(this).children(".title").text()), // use the element's text as the event title
                id:  $(this).children('#id')[0].value,
                contents: $.trim($(this).children(".contents").text()),
                stick: true // maintaicn when user navigates (see docs on the renderEvent method)
            });
            // make the event draggable using jQuery UI
            $(this).draggable({
                zIndex: 999,
                revert: true, // will cause the event to go back to its
                revertDuration: 0, //  original position after the drag
                stop: function(event, ui) {
                    $(this).data("event", {
                        title: $.trim($(this).children(".title").text()), // use the element's text as the event title
                        contents: $.trim($(this).children(".contents").text()),
                        id: $(this).children('#id')[0].value,
                        stick: true // maintaicn when user navigates (see docs on the renderEvent method)
                    });
                }
            });
        });

      socket.on("receiveCards", async data => {
        await cursor.setState({
          cards: this.state.cards.concat(data.events)
        });
          let list = await this.state.cards.map(card => {
              return (
                  <div className="fc-event" key={card.id} id={card.id} onContextMenu={onContextMenu} onMouseUp={onHeaderClick}>
                      <h3 className="title">제목 : {card.title}</h3>
                      <h6 className="start">시작예정 시간 : {card.start}</h6>
                      <h6 className="end">마감예정 시간 : {card.end}</h6>
                      <h5 className="contents">내용 : {card.contents}</h5>
                      <input type="hidden" value={count++} id="id"/>
                  </div>
              );
          });
          await this.setState({ list: list });$("#external-events .fc-event").each(function() {
              // store data so the calendar knows to render an event upon drop
              //초기값 있어야 함
              $(this).data("event", {
                  title: $.trim($(this).children(".title").text()), // use the element's text as the event title
                  id:  $(this).children('#id')[0].value,
                  contents: $.trim($(this).children(".contents").text()),
                  stick: true // maintaicn when user navigates (see docs on the renderEvent method)
              });
              // make the event draggable using jQuery UI
              $(this).draggable({
                  zIndex: 999,
                  revert: true, // will cause the event to go back to its
                  revertDuration: 0, //  original position after the drag
                  stop: function(event, ui) {
                      $(this).data("event", {
                          title: $.trim($(this).children(".title").text()), // use the element's text as the event title
                          contents: $.trim($(this).children(".contents").text()),
                          id: $(this).children('#id')[0].value,
                          stick: true // maintaicn when user navigates (see docs on the renderEvent method)
                      });
            }
          });
        });
      });
      function onHeaderClick(event) {
        event.preventDefault();
        var temp = event.currentTarget;
        cursor.setState({ card: temp });
       
      }
      socket.on("deleteCards", async data => {
        await this.setState({ cards: data.cards });
        let list = await this.state.cards.map(card => {
          return (
            <div className="fc-event" key={card.id} id={card.id} onContextMenu={onContextMenu} onMouseUp={onHeaderClick}>
                <h3 className="title">제목 : {card.title}</h3>
                <h6 className="start">시작예정 시간 : {card.start}</h6>
                <h6 className="end">마감예정 시간 : {card.end}</h6>
                <h5 className="contents">내용 : {card.contents}</h5>
              <input type="hidden" value={count++} id="id" />
            </div>
          );
        });
        await this.setState({ list: list }); 
        $("#external-events .fc-event").each(function () {
          // store data so the calendar knows to render an event upon drop
          //초기값 있어야 함
          $(this).data("event", {
            title: $.trim($(this).children(".title").text()), // use the element's text as the event title
            id: $(this).children('#id')[0].value,
            contents: $.trim($(this).children(".contents").text()),
            stick: true // maintaicn when user navigates (see docs on the renderEvent method)
          });
          // make the event draggable using jQuery UI
          $(this).draggable({
            zIndex: 999,
            revert: true, // will cause the event to go back to its
            revertDuration: 0, //  original position after the drag
            stop: function (event, ui) {
              $(this).data("event", {
                title: $.trim($(this).children(".title").text()), // use the element's text as the event title
                contents: $.trim($(this).children(".contents").text()),
                id: $(this).children('#id')[0].value,
                stick: true // maintaicn when user navigates (see docs on the renderEvent method)
              });
            }
          });
        });
      });///////////socketend
      
    });
  }
  deleteCard(){
    this.props.socket.emit('removeCards', {channel:this.state.channel, id:$(this.state.card)[0].id})
  }

  render() {
    return <div
    id="external-events" 
    onClick={() => document.getElementById("card-menus").classList.remove("active")}
    >
        <h4>Card List</h4>
        {this.state.list}
        <div id="card-menus" className="card-menus">
          <div className="delete" onClick={() => this.deleteCard()}>
            삭제
          </div>
        </div>
      </div>;
  }
}

export default Card;
