import React from "react";

const ShowOtherUserMessage = (props) => {
  const { message, img_url } = props;
  let DateTime = Date.now();

  return (
    <React.Fragment>
      <div className="user-messages">
        <div className="row mx-0">
          <div className="col-md-8 ml-auto px-0">
            <div className="row mx-0">
              <div className="col-md-11">
                <div className="user-messages-text">
                  <div className="row mx-0">
                    <div className="col-md-6 px-0">
                      <small className="user-messages-name">
                        {message.message.name}
                      </small>
                    </div>
                    <div className="col-md-6 px-0">
                      <small className="user-messages-time">
                        {new Intl.DateTimeFormat("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        }).format(DateTime)}
                      </small>
                    </div>
                  </div>
                  <p className="mb-0">{message.message.text}</p>
                </div>
              </div>
              <div className="col-md-1 px-0">
                <img src={img_url} id="messages-img" alt="img" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ShowOtherUserMessage;
