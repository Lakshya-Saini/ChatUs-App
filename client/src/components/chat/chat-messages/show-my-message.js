import React from "react";

const ShowMyMessage = (props) => {
  const { message, img_url } = props;
  let DateTime = Date.now();

  return (
    <React.Fragment>
      <div className="my-messages">
        <div className="row mx-0">
          <div className="col-md-8 px-0">
            <div className="row mx-0">
              <div className="col-md-1 px-0">
                <img src={img_url} id="messages-img" alt="img" />
              </div>
              <div className="col-md-11">
                <div className="my-messages-text">
                  <div className="row mx-0">
                    <div className="col-md-6 px-0">
                      <small className="my-messages-name">
                        {message.message.name}
                      </small>
                    </div>
                    <div className="col-md-6 px-0">
                      <small className="my-messages-time">
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
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ShowMyMessage;
