import React, { memo } from "react";
import Input3 from "../../common/input3";
import Button from "../../common/button";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

function SendMessages(props) {
  const {
    value,
    messageChange,
    messageSubmit,
    addEmoji,
    showEmojis,
    showEmojisMenu,
    isGroup,
    keyPress,
  } = props;

  return (
    <React.Fragment>
      <form onSubmit={(e) => messageSubmit(e, isGroup)}>
        <div className="row mx-0">
          <div className="col-md-1 pl-0">
            <p className="getEmojiButton" onClick={showEmojisMenu}>
              {String.fromCodePoint(0x1f60a)}
            </p>
            {showEmojis ? (
              <span className="emojiPicker">
                <Picker onSelect={addEmoji} title="ChatUs" />
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="col-md-10 px-0">
            <Input3
              icon=""
              id="message"
              type="text"
              name="message"
              className="form-control shadow-none"
              placeholder="Write your message..."
              value={value}
              handleChange={messageChange}
              keyPress={(e) => keyPress(e, isGroup)}
            />
          </div>
          <div className="col-md-1">
            <Button
              type="submit"
              className="btn shadow-none send-btn"
              value={<i className="fas fa-paper-plane"></i>}
            />
          </div>
        </div>
      </form>
    </React.Fragment>
  );
}

export default memo(SendMessages);
